using System.Web;
using System.Web.Mvc;

namespace ContosoApi
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());

            //Force HTTPS
            filters.Add(new RequireHttpsAttribute());
        }
    }
}
