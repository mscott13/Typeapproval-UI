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
using Typeapproval_UI.Models;

namespace Typeapproval_UI.Controllers
{
    public class NewController : Controller
    {
        [HttpGet]
        [Route("new/step-1")]
        public ActionResult Step1(string from)
        {
            if (from == null)
            {
                Session.Remove("manufacturer_name");
                Session.Remove("manufacturer_tel");
                Session.Remove("manufacturer_address");
                Session.Remove("manufacturer_fax");
                Session.Remove("manufacturer_contact_person");
                Session.Remove("provider_name");
                Session.Remove("provider_telephone");
                Session.Remove("provider_address");
                Session.Remove("provider_fax");
                Session.Remove("provider_contact_person");
            }

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
            Session["equipment_type"] = form.equipment_type;
            Session["equipment_description"] = form.equipment_description;
            Session["product_identification"] = form.product_identification;
            Session["refNum"] = form.refNum;
            Session["make"] = form.make;
            Session["software"] = form.software;
            Session["type_of_equipment"] = form.type_of_equipment;
            Session["other"] = form.other;
            Session["antenna_type"] = form.antenna_type;
            Session["antenna_gain"] = form.antenna_gain;
            Session["channel"] = form.channel;
            Session["separation"] = form.separation;
            Session["aspect"] = form.aspect;
            Session["compatibility"] = form.compatibility;
            Session["security"] = form.security;
            Session["equipment_comm_type"] = form.equipment_comm_type;
            Session["fee_code"] = form.fee_code;
            Session["frequencies"] = form.frequencies;
            return Json(new { success = true, responseText = "state saved" }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("retrieve/step-1")]
        public ActionResult RestoreStep1() 
        {
            bool initialized = PrepareStep1Session();
            Step1 step1 = new Step1();
            step1.manufacturer_name = Session["manufacturer_name"].ToString();
            step1.manufacturer_tel = Session["manufacturer_tel"].ToString();
            step1.manufacturer_address = Session["manufacturer_address"].ToString();
            step1.manufacturer_fax = Session["manufacturer_fax"].ToString();
            step1.manufacturer_contact_person = Session["manufacturer_contact_person"].ToString();
            step1.provider_name = Session["provider_name"].ToString();
            step1.provider_telephone = Session["provider_telephone"].ToString();
            step1.provider_address = Session["provider_address"].ToString();
            step1.provider_fax = Session["provider_fax"].ToString();
            step1.provider_contact_person = Session["provider_contact_person"].ToString();

            return Json(new { step1, data_present = initialized }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("retrieve/step-2")]
        public ActionResult RestoreStep2()
        {
            return null;
        }

        private bool PrepareStep1Session()
        {
            bool initialized = true;

            if (Session["manufacturer_name"] == null)
            {
                Session["manufacturer_name"] = "";
                initialized = false;
            }

            if (Session["manufacturer_tel"] == null)
            {
                Session["manufacturer_tel"] = "";
                initialized = false;
            }

            if (Session["manufacturer_address"] == null)
            {
                Session["manufacturer_address"] = "";
                initialized = false;
            }

            if (Session["manufacturer_fax"] == null)
            {
                Session["manufacturer_fax"] = "";
                initialized = false;
            }

            if (Session["manufacturer_contact_person"] == null)
            {
                Session["manufacturer_contact_person"] = "";
                initialized = false;
            }

            if (Session["provider_name"] == null)
            {
                Session["provider_name"] = "";
                initialized = false;
            }

            if (Session["provider_telephone"] == null)
            {
                Session["provider_telephone"] = "";
                initialized = false;
            }

            if (Session["provider_address"] == null)
            {
                Session["provider_address"] = "";
                initialized = false;
            }

            if (Session["provider_fax"] == null)
            {
                Session["provider_fax"] = "";
                initialized = false;
            }

            if (Session["provider_contact_person"] == null)
            {
                Session["provider_contact_person"] = "";
                initialized = false;
            }

            return initialized;
        }
    }
}