using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data;
using System.Data.SqlClient;
using AD.Svs.Web.SyncDB.DataServices.Common;
using AD.Svs.Web.SyncDB.DataServices.Extensions; 
using System.Dynamic;
using System.Collections;
using System.Text;

namespace AD.Svs.Web.SyncDB.DataServices.Controllers
{
    public class DataController : ApiController
    {
        public IHttpActionResult GetTableRecordCount(string pTableName, string pFilter = "" )
        {
            long recordCount = 0; 
            StringBuilder dataQuery = new StringBuilder();
            try
            {
                using (SqlConnection connection = new SqlConnection(Config.SyncDBConnectionString))
                {
                    connection.Open(); 
                    using (SqlCommand command = new SqlCommand(string.Format("SELECT COUNT(1) FROM {0} (NOLOCK) {1}", pTableName, pFilter), connection))
                    {
                        command.CommandType = CommandType.Text;
                        recordCount = Convert.ToInt64(command.ExecuteScalar());
                    } 
                }
                return Ok(new
                { 
                    recordCount = recordCount
                });
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
            }
        }

        public IHttpActionResult GetTableDataPaged(string pTableName, long pPageSize, long pPageNo, string pDefaultSort
            ,string pFilter = "")
        {
            dynamic result; 
            StringBuilder dataQuery = new StringBuilder();
            try
            {
                using (SqlConnection connection = new SqlConnection(Config.SyncDBConnectionString))
                {
                    dataQuery.Append(string.Format(@"; WITH PageNumbers AS(
         SELECT TOP({0} * {1}) ROW_NUMBER() OVER(ORDER BY {2}) as RowID, * FROM {3} 
        {1})
SELECT *
FROM PageNumbers with(nolock)
WHERE RowID > (({0} - 1) * {1})
ORDER BY RowID ASC", pPageSize, pPageNo, pDefaultSort, pFilter));

                    connection.Open(); 
                    using (SqlCommand command = new SqlCommand(dataQuery.ToString(), connection))
                    {
                        command.CommandType = CommandType.Text; 
                        var reader = command.ExecuteReader();
                        result = reader.GetDynamicCollection(); 
                    }
                }
                return Ok(new
                {
                    data = result
                });
            }
            catch (Exception ex)
            { 
                throw;
            }
            finally
            { 
            }
        }
         
    }
}
