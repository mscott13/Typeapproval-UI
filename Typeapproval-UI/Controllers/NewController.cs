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
using Typeapproval_UI.Database;

namespace Typeapproval_UI.Controllers
{
    public class NewController : Controller
    {
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "None")]
        [HttpGet]
        [Route("new/step-1")]
        public ActionResult Step1(string from, string preview, string edit, string status)
        {
            if (Session["key"] != null)
            {

                if (from == null)
                {
                    ClearFormSession();
                }

                if (Session["applicant_name"] == null)
                {
                    #region load default information
                    var client = new HttpClient();
                    client.BaseAddress = new Uri("http://localhost:54367/api/data/");
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    dynamic param = new ExpandoObject();
                    param.access_key = Session["key"];
                    var content = new StringContent(JsonConvert.SerializeObject(param), Encoding.UTF8, "application/json");

                    HttpResponseMessage response = client.PostAsync("applicantInfo", content).Result;
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
                        }
                        else
                        {
                            Session["applicant_name"] = (string)obj.name;
                            Session["applicant_tel"] = (string)obj.telephone;
                            Session["applicant_address"] = (string)obj.address;
                            Session["applicant_fax"] = (string)obj.fax;
                            Session["applicant_city_town"] = (string)obj.cityTown;
                            Session["applicant_contact_person"] = (string)obj.contactPerson;
                            Session["applicant_nationality"] = (string)obj.nationality;
                        }

                    }
                    else if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
                    {
                        //return to login
                    }
                    #endregion
                }


                if (edit != null)
                {
                    Session["view_mode"] = "edit";
                    dynamic _param = new ExpandoObject();
                    _param.application_id = edit;
                    _param.access_key = Session["key"].ToString();
                    _param.mode = "edit";
                    _param.status = status;

                    var _client = new HttpClient();
                    _client.BaseAddress = new Uri("http://localhost:54367/api/data/");
                    _client.DefaultRequestHeaders.Accept.Clear();
                    _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    var _content = new StringContent(JsonConvert.SerializeObject(_param), Encoding.UTF8, "application/json");
                    HttpResponseMessage _response = _client.PostAsync("GetApplication", _content).Result;
                    if (_response.IsSuccessStatusCode)
                    {
                        string result = _response.Content.ReadAsStringAsync().Result;
                        Form form = JsonConvert.DeserializeObject<Form>(result);
                        RestoreToSession(form);
                    }
                }
                else if (preview != null)
                {
                    Session["view_mode"] = "preview";
                    dynamic _param = new ExpandoObject();
                    _param.application_id = preview;
                    _param.access_key = Session["key"].ToString();
                    _param.mode = "preview";

                    var _client = new HttpClient();
                    _client.BaseAddress = new Uri("http://localhost:54367/api/data/");
                    _client.DefaultRequestHeaders.Accept.Clear();
                    _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    var _content = new StringContent(JsonConvert.SerializeObject(_param), Encoding.UTF8, "application/json");
                    HttpResponseMessage _response = _client.PostAsync("GetApplication", _content).Result;
                    if (_response.IsSuccessStatusCode)
                    {
                        string result = _response.Content.ReadAsStringAsync().Result;
                        Form form = JsonConvert.DeserializeObject<Form>(result);
                        Session["selected_grantee"] = form.selected_grantee;
                        RestoreToSession(form);
                    }
                }
                else
                {
                    //if (Session["manufacturer_name"] != null)
                    //{
                    //    var s = Session["manufacturer_name"].ToString();
                    //    Session["selected_grantee"] = Session["manufacturer_name"].ToString();
                    //}
                }

                SLW_DatabaseInfo db = new SLW_DatabaseInfo();
                List<Manufacturer> manufacturers = db.GetManufacturers("");

                var str = Session["application_id"];
                return View(manufacturers);
            }
            else
            {
                return RedirectToAction("", "account");
            }
        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "None")]
        [HttpGet]
        [Route("new/step-2")]
        public ActionResult Step2()
        {
            if (Session["key"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("", "account");
            }
        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "None")]
        [HttpGet]
        [Route("new/step-3")]
        public ActionResult Step3()
        {

            if (Session["key"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("", "account");
            }
        }

        [HttpGet]
        [Route("new/edit")]
        public ActionResult Edit(string application_id, string status)
        {
            dynamic param = new ExpandoObject();
            param.application_id = application_id;
            param.mode = "edit";
            param.status = Commons.Constants.INCOMPLETE_TYPE;
            param.access_key = Session["key"].ToString();

            var client = new HttpClient();
            client.BaseAddress = new Uri("http://localhost:54367/api/data/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var content = new StringContent(JsonConvert.SerializeObject(param), Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync("GetApplication", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string result = response.Content.ReadAsStringAsync().Result;
                Form form = JsonConvert.DeserializeObject<Form>(result);
                RestoreToSession(form);
                return Json(new { responseText = "ready" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                string result = response.Content.ReadAsStringAsync().Result;
                return Json(new { responseText = "unavailable" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        [Route("new/preview")]
        public ActionResult Preview(string application_id)
        {
            dynamic param = new ExpandoObject();
            param.application_id = application_id;
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
                Form form = JsonConvert.DeserializeObject<Form>(result);
                return Json(new {form }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { responseText = "unavailable" }, JsonRequestBehavior.AllowGet);
            }
        }

        private void RestoreToSession(Form form)
        {
            Session["save_state"] = "saved";
            Session["application_id"] = form.application_id;
            Session["applicant_name"] = form.applicant_name;
            Session["applicant_tel"] = form.applicant_tel;
            Session["applicant_address"] = form.applicant_address;
            Session["applicant_fax"] = form.applicant_fax;
            Session["applicant_city_town"] = form.applicant_city_town;
            Session["applicant_contact_person"] = form.applicant_contact_person;
            Session["applicant_nationality"] = form.applicant_nationality;

            Session["manufacturer_name"] = form.manufacturer_name;
            Session["grantee_name"] = form.grantee_name;
            Session["grantee_tel"] = form.grantee_tel;
            Session["grantee_address"] = form.grantee_address;
            Session["grantee_fax"] = form.grantee_fax;
            Session["grantee_contact_person"] = form.grantee_contact_person;
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
            Session["additional_info"] = form.additional_info;
            Session["frequencies"] = form.frequencies;
            Session["name_of_test"] = form.name_of_test;
            Session["country"] = form.country;
        }


        [HttpPost]
        [Route("save/step-1")]
        public ActionResult SessionSave1(Form form)
        {
            form.RemoveNulls();
            Session["applicant_name"] = form.applicant_name;
            Session["applicant_tel"] = form.applicant_tel;
            Session["applicant_address"] = form.applicant_address;
            Session["applicant_fax"] = form.applicant_fax;
            Session["applicant_city_town"] = form.applicant_city_town;
            Session["applicant_contact_person"] = form.applicant_contact_person;
            Session["applicant_nationality"] = form.applicant_nationality;

            Session["manufacturer_name"] = form.manufacturer_name;
            Session["grantee_name"] = form.grantee_name;
            Session["grantee_tel"] = form.grantee_tel;
            Session["grantee_address"] = form.grantee_address;
            Session["grantee_fax"] = form.grantee_fax;
            Session["grantee_contact_person"] = form.grantee_contact_person;

            return Json(new { success = true, responseText = "state saved" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [Route("save/step-2")]
        public ActionResult SessionSave2(Form form)
        {
            form.RemoveNulls();
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
            Session["additional_info"] = form.additional_info;
            Session["frequencies"] = form.frequencies;
            Session["name_of_test"] = form.name_of_test;
            Session["country"] = form.country;
            return Json(new { success = true, responseText = "state saved" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [Route("save/step-3")]
        public ActionResult SessionSave3(Form form)
        {
            PostCurrentApplication();
            return Json(new { success = true, responseText = "state saved" }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("retrieve/step-1")]
        public ActionResult RestoreStep1()
        {
            bool initialized = PrepareStep1Session();
            Step1 step1 = new Step1();
            step1.applicant_name = Session["applicant_name"].ToString(); ;
            step1.applicant_telephone = Session["applicant_tel"].ToString(); ;
            step1.applicant_fax = Session["applicant_fax"].ToString();
            step1.applicant_address = Session["applicant_address"].ToString();
            step1.applicant_city_town = Session["applicant_city_town"].ToString();
            step1.applicant_contact_person = Session["applicant_contact_person"].ToString();
            step1.applicant_nationality = Session["applicant_nationality"].ToString();

            step1.manufacturer_name = Session["manufacturer_name"].ToString();
            step1.grantee_name = Session["grantee_name"].ToString();
            step1.grantee_tel = Session["grantee_tel"].ToString();
            step1.grantee_address = Session["grantee_address"].ToString();
            step1.grantee_fax = Session["grantee_fax"].ToString();
            step1.grantee_contact_person = Session["grantee_contact_person"].ToString();

            if (Session["application_id"] != null)
            {
                step1.application_id = Session["application_id"].ToString();
            }
            else
            {
                step1.application_id = "";
            }
            return Json(new { step1, data_present = initialized }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("retrieve/step-2")]
        public ActionResult RestoreStep2()
        {
            bool initialized = PrepareStep2Session();
            Step2 step2 = new Step2();
            step2.equipment_type = Session["equipment_type"].ToString();
            step2.equipment_description = Session["equipment_description"].ToString();
            step2.product_identification = Session["product_identification"].ToString();
            step2.ref_num = Session["refNum"].ToString();
            step2.make = Session["make"].ToString();
            step2.software = Session["software"].ToString();
            step2.equipment_types = Session["type_of_equipment"].ToString();
            step2.other_equipment = Session["other"].ToString();
            step2.antenna_type = Session["antenna_type"].ToString();
            step2.antenna_gain = Session["antenna_gain"].ToString();
            step2.channels = Session["channel"].ToString();
            step2.separation = Session["separation"].ToString();
            step2.additional_info = Session["additional_info"].ToString();
            step2.frequencies = (List<Frequency>)Session["frequencies"];
            step2.name_of_test = Session["name_of_test"].ToString();
            step2.country = Session["country"].ToString();

            if (Session["application_id"] != null)
            {
                step2.application_id = Session["application_id"].ToString();
            }
            else
            {
                step2.application_id = "";
            }

            return Json(new { step2, data_present = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("retrieve/step-3")]
        public ActionResult RestoreStep3()
        {
            bool initialized = PrepareStep3Session();
            Step3 step3 = new Step3();
            step3.name_of_test = Session["name_of_test"].ToString();
            step3.country = Session["country"].ToString();
         

            if (Session["application_id"] != null)
            {
                step3.application_id = Session["application_id"].ToString();
            }
            else
            {
                step3.application_id = "";
            }
            return Json(new { step3, data_present = initialized }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("new/get-save-state")]
        public ActionResult GetFormSaveState()
        {
            if (Session["save_state"] == null)
            {
                return Json(new { state = "unsaved" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { state = "saved" }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        [Route("retrieve/application")]
        public ActionResult GetCurrentApplication()
        {
            PrepareStep1Session();
            PrepareStep2Session();
            PrepareStep3Session();

            Form form = new Form();
            form.access_key = Session["key"].ToString();
            form.username = Session["username"].ToString();

            if (Session["application_id"] != null)
            {
                form.application_id = Session["application_id"].ToString();
            }

            form.username = Session["username"].ToString();
            form.applicant_name = Session["applicant_name"].ToString();
            form.applicant_tel = Session["applicant_tel"].ToString();
            form.applicant_address = Session["applicant_address"].ToString();
            form.applicant_fax = Session["applicant_fax"].ToString();
            form.applicant_city_town = Session["applicant_city_town"].ToString();
            form.applicant_contact_person = Session["applicant_contact_person"].ToString();
            form.applicant_nationality = Session["applicant_nationality"].ToString();

            form.manufacturer_name = Session["manufacturer_name"].ToString();
            form.grantee_name = Session["grantee_name"].ToString();
            form.grantee_tel = Session["grantee_tel"].ToString();
            form.grantee_address = Session["grantee_address"].ToString();
            form.grantee_fax = Session["grantee_fax"].ToString();
            form.grantee_contact_person = Session["grantee_contact_person"].ToString();

            form.equipment_type = Session["equipment_type"].ToString();
            form.equipment_description = Session["equipment_description"].ToString();
            form.product_identification = Session["product_identification"].ToString();
            form.refNum = Session["refNum"].ToString();
            form.make = Session["make"].ToString();
            form.software = Session["software"].ToString();
            form.type_of_equipment = Session["type_of_equipment"].ToString();
            form.other = Session["other"].ToString();
            form.antenna_type = Session["antenna_type"].ToString();
            form.antenna_gain = Session["antenna_gain"].ToString();
            form.channel = Session["channel"].ToString();
            form.separation = Session["separation"].ToString();
            form.additional_info = Session["additional_info"].ToString();
            form.name_of_test = Session["name_of_test"].ToString();
            form.country = Session["country"].ToString();
            form.frequencies = (List<Frequency>)Session["frequencies"];

            if (CheckFormCompleted(form))
            {
                form.status = "completed";
            }
            else
            {
                form.status = "incomplete";
            }

            return Json(new { form }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("new/current_app_id")]
        public ActionResult GetCurrentApplicationId()
        {
            if (Session["application_id"] == null)
            {
                return Json(new { app_id = "" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                string application_id = Session["application_id"].ToString();
                return Json(new { app_id = application_id }, JsonRequestBehavior.AllowGet);
            }
           
        }

        [HttpGet]
        [Route("new/post-current-app")]
        public ActionResult PostCurrentApplication()
        {
            if (Session["key"] != null)
            {
                var step1_status = PrepareStep1Session();
                var step2_status = PrepareStep2Session();
                var step3_status = PrepareStep3Session();

                #region form
                Form form = new Form();
                if (Session["application_id"] != null)
                {
                    form.application_id = Session["application_id"].ToString();
                }

                form.access_key = Session["key"].ToString();
                form.username = Session["username"].ToString();

                form.applicant_name = Session["applicant_name"].ToString();
                form.applicant_tel = Session["applicant_tel"].ToString();
                form.applicant_address = Session["applicant_address"].ToString();
                form.applicant_fax = Session["applicant_fax"].ToString();
                form.applicant_city_town = Session["applicant_city_town"].ToString();
                form.applicant_contact_person = Session["applicant_contact_person"].ToString();
                form.applicant_nationality = Session["applicant_nationality"].ToString();

                form.manufacturer_name = Session["manufacturer_name"].ToString();
                form.grantee_name = Session["grantee_name"].ToString();
                form.grantee_tel = Session["grantee_tel"].ToString();
                form.grantee_address = Session["grantee_address"].ToString();
                form.grantee_fax = Session["grantee_fax"].ToString();
                form.grantee_contact_person = Session["grantee_contact_person"].ToString();

                form.equipment_type = Session["equipment_type"].ToString();
                form.equipment_description = Session["equipment_description"].ToString();
                form.product_identification = Session["product_identification"].ToString();
                form.refNum = Session["refNum"].ToString();
                form.make = Session["make"].ToString();
                form.software = Session["software"].ToString();
                form.type_of_equipment = Session["type_of_equipment"].ToString();
                form.other = Session["other"].ToString();
                form.antenna_type = Session["antenna_type"].ToString();
                form.antenna_gain = Session["antenna_gain"].ToString();
                form.channel = Session["channel"].ToString();
                form.separation = Session["separation"].ToString();
                form.additional_info = Session["additional_info"].ToString();
                form.name_of_test = Session["name_of_test"].ToString();
                form.country = Session["country"].ToString();
                form.frequencies = (List<Frequency>)Session["frequencies"];
                form.status = Commons.Constants.INCOMPLETE_TYPE;
                form.category = Commons.Constants.TYPE_APPROVAL;
                #endregion

                var client = new HttpClient();
                client.BaseAddress = new Uri("http://localhost:54367/api/data/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var content = new StringContent(JsonConvert.SerializeObject(form), Encoding.UTF8, "application/json");

                HttpResponseMessage response = client.PostAsync("CreateApplication", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string result = response.Content.ReadAsStringAsync().Result;
                    result = result.Replace("\"", string.Empty);
                    if (result == "updated")
                    {
                        Session["save_state"] = "saved";
                        return Json(new { responseText = "updated" }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        Session["application_id"] = result;
                        Session["save_state"] = "saved";

                        return Json(new { responseText = "posted", app_id = result }, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    return Json(new { responseText = "not posted" }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { responseText = "session expired" }, JsonRequestBehavior.AllowGet);
            }
        }

        private bool PrepareStep1Session()
        {
            bool initialized = true;

            if (Session["applicant_name"] == null)
            {
                Session["applicant_name"] = "";
            }

            if (Session["applicant_tel"] == null)
            {
                Session["applicant_tel"] = "";
            }

            if (Session["applicant_address"] == null)
            {
                Session["applicant_address"] = "";
            }

            if (Session["applicant_fax"] == null)
            {
                Session["applicant_fax"] = "";
            }

            if (Session["applicant_city_town"] == null)
            {
                Session["applicant_city_town"] = "";
            }

            if (Session["applicant_contact_person"] == null)
            {
                Session["applicant_contact_person"] = "";
            }

            if (Session["applicant_nationality"] == null)
            {
                Session["applicant_nationality"] = "";
            }


            if (Session["manufacturer_name"] == null)
            {
                Session["manufacturer_name"] = "";
                initialized = false;
            }

            if (Session["grantee_name"] == null)
            {
                Session["grantee_name"] = "";
                initialized = false;
            }

            if (Session["grantee_tel"] == null)
            {
                Session["grantee_tel"] = "";
                initialized = false;
            }

            if (Session["grantee_address"] == null)
            {
                Session["grantee_address"] = "";
                initialized = false;
            }

            if (Session["grantee_fax"] == null)
            {
                Session["grantee_fax"] = "";
                initialized = false;
            }

            if (Session["grantee_contact_person"] == null)
            {
                Session["grantee_contact_person"] = "";
                initialized = false;
            }
            return initialized;
        }

        private bool PrepareStep2Session()
        {
            bool initialized = true;
            if (Session["equipment_type"] == null)
            {
                Session["equipment_type"] = "";
                initialized = false;
            }

            if (Session["equipment_description"] == null)
            {
                Session["equipment_description"] = "";
                initialized = false;
            }

            if (Session["product_identification"] == null)
            {
                Session["product_identification"] = "";
                initialized = false;
            }

            if (Session["refNum"] == null)
            {
                Session["refNum"] = "";
                initialized = false;
            }

            if (Session["make"] == null)
            {
                Session["make"] = "";
                initialized = false;
            }

            if (Session["software"] == null)
            {
                Session["software"] = "";
                initialized = false;
            }

            if (Session["type_of_equipment"] == null)
            {
                Session["type_of_equipment"] = "";
                initialized = false;
            }

            if (Session["other"] == null)

            {
                Session["other"] = "";
                initialized = false;
            }

            if (Session["antenna_type"] == null)
            {
                Session["antenna_type"] = "";
                initialized = false;
            }

            if (Session["antenna_gain"] == null)
            {
                Session["antenna_gain"] = "";
                initialized = false;
            }

            if (Session["channel"] == null)
            {
                Session["channel"] = "";
                initialized = false;
            }

            if (Session["separation"] == null)
            {
                Session["separation"] = "";
                initialized = false;
            }


            if (Session["additional_info"] == null)
            {
                Session["additional_info"] = "";
                initialized = false;
            }

            if (Session["name_of_test"] == null)
            {
                Session["name_of_test"] = "";
                initialized = false;
            }

            if (Session["country"] == null)
            {
                Session["country"] = "";
                initialized = false;
            }

            if (Session["frequencies"] == null)
            {
                List<Frequency> frequencies = new List<Frequency>();
                Session["frequencies"] = frequencies;
                initialized = false;
            }

            return initialized;
        }

        private bool PrepareStep3Session()
        {
            bool initialized = true;
            if (Session["name_of_test"] == null)
            {
                Session["name_of_test"] = "";
                initialized = false;
            }

            if (Session["country"] == null)
            {
                Session["country"] = "";
                initialized = false;
            }
            return initialized;
        }

        private bool CheckFormCompleted(Form form)
        {
            bool status = true;
            #region applicant_info
            if (form.applicant_name == null || form.applicant_name == "")
            {
                status = false;
            }
            #endregion

            #region grantee
            if (form.grantee_name == null || form.grantee_name == "")
            {
                status = false;
            }

            if (form.grantee_tel == null || form.grantee_tel == "")
            {
                status = false;
            }

            if (form.grantee_address == null || form.grantee_address == "")
            {
                status = false;
            }
            #endregion

            #region equipment_details
            if (form.equipment_type == null || form.equipment_type == "")
            {
                status = false;
            }

            if (form.equipment_description == null || form.equipment_description == "")
            {
                status = false;
            }

            if (form.product_identification == null || form.product_identification == "")
            {
                status = false;
            }


            if (form.make == null || form.make == "")
            {
                status = false;
            }

            if (form.type_of_equipment == null || form.type_of_equipment == "")
            {
                status = false;
            }

            else if (form.type_of_equipment == "Others")
            {
                if (form.other == null || form.other == "")
                {
                    status = false;
                }
            }

            if (form.antenna_type == null || form.antenna_type == "")
            {
                status = false;
            }

            #endregion

            #region frequency_details
            for (int i = 0; i < form.frequencies.Count; i++)
            {
                if (form.frequencies[i].lower_freq == null || form.frequencies[i].lower_freq == "")
                {
                    status = false;
                }

                if (form.frequencies[i].upper_freq == null || form.frequencies[i].upper_freq == "")
                {
                    status = false;
                }
            }
            #endregion
            return status;
        }

        private void ClearFormSession()
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
            Session.Remove("grantee_name");
            Session.Remove("grantee_tel");
            Session.Remove("grantee_address");
            Session.Remove("grantee_fax");
            Session.Remove("grantee_contact_person");

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
            Session.Remove("view_mode");
        }
    }
}