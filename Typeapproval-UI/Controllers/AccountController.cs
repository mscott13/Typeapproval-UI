using System;

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
        public ActionResult Login()
        {
            if (Session["key"] != null)
            {
                return RedirectToAction("", "home");
               
            }
            else
            {
                return View();
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
       
        public async Task<ActionResult> Login(Models.Login login)
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
                    string status = obj.status;
                    return RedirectToAction("", "Home");
                }
                else if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
                {
                    string json = await response.Content.ReadAsStringAsync();
                    dynamic obj = JsonConvert.DeserializeObject<dynamic>(json);
                    string status = obj.status;

                    ModelState.AddModelError("", "Check username and password");
                    return View(login);
                }
                else
                {
                    ModelState.AddModelError("", "Bad request");
                    return View(login);
                }
            }
            else
            {
                return View(login);
            }
        }

        [HttpPost]
        public HttpResponseMessage Logout()
        {
            Session.Clear();
            return new HttpResponseMessage(System.Net.HttpStatusCode.OK);
        }

    }
}