using AD.Svs.Web.SyncDB.DataServices.Extensions;
using AD.Svs.Web.SyncDB.DataServices.Models.DataTables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace AD.Svs.Web.SyncDB.DataServices.Data
{
    public class SyncDBEngineeringDataRepo : ISyncDBEngineeringDataRepo
    {
        private SyncDBEngineeringData_R context;

        public SyncDBEngineeringDataRepo(SyncDBEngineeringData_R context)
        {
            this.context = context;
        }
        public IQueryable<iv_prism> GetPrismData()
        {
            return context.iv_prism;
        }
        public IQueryable<iv_rel> GetRelData()
        {
            return context.iv_rel;
        }

        public IQueryable<HiPotTest> GetHiPotTestData()
        {
            return context.HiPotTest;
        }

        //public DataTableResponse GetPrismData(DataTableRequest request)
        //{
        //    IQueryable<iv_prism> data = context.iv_prism;
        //    // Searching Data 
        //    //if (request.Search.Value != "")
        //    //{
        //    //    var searchText = request.Search.Value.Trim();

        //    //    data = context.iv_prism.Where(p =>
        //    //            p.Wafer.Contains(searchText) ||
        //    //            p.Step.Contains(searchText) ||
        //    //            p.Flow.Contains(searchText) ||
        //    //            p.Owner.Contains(searchText));
        //    //}
        //    //else
        //    //{
        //    //    data = context.iv_prism;
        //    //}

        //    Expression filterExpression = Expression.Constant(true);
        //    ParameterExpression pe = Expression.Parameter(typeof(iv_prism), "x");
        //    var searchAbleColumns = request.Columns.Where(c => c.Searchable == true && !string.IsNullOrWhiteSpace(c.Search.Value));
        //    foreach (var column in searchAbleColumns)
        //    {

        //        switch (column.Data.ToLower())
        //        {
        //            case "testdate":     // TestDate
        //                {
        //                    string propertyName = column.Data;
        //                    MemberExpression me = Expression.Property(pe, propertyName);
        //                    var ce = Expression.Convert(me, typeof(DateTime?));
        //                    MethodCallExpression mc = Expression.Call(null, typeof(System.Data.Entity.DbFunctions).GetMethod("TruncateTime", new Type[] { typeof(DateTime?) }), ce);
        //                    ConstantExpression constant = Expression.Constant(DateTime.Parse(column.Search.Value).Date, typeof(DateTime?));
        //                    BinaryExpression be = Expression.Equal(mc, constant);
        //                    filterExpression = Expression.AndAlso(filterExpression, be);
        //                    break;
        //                }
        //            case "step":
        //            case "wafer":
        //            case "cell":
        //            case "owner":
        //            case "flow":
        //                {
        //                    string propertyName = column.Data;
        //                    MemberExpression me = Expression.Property(pe, propertyName);
        //                    MethodInfo method = typeof(string).GetMethod("Contains", new[] { typeof(string) });
        //                    ConstantExpression constant = Expression.Constant(column.Search.Value, typeof(string));
        //                    var containsMethodExp = Expression.Call(me, method, constant);
        //                    filterExpression = Expression.AndAlso(filterExpression, containsMethodExp);
        //                    break;
        //                }
        //        }
        //    }

        //    if (filterExpression != null)
        //    {
        //        Expression<Func<iv_prism, bool>> funcExpression = Expression.Lambda<Func<iv_prism, bool>>(filterExpression, pe);
        //        data = data.Where(funcExpression);
        //    }
        //    // Sort Data
        //    data = data.Order(request.Columns, request.Order);
        //    //foreach (var order in request.Order.Take(3).Reverse())
        //    //{ 
        //    //    data = data.OrderBy(request.Columns[order.Column].Data, order.Dir.ToLower() == "asc" ? ListSortDirection.Ascending : ListSortDirection.Descending);

        //    //}
        //    long recordCount = 0;

        //    //// Paging Data 
        //    ////var sortOrder = (sortDirection == "asc") ? true: false;
        //    ////var pagedData = ((sortDirection == "asc")? data.OrderBy(sortCondition) : data.OrderByDescending(sortCondition)).Skip(()=>request.Start).Take(request.Length).ToArray(); ;
        //    var pagedData = data.PagedResult2(request.Start, request.Length, out recordCount);
        //    return new DataTableResponse
        //    {
        //        draw = request.Draw,
        //        recordsTotal = recordCount,
        //        recordsFiltered = recordCount,
        //        data = pagedData.ToArray(),
        //        error = ""
        //    };
        //}
    }
}