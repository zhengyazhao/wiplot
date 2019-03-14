using AD.Svs.Web.SyncDB.DataServices.Models.DataTables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AD.Svs.Web.SyncDB.DataServices.Data
{
    public interface ISyncDBEngineeringDataRepo
    {
        IQueryable<iv_prism> GetPrismData();
        IQueryable<iv_rel> GetRelData();
        IQueryable<HiPotTest> GetHiPotTestData();
    } 
}
