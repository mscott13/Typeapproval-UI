using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace Typeapproval_UI.Controllers
{
    public class AdminController : Controller
    {
        [Route("admin")]
        public ActionResult Index()
        {
            Models.AdminDashboard adminDashboard = new Models.AdminDashboard();

            if (Session["key"] != null)
            {
                var client = new HttpClient();
                client.BaseAddress = new Uri("http://localhost:54367/api/data/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var content = new StringContent(JsonConvert.SerializeObject(Session["key"].ToString()), Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync("GetEngineers", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string result = response.Content.ReadAsStringAsync().Result;
                    List<Models.EngineerUser> engineerUsers = JsonConvert.DeserializeObject<List<Models.EngineerUser>>(result);
                    return View(engineerUsers);
                }
                else
                {
                    return View();
                }
            }
            else
            {
                return View();
            }
        }

        private List<Models.EngineerUser> GetEngineerUsers()
        {
            if (Session["key"] != null)
            {
                var client = new HttpClient();
                client.BaseAddress = new Uri("http://localhost:54367/api/data/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var content = new StringContent(JsonConvert.SerializeObject(Session["key"].ToString()), Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync("GetEngineers", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string result = response.Content.ReadAsStringAsync().Result;
                    List<Models.EngineerUser> engineerUsers = JsonConvert.DeserializeObject<List<Models.EngineerUser>>(result);
                    return engineerUsers;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        private List<Models.UnassignedTask> GetUnassignedTasks()
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri("http://localhost:54367/api/data/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            List<Models.UnassignedTask> unassignedTasks = new List<Models.UnassignedTask>();

            var content = new StringContent(JsonConvert.SerializeObject(Session["key"].ToString()), Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync("GetEngineers", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string result = response.Content.ReadAsStringAsync().Result;
                unassignedTasks = JsonConvert.DeserializeObject<List<Models.UnassignedTask>>(result);
                return unassignedTasks;
            }
            else
            {
                return null;
            }
        }

        private List<Models.OngoingTask> GetOngoingTasks()
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri("http://localhost:54367/api/data/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            List<Models.OngoingTask> ongoingTasks = new List<Models.OngoingTask>();

            var content = new StringContent(JsonConvert.SerializeObject(Session["key"].ToString()), Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync("GetEngineers", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string result = response.Content.ReadAsStringAsync().Result;
                ongoingTasks = JsonConvert.DeserializeObject<List<Models.OngoingTask>>(result);
                return ongoingTasks;
            }
            else
            {
                return null;
            }
        }
    }
}