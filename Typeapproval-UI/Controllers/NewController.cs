using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Typeapproval_UI.Controllers
{
    public class NewController : Controller
    {
        [HttpGet]
        [Route("new/step-1")]
        public ActionResult Step1()
        {
            return View();
        }

        [HttpGet]
        [Route("new/step-2")]
        public ActionResult Step2()
        {
            return View();
        }
    }
}