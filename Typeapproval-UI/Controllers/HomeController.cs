using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Typeapproval_UI.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            Session.Remove("manufacturer_name");
            Session.Remove("manufacturer_tel");
            Session.Remove("manufacturer_address");
            Session.Remove("manufacturer_fax");
            Session.Remove("manufacturer_contact_person");
            Session.Remove("provider_name");
            Session.Remove("provider_telephone");
            Session.Remove("provider_address");
            Session.Remove("provider_fax");
            Session.Remove("provider_contact_person");

            return View();
        }
    }
}