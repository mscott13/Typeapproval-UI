using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class Step1
    {
        public string applicant_name { get; set; }
        public string applicant_telephone { get; set; }
        public string applicant_address { get; set; }
        public string applicant_fax { get; set; }
        public string applicant_city_town { get; set; }
        public string applicant_nationality { get; set; }
        public string applicant_contact_person { get; set; }
        public string manufacturer_name { get; set; }
        public string manufacturer_tel { get; set; }
        public string manufacturer_address { get; set; }
        public string manufacturer_fax { get; set; }
        public string manufacturer_contact_person { get; set; }
        public string application_id { get; set; }
    }
}