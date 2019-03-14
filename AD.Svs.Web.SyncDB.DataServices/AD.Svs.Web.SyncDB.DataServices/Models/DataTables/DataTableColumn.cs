﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AD.Svs.Web.SyncDB.DataServices.Models.DataTables
{
    public class DataTableColumn
    { 
        public string Data { get; set; } 
        public string Name { get; set; } 
        public bool Searchable { get; set; } 
        public bool Orderable { get; set; } 

        public DataTableSearch Search { get; set; }
    }
}