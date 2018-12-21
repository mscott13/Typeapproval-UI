using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Newtonsoft.Json;
using Typeapproval_UI.Models;

namespace Typeapproval_UI.Controllers
{
    public class AccountController : Controller
    {
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
                client.BaseAddress = new Uri("http://localhost:54367/api/user/");
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
                    return Json(new { success = true, responseText = "credentials verified", user_type = (int) obj.user_type }, JsonRequestBehavior.AllowGet);
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
            return View();
        }

        private List<ClientCompany> getClients(string clientCompany)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://localhost:54367/api/data/ClientCompanyList?q="+ clientCompany);
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