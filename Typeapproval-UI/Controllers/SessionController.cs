using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Typeapproval_UI.Controllers
{
    public class SessionController : Controller
    {
        [HttpGet]
        [Route("session-check")]
        public ActionResult SessionCheck()
        {
            if (Session["key"] == null)
            {
                return new HttpStatusCodeResult(System.Net.HttpStatusCode.Unauthorized, "unauthorized");
            }
            else
            {
                return new HttpStatusCodeResult(System.Net.HttpStatusCode.OK, "session_ok");
            }
        }
    }
}