using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace Typeapproval_UI.Controllers
{
    public class SavedController : Controller
    {
        [HttpGet]
        [Route("saved")]
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
            Session.Remove("name_of_test");
            Session.Remove("country");
            Session.Remove("additional_info");
            Session.Remove("view_mode");

            var client = new HttpClient();
            client.BaseAddress = new Uri("http://localhost:54367/api/data/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var content = new StringContent(JsonConvert.SerializeObject(Session["key"].ToString()), Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync("GetSavedApplications", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string _result_ = response.Content.ReadAsStringAsync().Result;
                List<Models.SavedApplications> savedApplications = JsonConvert.DeserializeObject<List<Models.SavedApplications>>(_result_);
                Session["saved_count"] = savedApplications.Count;
            }
            else
            {
                Session["saved_count"] = 0;
            }

            return View();
        }

        [HttpGet]
        [Route("saved/get-documents")]
        public ActionResult GetFeed()
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri("http://localhost:54367/api/data/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var content = new StringContent(JsonConvert.SerializeObject(Session["key"].ToString()), Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync("GetSavedApplications", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string _result_ = response.Content.ReadAsStringAsync().Result;
                List<Models.SavedApplications> savedApplications = JsonConvert.DeserializeObject<List<Models.SavedApplications>>(_result_);
                Session["saved_count"] = savedApplications.Count;

                for (int i = 0; i < savedApplications.Count; i++)
                {
                    if (Session["application_id"] != null)
                    {
                        if (savedApplications[i].application_id == Session["application_id"].ToString())
                        {
                            savedApplications[i].active = true;
                        }
                        else
                        {
                            savedApplications[i].active = false;
                        }
                    }
                }
                return Json(new { savedApplications }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                Session["saved_count"] = 0;
                return Json(new { result = "no data" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}