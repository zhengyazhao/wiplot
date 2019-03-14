using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AD.Svs.Web.SyncDB.DataServices.Common
{
    public static class Config
    {
        public static string SyncDBConnectionString
        { get { return System.Configuration.ConfigurationManager.ConnectionStrings["SyncDB"].ConnectionString; } }
    }
}