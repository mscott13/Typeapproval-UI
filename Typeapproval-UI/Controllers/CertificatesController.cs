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
            Session.Remove("save_state");
            Session.Remove("application_id");
            Session.Remove("manufacturer_name");
            Session.Remove("manufacturer_tel");
            Session.Remove("manufacturer_address");
            Session.Remove("manufacturer_fax");
            Session.Remove("manufacturer_contact_person");

            Session.Remove("equipment_type");
            Session.Remove("equipment_description");
            Session.Remove("product_identification");
            Session.Remove("refNum");
            Session.Remove("make");
            Session.Remove("software");
            Session.Remove("type_of_equipment");
            Session.Remove("other");
            Session.Remove("antenna_type");
            Session.Remove("antenna_gain");
            Session.Remove("channel");
            Session.Remove("separation");
            Session.Remove("aspect");
            Session.Remove("compatibility");
            Session.Remove("security");
            Session.Remove("equipment_comm_type");
            Session.Remove("fee_code");
            Session.Remove("frequencies");

            return View();
        }
    }
}