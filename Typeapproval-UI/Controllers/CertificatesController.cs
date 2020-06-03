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
    public class CertificatesController : Controller
    {
        [HttpGet]
        [Route("certificates-personal")]
        public ActionResult Index(string application_id)
        {
            reset_form_session();
            if (application_id != null)
            {
                dynamic _param = new ExpandoObject();
                _param.application_id = application_id;
                _param.access_key = Session["key"].ToString();

                var _client = new HttpClient();
                _client.BaseAddress = new Uri("http://server-erp2.sma.gov.jm:1786/api/data/");
                _client.DefaultRequestHeaders.Accept.Clear();
                _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var _content = new StringContent(JsonConvert.SerializeObject(_param), Encoding.UTF8, "application/json");
                HttpResponseMessage _response = _client.PostAsync("GetCertificate", _content).Result;
                if (_response.IsSuccessStatusCode)
                {
                    string result = _response.Content.ReadAsStringAsync().Result;
                    Models.Certificate certificate = JsonConvert.DeserializeObject<Models.Certificate>(result);
                    return View(certificate);
                }
                else
                {
                    Models.Certificate certificate = new Models.Certificate();
                    return View(certificate.GetDefaultSample());
                }
            }
            else
            {
                Models.Certificate certificate = new Models.Certificate();
                return View(certificate.GetDefaultSample());
            }
        }

        [HttpGet]
        [Route("certificates-sma")]
        public ActionResult SmaCertificate(string approval_id)
        {
            if (approval_id != null)
            {
                 dynamic _param = new ExpandoObject();
                _param.approval_id = approval_id;

                var _client = new HttpClient();
                _client.BaseAddress = new Uri("http://server-erp2.sma.gov.jm:1786/api/data/");
                _client.DefaultRequestHeaders.Accept.Clear();
                _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var _content = new StringContent(JsonConvert.SerializeObject(_param), Encoding.UTF8, "application/json");
                HttpResponseMessage _response = _client.PostAsync("GetSmaCertificate", _content).Result;
                if (_response.IsSuccessStatusCode)
                {
                    string result = _response.Content.ReadAsStringAsync().Result;
                    Models.Certificate certificate = JsonConvert.DeserializeObject<Models.Certificate>(result);
                    return View(certificate);
                }
                else
                {
                    Models.Certificate certificate = new Models.Certificate();
                    return View(certificate.GetDefaultSample());
                }
            }
            else
            {
                Models.Certificate certificate = new Models.Certificate();
                return View(certificate.GetDefaultSample());
            }
        }

        private void reset_form_session()
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
            Session.Remove("view_mode");
            Session.Remove("selected_manufacturer");
            Session.Remove("user_type");
        }
    }
}