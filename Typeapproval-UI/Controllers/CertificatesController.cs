using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Typeapproval_UI.Controllers
{
    public class CertificatesController : Controller
    {
        [HttpGet]
        [Route("certificates")]
        public ActionResult Index()
        {
            return View();
        }
    }
}