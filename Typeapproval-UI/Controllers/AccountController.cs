﻿ using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Newtonsoft.Json;
using Typeapproval_UI.Models;
using Typeapproval_UI.Database;

namespace Typeapproval_UI.Controllers
{
    public class AccountController : Controller
    {
        [HttpGet]
        [Route("account/account-created")]
        public ActionResult AccountCreated()
        {
            return View();
        }

        [HttpGet]
        [Route("account/reset")]
        public ActionResult ResetPassword()
        {
            return View();
        }

        [HttpGet]
        [Route("account/login")]
        [Route("account")]
        public ActionResult Login()
        {
            if (Session["key"] != null)
            {
                return RedirectToAction("", "home");

            }
            else
            {
                Session.Remove("applicant_name");
                Session.Remove("applicant_tel");
                Session.Remove("applicant_address");
                Session.Remove("applicant_fax");
                Session.Remove("applicant_city_town");
                Session.Remove("applicant_contact_person");
                Session.Remove("applicant_nationality");

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
                Session.Remove("selected_manufacturer");
                Session.Remove("user_type");
                return View();
            }
        }

        [HttpPost]
        [Route("account/login")]
        [Route("account")]
        public async Task<ActionResult> Login(Login login)
        {
            if (ModelState.IsValid)
            {
                var client = new HttpClient();
                client.BaseAddress = new Uri("http://server-erp2.sma.gov.jm:1786/api/user/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var content = new StringContent(JsonConvert.SerializeObject(login), Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PostAsync("login", content);
                if (response.IsSuccessStatusCode)
                {
                    string json = await response.Content.ReadAsStringAsync();
                    dynamic obj = JsonConvert.DeserializeObject<dynamic>(json);

                    Session["key"] = obj.access_key;
                    Session["user_type"] = obj.user_type;
                    Session["name"] = obj.name;
                    Session["username"] = obj.username;
                    string status = obj.status;
                    return Json(new { success = true, responseText = "credentials verified", user_type = (int)obj.user_type }, JsonRequestBehavior.AllowGet);
                }
                else if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
                {
                    string json = await response.Content.ReadAsStringAsync();
                    dynamic obj = JsonConvert.DeserializeObject<dynamic>(json);
                    string status = obj.status;

                    return Json(new { success = false, responseText = "Check username or password" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { success = false, responseText = "bad request" }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { success = false, responseText = "Check parameters" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        [Route("account/logout")]
        public HttpResponseMessage Logout()
        {
            Session.Clear();
            return new HttpResponseMessage(System.Net.HttpStatusCode.OK);
        }

        [HttpGet]
        [Route("account/register")]
        public ActionResult Register()
        {
            SLW_DatabaseInfo db = new SLW_DatabaseInfo();
            List<ClientCompany> companies = db.GetClientDetails("");
            return View(companies);
        }

        [HttpPost]
        [Route("account/changepassword")]
        public ActionResult ChangePassword(ChangePasswordParams data)
        {
            if (Session["username"] != null)
            {
                dynamic param = new ExpandoObject();
                param.old_psw = data.old_psw;
                param.new_psw = data.new_psw;
                param.username = Session["username"].ToString();
                param.access_key = Session["key"].ToString();

                var client = new HttpClient();
                client.BaseAddress = new Uri("http://server-erp2.sma.gov.jm:1786/api/user/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var content = new StringContent(JsonConvert.SerializeObject(param), Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync("ChangePassword", content).Result;
                if (response.IsSuccessStatusCode)
                {

                    return new HttpStatusCodeResult(System.Net.HttpStatusCode.OK, "password_updated");
                }
                else
                {
                    return new HttpStatusCodeResult(System.Net.HttpStatusCode.Unauthorized, "incorrect_password");
                }
            }
            else
            {
                return new HttpStatusCodeResult(System.Net.HttpStatusCode.Unauthorized, "invalid_session");
            }
        }

        private List<ClientCompany> getClients(string clientCompany)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://server-erp2.sma.gov.jm:1786/api/data/ClientCompanyList?q=" + clientCompany);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                
                HttpResponseMessage response = client.GetAsync(client.BaseAddress).Result;
                if (response.IsSuccessStatusCode)
                {
                    string json =  response.Content.ReadAsStringAsync().Result;
                    List<ClientCompany> clientCompanies = JsonConvert.DeserializeObject<List<ClientCompany>>(json);
                    return clientCompanies;
                }
                else
                {
                    return new List<ClientCompany>();
                }
            }
        }
    }
}