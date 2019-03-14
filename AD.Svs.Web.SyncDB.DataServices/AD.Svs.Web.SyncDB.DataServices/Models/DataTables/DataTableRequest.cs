using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AD.Svs.Web.SyncDB.DataServices.Models.DataTables;
using System.Web.Http.ModelBinding;

namespace AD.Svs.Web.SyncDB.DataServices.Models.DataTables
{
    [ModelBinder(typeof(DataTableModelBinder))]
    public class DataTableRequest
    {
        public int Draw { get; set; }
        public int Start { get; set; }
        public int Length { get; set; }

        public DataTableOrder[] Order { get; set; }
        public DataTableColumn[] Columns { get; set; }
        public DataTableSearch Search { get; set; }
    }
}




