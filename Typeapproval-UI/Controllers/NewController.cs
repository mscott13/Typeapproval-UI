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
using Typeapproval_UI.Models;

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
                    Session["applicant_name"] = (string)obj.name;
                    Session["applicant_tel"] = (string)obj.telephone;
                    Session["applicant_address"] = (string)obj.address;
                    Session["applicant_fax"] = (string)obj.fax;
                    Session["applicant_city_town"] = (string)obj.cityTown;
                    Session["applicant_contact_person"] = (string)obj.contactPerson;
                    Session["applicant_nationality"] = (string)obj.nationality;
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

        [HttpPost]
        [Route("save/step-1")]
        public ActionResult SessionSave1(Form form)
        {
            Session["manufacturer_name"] = form.manufacturer_name;
            Session["manufacturer_tel"] = form.manufacturer_tel;
            Session["manufacturer_address"] = form.manufacturer_address;
            Session["manufacturer_fax"] = form.manufacturer_fax;
            Session["manufacturer_contact_person"] = form.manufacturer_contact_person;
            Session["provider_name"] = form.provider_name;
            Session["provider_telephone"] = form.provider_telephone;
            Session["provider_address"] = form.provider_address;
            Session["provider_fax"] = form.provider_fax;
            Session["provider_contact_person"] = form.provider_contact_person;

            return Json(new { success = true, responseText = "state saved" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [Route("save/step-2")]
        public ActionResult SessionSave2(Form form)
        {
           
            return Json(new { success = true, responseText = "state saved" }, JsonRequestBehavior.AllowGet);
        }
    }
}