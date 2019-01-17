using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web.Mvc;
using Typeapproval_UI.Models;

namespace Typeapproval_UI.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var ob = Session["key"];
            if (Session["key"] == null)
            {
                Response.Redirect("~/account");
                return RedirectToAction("", "account");
            }
            else
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

                if (Convert.ToInt32(Session["user_type"]) == Commons.Constants.USER_TYPE_CLIENT)
                {
                    var client = new HttpClient();
                    client.BaseAddress = new Uri("http://localhost:54367/api/data/");
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    var content = new StringContent(JsonConvert.SerializeObject(Session["key"].ToString()), Encoding.UTF8, "application/json");

                    HttpResponseMessage response = client.PostAsync("GetDashboardFeed", content).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        string _result_ = response.Content.ReadAsStringAsync().Result;
                        Dashboard dashboard = JsonConvert.DeserializeObject<Dashboard>(_result_);
                        return View(dashboard);
                    }
                    else
                    {
                        Dashboard dashboard = new Dashboard();
                        return View(dashboard);
                    }
                }
                else
                {
                    return ReturnToHome(Convert.ToInt32(Session["user_type"]));
                }
            }
        }

        [HttpGet]
        [Route("home/get-feed")]
        public ActionResult GetFeed()
        {
            if (Session["key"] != null)
            {
                var client = new HttpClient();
                client.BaseAddress = new Uri("http://localhost:54367/api/data/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                var content = new StringContent(JsonConvert.SerializeObject(Session["key"].ToString()), Encoding.UTF8, "application/json");

                HttpResponseMessage response = client.PostAsync("GetUserActivities", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string _result_ = response.Content.ReadAsStringAsync().Result;
                    List<UserActivity> userActivities = JsonConvert.DeserializeObject<List<UserActivity>>(_result_);
                    return Json(new { userActivities }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { result = "no data" }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { result = "invalid session" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        [Route("home/get-recents")]
        public ActionResult GetRecentDocuments()
        {
            if (Session["key"] != null)
            {
                var client = new HttpClient();
                client.BaseAddress = new Uri("http://localhost:54367/api/data/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                var content = new StringContent(JsonConvert.SerializeObject(Session["key"].ToString()), Encoding.UTF8, "application/json");

                HttpResponseMessage response = client.PostAsync("GetRecentDocuments", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string _result_ = response.Content.ReadAsStringAsync().Result;
                    List<RecentDocuments> recentDocuments = JsonConvert.DeserializeObject<List<RecentDocuments>>(_result_);
                    return Json(new { recentDocuments }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { result = "no data" }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { result = "invalid session" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        [Route("home/get-dashboard-feed")]
        public ActionResult GetDashboardData()
        {
            if (Session["key"] != null)
            {
                var client = new HttpClient();
                client.BaseAddress = new Uri("http://localhost:54367/api/data/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                var content = new StringContent(JsonConvert.SerializeObject(Session["key"].ToString()), Encoding.UTF8, "application/json");

                HttpResponseMessage response = client.PostAsync("GetDashboardFeed", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string _result_ = response.Content.ReadAsStringAsync().Result;
                    Dashboard dashboard = JsonConvert.DeserializeObject<Dashboard>(_result_);
                    return Json(new { dashboard }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { result = "no data" }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { result = "invalid session" }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult ReturnToHome(int user_type)
        {
            switch (user_type)
            {
                case Commons.Constants.USER_TYPE_ADMINISTRATOR:
                    return RedirectToAction("", "admin");
                case Commons.Constants.USER_TYPE_STAFF:
                    return RedirectToAction("", "staff");
                case Commons.Constants.USER_TYPE_CLIENT:
                    return RedirectToAction("", "home");
                case Commons.Constants.USER_TYPE_SYS_ADMINISTRATOR:
                    return RedirectToAction("", "systemadmin");
                default:
                    return RedirectToAction("", "account");
            }
        }
    }
}