using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;
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
            if (Session["key"] != null)
            {
                if (Convert.ToInt32(Session["user_type"]) == Commons.Constants.USER_TYPE_ADMINISTRATOR)
                {
                    Models.AdminDashboard adminDashboard = new Models.AdminDashboard();
                    adminDashboard.engineerUsers = GetEngineerUsers();
                    adminDashboard.unassignedTasks = GetUnassignedTasks();
                    adminDashboard.ongoingTasks = GetOngoingTasks();
                    ViewBag.Title = "Task Manager";
                    return View(adminDashboard);
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

        [Route("admin/create-account")]
        public ActionResult CreateAccount()
        {
            if (Session["key"] != null)
            {
                if (Convert.ToInt32(Session["user_type"]) == Commons.Constants.USER_TYPE_ADMINISTRATOR)
                {
                    ViewBag.Title = "Create Account";
                    return View();
                }
                else
                {
                    return RedirectToAction("", "account");
                }
            }
            else
            {
                return RedirectToAction("", "account");
            }
        }

        [Route("admin/get-application/{application}")]
        public ActionResult GetApplication(string application)
        {
            if (Session["key"] != null)
            {
                dynamic param = new ExpandoObject();
                param.application_id = application;
                param.access_key = Session["key"].ToString();
                param.mode = "preview";

                var client = new HttpClient();
                client.BaseAddress = new Uri("http://localhost:54367/api/data/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var content = new StringContent(JsonConvert.SerializeObject(param), Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync("GetApplication", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string result = response.Content.ReadAsStringAsync().Result;
                    Models.Form form = JsonConvert.DeserializeObject<Models.Form>(result);

                    return Json(new { form }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { responseText = "unavailable" }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { responseText = "session_invalid" }, JsonRequestBehavior.AllowGet);
            }
        }


        [Route("admin/all-users")]
        public ActionResult AllUsers()
        {
            ViewBag.Title = "All Users";
            if (Session["key"] != null)
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
                    return View(userDetails);
                }
                else
                {
                    return View();
                }
            }
            else
            {
                return RedirectToAction("", "account");
            }
        }

        [HttpPost]
        [Route("admin/reassign")]
        public ActionResult ReassignTask(Models.ReassignTaskParams param)
        {
            if (Session["key"] != null)
            {
                param.access_key = Session["key"].ToString();
                var client = new HttpClient();
                client.BaseAddress = new Uri("http://localhost:54367/api/data/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var content = new StringContent(JsonConvert.SerializeObject(param), Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync("ReassignTask", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string result = response.Content.ReadAsStringAsync().Result;
                    Models.OngoingTask ongoing = JsonConvert.DeserializeObject<Models.OngoingTask>(result);
                    return Json(new { responseText = "task_reassigned", ongoing }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { responseText = "not_reassigned" }, JsonRequestBehavior.AllowGet);
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
        public ActionResult DeleteUnassignedTask(Models.DeleteUnassignedParams param)
        {
            if (Session["key"] != null)
            {
                param.access_key = Session["key"].ToString();
                var client = new HttpClient();
                client.BaseAddress = new Uri("http://localhost:54367/api/data/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var content = new StringContent(JsonConvert.SerializeObject(param), Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync("DeleteUnassignedTask", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string result = response.Content.ReadAsStringAsync().Result;
                    return Json(new { responseText = "task_deleted" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { responseText = "not_deleted" }, JsonRequestBehavior.AllowGet);
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

        [Route("admin/clientresubmit/{application_id}")]
        public ActionResult ClientResubmit(string application_id)
        {

            if (Session["key"] != null)
            {
                dynamic data = new ExpandoObject();
                data.access_key = Session["key"].ToString();
                data.application_id = application_id;

                var client = new HttpClient();
                client.BaseAddress = new Uri("http://localhost:54367/api/application/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync("ClientResubmission", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string result = response.Content.ReadAsStringAsync().Result;
                    return Json(new { responseText = "updated" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { responseText = "not_updated" }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { responseText = "unavailable" }, JsonRequestBehavior.AllowGet);
            }
        }

        [Route("admin/getclients")]
        public ActionResult GetClients()
        {
            if (Session["key"] != null)
            {
                dynamic param = new ExpandoObject();
                param.access_key = Session["key"].ToString();
                var client = new HttpClient();
                client.BaseAddress = new Uri("http://localhost:54367/api/data/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var content = new StringContent(JsonConvert.SerializeObject(param), Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync("GetClientUsers", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string result = response.Content.ReadAsStringAsync().Result;
                    List<Models.ClientUser> clientUsers = JsonConvert.DeserializeObject<List<Models.ClientUser>>(result);
                    return Json(new { clientUsers }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { responseText = "unavailable" }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { responseText = "invalid session" }, JsonRequestBehavior.AllowGet);
            }
        }

        [Route("admin/getapplicationids/{username}")]
        public ActionResult GetApplicationIDs(string username)
        {
            if (Session["key"] != null)
            {
                dynamic param = new ExpandoObject();
                param.access_key = Session["key"].ToString();
                param.username = username;

                var client = new HttpClient();
                client.BaseAddress = new Uri("http://localhost:54367/api/data/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var content = new StringContent(JsonConvert.SerializeObject(param), Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync("GetApplicationIDsForClient", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string result = response.Content.ReadAsStringAsync().Result;
                    List<string> applications = JsonConvert.DeserializeObject<List<string>>(result);
                    return Json(new { applications }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { responseText = "unavailable" }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { responseText = "invalid session" }, JsonRequestBehavior.AllowGet);
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
                default:
                    return RedirectToAction("", "account");
            }
        }
    }
}