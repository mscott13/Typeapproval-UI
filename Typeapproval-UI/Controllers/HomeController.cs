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
            if (Session["key"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("", "account");
            }
        }
    }
}