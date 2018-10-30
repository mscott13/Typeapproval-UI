using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Typeapproval_UI
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Login",
                url: "account/{action}",
                defaults: new { controller = "Account", action = "Login", id = UrlParameter.Optional }
            );

           

            routes.MapRoute(
                name: "Certificates",
                url: "certificates/{action}/{id}",
                defaults: new { controller = "Certificates", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "New",
                url: "new/{action}",
                defaults: new { controller = "New", action = "Step1", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Search",
                url: "search/{action}/{id}",
                defaults: new { controller = "Search", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
               name: "Home",
               url: "{controller}/{action}/{id}",
               defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
           );
        }

        protected void Application_Start()
        {
            RegisterRoutes(RouteTable.Routes);
        }
    }
}
