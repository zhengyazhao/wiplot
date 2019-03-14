using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Dynamic;
using System.Collections;

namespace AD.Svs.Web.SyncDB.DataServices.Extensions
{
    public static class ReaderExtension
    {
        public static IEnumerable<dynamic> GetDynamicCollection(this SqlDataReader pReader)
        {
            using (pReader)
            {

                var names = Enumerable.Range(0, pReader.FieldCount).Select(pReader.GetName).ToList();
                foreach (IDataRecord record in pReader as IEnumerable)
                {
                    var expando = new ExpandoObject() as IDictionary<string, object>;
                    foreach (var name in names)
                        expando[name] = record[name];
                    yield return expando;
                }
            }
        }
    }
}