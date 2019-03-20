using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Web;

namespace AD.Svs.Web.SyncDB.DataServices.Extensions
{
    public static class IQueryAbleExtension
    {
        public static IQueryable<T> PagedResult<T, TResult>(this IQueryable<T> query, int start, int length,
                Expression<Func<T, TResult>> orderByProperty, bool isAscendingOrder, out long rowsCount)
        {
            //Total result count
            rowsCount = query.Count();
            query = isAscendingOrder ? query.OrderBy(orderByProperty) : query.OrderByDescending(orderByProperty);
            //Skip the required rows for the current page and take the next records of pagesize count
            return query.Skip(start).Take(length);
        }

        public static IQueryable<T> PagedResult2<T>(this IQueryable<T> query, int start, int length,  out long rowsCount)
        {
            //Total result count
            rowsCount = query.Count(); 
            //Skip the required rows for the current page and take the next records of pagesize count
            return query.Skip(start).Take(length);
        }

        public static IQueryable<T> OrderBy<T>(this IQueryable<T> source, string sortProperty, ListSortDirection sortOrder)
        {
            var type = typeof(T);
            var property = type.GetProperty(sortProperty);
            var parameter = Expression.Parameter(type, "p");
            var propertyAccess = Expression.MakeMemberAccess(parameter, property);
            var orderByExp = Expression.Lambda(propertyAccess, parameter);
            var typeArguments = new Type[] { type, property.PropertyType };
            var methodName = sortOrder == ListSortDirection.Ascending ? "OrderBy" : "OrderByDescending";
            var resultExp = Expression.Call(typeof(Queryable), methodName, typeArguments, source.Expression, Expression.Quote(orderByExp));

            return source.Provider.CreateQuery<T>(resultExp);
        }

        public static IOrderedQueryable<T> Order<T>(this IQueryable<T> source, Models.DataTables.DataTableColumn[] pColumns, Models.DataTables.DataTableOrder[] pOrders)
        {
            if (pOrders.Length == 0)
                throw new InvalidOperationException();

            var param = Expression.Parameter(typeof(T), string.Empty);
            var property = Expression.PropertyOrField(param, pColumns[pOrders[0].Column].Data);

            var sort = Expression.Lambda(property, param);

            MethodCallExpression orderByCall = Expression.Call(
                typeof(Queryable),
                "OrderBy" + (pOrders[0].Dir.ToLower() == "desc" ? "Descending" : string.Empty),
                new[] { typeof(T), property.Type },
                source.Expression,
                Expression.Quote(sort));

            if (pOrders.Length > 1)
            {
                for (int i = 1; i < 3; i++)
                {
                    var item = pOrders[i];
                    param = Expression.Parameter(typeof(T), string.Empty);
                    property = Expression.PropertyOrField(param, pColumns[item.Column].Data);

                    sort = Expression.Lambda(property, param);

                    orderByCall = Expression.Call(
                        typeof(Queryable),
                        "ThenBy" + (item.Dir.ToLower() == "desc" ? "Descending" : string.Empty),
                        new[] { typeof(T), property.Type },
                        orderByCall,
                        Expression.Quote(sort));
                }
            } 
            return (IOrderedQueryable<T>)source.Provider.CreateQuery<T>(orderByCall);
        }


        public static IOrderedQueryable<T> GetPagedData<T>(this IQueryable<T> data, Models.DataTables.DataTableRequest request, List<Models.DataTables.DataTableSearchColumn> pSearchColumns, out long pRowCount)
        {
            pRowCount = 0;
            Expression filterExpression = Expression.Constant(true);
            ParameterExpression pe = Expression.Parameter(typeof(T), "x");
            var searchAbleColumns = request.Columns.Where(c => c.Searchable == true && !string.IsNullOrWhiteSpace(c.Search.Value));
            foreach (var column in searchAbleColumns)
            {
                var propertyName = column.Data;
                var col = pSearchColumns.Where(x => x.Name.ToLower() == column.Data.ToLower()).FirstOrDefault();
                if (col != null)
                {
                    switch (col.DataType)
                    {
                        case TypeCode.DateTime:
                            {
                                MemberExpression me = Expression.Property(pe, propertyName);
                                var ce = Expression.Convert(me, typeof(DateTime?));
                                MethodCallExpression mc = Expression.Call(null, typeof(System.Data.Entity.DbFunctions).GetMethod("TruncateTime", new Type[] { typeof(DateTime?) }), ce);

                                var searchValues = column.Search.Value.Split('-');
                                var startTimeConstant = Expression.Constant(DateTime.Parse(searchValues[0]).Date, typeof(DateTime?));
                                var endTimeConstant = Expression.Constant(DateTime.Parse(searchValues[1]).Date, typeof(DateTime?));

                                BinaryExpression beOfStartTime = Expression.GreaterThanOrEqual(mc, startTimeConstant);
                                BinaryExpression beOfEndTime = Expression.LessThanOrEqual(mc, endTimeConstant);
                                filterExpression = Expression.AndAlso(filterExpression, beOfStartTime);
                                filterExpression = Expression.AndAlso(filterExpression, beOfEndTime);
                                break;
                            }
                        default:
                            {
                                MemberExpression me = Expression.Property(pe, propertyName);
                                MethodInfo method = typeof(string).GetMethod("Contains", new[] { typeof(string) });
                                ConstantExpression constant = Expression.Constant(column.Search.Value, typeof(string));
                                var containsMethodExp = Expression.Call(me, method, constant);
                                filterExpression = Expression.AndAlso(filterExpression, containsMethodExp);
                                break;
                            }
                    }
                }
            }

            if (filterExpression != null)
            {
                Expression<Func<T, bool>> funcExpression = Expression.Lambda<Func<T, bool>>(filterExpression, pe);
                data = data.Where(funcExpression);
            }
            // Sort Data
            data = data.Order(request.Columns, request.Order);
            //// Paging Data   
            var pagedData = data.PagedResult2(request.Start, request.Length, out pRowCount);
            return (IOrderedQueryable<T>)pagedData;
        }
    }
}