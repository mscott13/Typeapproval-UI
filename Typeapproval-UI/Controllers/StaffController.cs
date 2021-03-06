﻿using Newtonsoft.Json;
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
    public class StaffController : Controller
    {
        [Route("staff/get-application/{application}")]
        public ActionResult GetApplication(string application)
        {
            if (Session["key"] != null)
            {
                dynamic param = new ExpandoObject();
                param.application_id = application;
                param.access_key = Session["key"].ToString();
                param.mode = "preview";

                var client = new HttpClient();
                client.BaseAddress = new Uri("http://server-erp2.sma.gov.jm:1786/api/data/");
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

        [Route("staff")]
        public ActionResult Index()
        {
            if (Session["key"] != null)
            {
                if (Convert.ToInt32(Session["user_type"]) == Commons.Constants.USER_TYPE_STAFF)
                {
                    ViewBag.Title = "Task Viewer";
                    var ob = Session["key"];
                    if (Session["key"] == null)
                    {
                        Response.Redirect("~/account");
                        return RedirectToAction("", "account");
                    }

                    if (Session["key"] != null)
                    {
                        Models.GetStaffAssignedTasksParams param = new Models.GetStaffAssignedTasksParams();
                        param.access_key = Session["key"].ToString();
                        param.username = Session["username"].ToString();

                        var client = new HttpClient();
                        client.BaseAddress = new Uri("http://server-erp2.sma.gov.jm:1786/api/data/");
                        client.DefaultRequestHeaders.Accept.Clear();
                        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                        var content = new StringContent(JsonConvert.SerializeObject(param), Encoding.UTF8, "application/json");
                        HttpResponseMessage response = client.PostAsync("GetStaffAssignedTasks", content).Result;
                        if (response.IsSuccessStatusCode)
                        {
                            string result = response.Content.ReadAsStringAsync().Result;
                            List<Models.AssignedTask> assignedTasks = JsonConvert.DeserializeObject<List<Models.AssignedTask>>(result);
                            return View(assignedTasks);
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

        public ActionResult NotAuthorizedView()
        {
            return View();
        }

        public ActionResult NotAuthorizedDownload()
        {
            return View();
        }

        [Route("staff/get/{file}")]
        public ActionResult GetFile(string file)
        {
            if (Session["key"] != null)
            {
                try
                {
                    Models.ApplicationFile application = GetFilePath(file);
                    byte[] fileBytes = System.IO.File.ReadAllBytes(application.path);
                    Response.AppendHeader("Content-Disposition", "inline; filename=\"" + application.filename + "\"");
                    return File(fileBytes, "application/pdf");
                }
                catch (Exception e)
                {
                    return null;
                }
                
            }
            else
            {
                return View("NotAuthorizedView");
            }
        }

        [Route("staff/download/{file}")]
        public ActionResult Download(string file)
        {
            if (Session["key"] != null)
            {
                try
                {
                    Models.ApplicationFile application = GetFilePath(file);
                    byte[] fileBytes = System.IO.File.ReadAllBytes(application.path);
                    return File(fileBytes, "application/pdf", application.filename);
                }
                catch (Exception e)
                {
                    return null;
                }
            }
            else
            {
                return View("NotAuthorizedDownload");
            }
        }

        [Route("staff/get-file-listing/{application_id}")]
        public ActionResult GetFileListing(string application_id)
        {
            if (Session["key"] != null)
            {
                dynamic param = new ExpandoObject();
                param.application_id = application_id;
                param.access_key = Session["key"].ToString();

                var client = new HttpClient();
                client.BaseAddress = new Uri("http://server-erp2.sma.gov.jm:1786/api/data/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var content = new StringContent(JsonConvert.SerializeObject(param), Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync("GetApplicationFileCategories", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string result = response.Content.ReadAsStringAsync().Result;
                    Models.ApplicationFileCategories applicationFileCategories = JsonConvert.DeserializeObject<Models.ApplicationFileCategories>(result);

                    return Json(new { applicationFileCategories }, JsonRequestBehavior.AllowGet);
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

        private Models.ApplicationFile GetFilePath(string file)
        {
            Database.SLW_DatabaseInfo db = new Database.SLW_DatabaseInfo();
            return db.GetFilePath(file);
        }
    }
}