using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web.Mvc;

namespace Typeapproval_UI.Controllers
{
    public class AdminController : Controller
    {
        [Route("admin")]
        public ActionResult Index()
        {
            Models.AdminDashboard adminDashboard = new Models.AdminDashboard();
            adminDashboard.engineerUsers = GetEngineerUsers();
            adminDashboard.unassignedTasks = GetUnassignedTasks();
            adminDashboard.ongoingTasks = GetOngoingTasks();
            return View(adminDashboard);
        }

        [HttpPost]
        [Route("admin/reassign")]
        public ActionResult ReassignTask(dynamic data)
        {
            if (Session["key"] != null)
            {
                data.access_key = Session["key"].ToString();
                var client = new HttpClient();
                client.BaseAddress = new Uri("http://localhost:54367/api/data/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync("ReassignTask", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string result = response.Content.ReadAsStringAsync().Result;
                    List<Models.EngineerUser> engineerUsers = JsonConvert.DeserializeObject<List<Models.EngineerUser>>(result);
                    return Json(new { responseText = "task reassigned" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { responseText = "task not reassigned" }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { responseText = "unavailable" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        [Route("admin/deleteongoing")]
        public ActionResult DeleteOngoingTask(dynamic data)
        {
            if (Session["key"] != null)
            {
                data.access_key = Session["key"].ToString();
                var client = new HttpClient();
                client.BaseAddress = new Uri("http://localhost:54367/api/data/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync("DeleteOngoingTask", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string result = response.Content.ReadAsStringAsync().Result;
                    List<Models.EngineerUser> engineerUsers = JsonConvert.DeserializeObject<List<Models.EngineerUser>>(result);
                    return Json(new { responseText = "task deleted" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { responseText = "task not deleted" }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { responseText = "unavailable" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        [Route("admin/deleteunassigned")]
        public ActionResult DeleteUnassignedTask(dynamic data)
        {
            if (Session["key"] != null)
            {
                data.access_key = Session["key"].ToString();
                var client = new HttpClient();
                client.BaseAddress = new Uri("http://localhost:54367/api/data/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync("DeleteUnassignedTask", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string result = response.Content.ReadAsStringAsync().Result;
                    List<Models.EngineerUser> engineerUsers = JsonConvert.DeserializeObject<List<Models.EngineerUser>>(result);
                    return Json(new { responseText = "task deleted" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { responseText = "task not deleted" }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { responseText = "unavailable" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        [Route("admin/newunassigned")]
        public ActionResult NewUnassignedTask(dynamic data)
        {
            if (Session["key"] != null)
            {
                data.access_key = Session["key"].ToString();
                var client = new HttpClient();
                client.BaseAddress = new Uri("http://localhost:54367/api/data/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync("NewUnassignedTask", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string result = response.Content.ReadAsStringAsync().Result;
                    Models.UnassignedTask unassigned = JsonConvert.DeserializeObject<Models.UnassignedTask>(result);
                    return Json(new { unassigned }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { responseText = "not_created" }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { responseText = "unavailable" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        [Route("admin/newongoing")]
        public ActionResult NewOngoingTask(Models.NewOngoingTaskParams data)
        {
            if (Session["key"] != null)
            {
                data.access_key = Session["key"].ToString();
                var client = new HttpClient();
                client.BaseAddress = new Uri("http://localhost:54367/api/data/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync("NewOngoingTask", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string result = response.Content.ReadAsStringAsync().Result;
                    Models.OngoingTask ongoing = JsonConvert.DeserializeObject<Models.OngoingTask>(result);
                    return Json(new { ongoing }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { responseText = "not_created" }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { responseText = "unavailable" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        [Route("admin/movetounassigned")]
        public ActionResult MoveToUnassigned(Models.NewOngoingTaskParams data)
        {
            if (Session["key"] != null)
            {
                data.access_key = Session["key"].ToString();
                var client = new HttpClient();
                client.BaseAddress = new Uri("http://localhost:54367/api/data/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync("MoveToUnassigned", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string result = response.Content.ReadAsStringAsync().Result;
                    Models.UnassignedTask unassigned = JsonConvert.DeserializeObject<Models.UnassignedTask>(result);
                    return Json(new { unassigned }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { responseText = "not_moved" }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { responseText = "unavailable" }, JsonRequestBehavior.AllowGet);
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
            HttpResponseMessage response = client.PostAsync("GetUnassignedTask", content).Result;
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
            HttpResponseMessage response = client.PostAsync("GetOngoingTasks", content).Result;
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