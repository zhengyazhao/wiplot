using System.Web;
using System.Web.Mvc;

namespace AD.Svs.Web.SyncDB.DataServices
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
