using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web.Mvc;

namespace Typeapproval_UI.Controllers
{
    public class SystemAdminController : Controller
    {
        public ActionResult Index()
        {
            if (Session["key"] != null)
            {
                if (Convert.ToInt32(Session["user_type"]) == Commons.Constants.USER_TYPE_SYS_ADMINISTRATOR)
                {
                    ViewBag.Title = "Administration";
                    Models.SysAdminMainWrapper wrapper = new Models.SysAdminMainWrapper();
                    wrapper.userActivities = GetUserActivities();
                    wrapper.userDetails = GetUserDetails();
                    return View(wrapper);
                }
                else
                {
                    return ReturnToHome(Convert.ToInt32(Session["user_type"]));
                }
            }
            else
            {
                return RedirectToAction("", "account");
            }
        }

        private List<Models.UserDetails> GetUserDetails()
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri("http://localhost:54367/api/user/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var content = new StringContent(JsonConvert.SerializeObject(Session["key"].ToString()), Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync("GetUsersList", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string result = response.Content.ReadAsStringAsync().Result;
                List<Models.UserDetails> userDetails = JsonConvert.DeserializeObject<List<Models.UserDetails>>(result);
                return userDetails;
            }
            else
            {
                return null;
            }
        }

        private List<Models.UserActivity> GetUserActivities()
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri("http://localhost:54367/api/data/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var content = new StringContent(JsonConvert.SerializeObject(Session["key"].ToString()), Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync("GetUserActivities", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string result = response.Content.ReadAsStringAsync().Result;
                List<Models.UserActivity> userActivities = JsonConvert.DeserializeObject<List<Models.UserActivity>>(result);
                return userActivities;
            }
            else
            {
                return null;
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