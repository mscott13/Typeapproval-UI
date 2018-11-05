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
    public class NewController : Controller
    {
        [HttpGet]
        [Route("new/step-1")]
        public ActionResult Step1()
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri("http://localhost:54367/api/data/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            dynamic param = new ExpandoObject();
            param.access_key = Session["key"];
            var content = new StringContent(JsonConvert.SerializeObject(param), Encoding.UTF8, "application/json");

            HttpResponseMessage response =  client.PostAsync("applicantInfo", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string json = response.Content.ReadAsStringAsync().Result;
                dynamic obj = JsonConvert.DeserializeObject<dynamic>(json);

                if (Convert.ToString(obj) == "empty")
                {
                    dynamic objEmpty = new ExpandoObject();
                    objEmpty.name = "";
                    objEmpty.telephone = "";
                    objEmpty.address = "";
                    objEmpty.fax = "";
                    objEmpty.cityTown = "";
                    objEmpty.contactPerson = "";
                    objEmpty.nationality = "";
                    ViewData["company"] = objEmpty;
                }
                else
                {
                    ViewData["company"] = obj;
                }
                return View();
            }
            else if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
            {
                //return to login
                
            }
            return View();
        }

        [HttpGet]
        [Route("new/step-2")]
        public ActionResult Step2()
        {
            return View();
        }
    }
}