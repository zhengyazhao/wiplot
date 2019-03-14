using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AD.Svs.Web.SyncDB.DataServices.Models.DataTables
{
    public class DataTableResponse
    {
        public int draw { get; set; }
        public long recordsTotal { get; set; }
        public long recordsFiltered { get; set; }
        public dynamic data { get; set; }
        public string error { get; set; }
        //返回代码 200:成功；500：数据异常；
        public int HttpCode { get; set; }
        public string msg { get; set; }

        public int total { get; set; }

        public int page { get; set; }

        public int size { get; set; }
    }
}