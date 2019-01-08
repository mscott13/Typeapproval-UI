using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Typeapproval_UI.Controllers
{
    public class StaffController : Controller
    {
        [Route("staff")]
        public ActionResult Index()
        {
            return View();
        }
    }
}