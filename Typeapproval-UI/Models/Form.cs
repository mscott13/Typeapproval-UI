using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class Form
    {
        public string access_key { get; set; }
        public string applicationId { get; set; }
        public string username { get; set; }
        public string applicant_name { get; set; }
        public string applicant_tel { get; set; }
        public string applicant_address { get; set; }
        public string applicant_fax { get; set; }
        public string applicant_city_town { get; set; }
        public string applicant_contact_person { get; set; }
        public string applicant_nationality { get; set; }
        public string manufacturer_name { get; set; }
        public string manufacturer_tel { get; set; }
        public string manufacturer_address { get; set; }
        public string manufacturer_fax { get; set; }
        public string manufacturer_contact_person { get; set; }
        public string provider_name { get; set; }
        public string provider_telephone { get; set; }
        public string provider_address { get; set; }
        public string provider_fax { get; set; }
        public string provider_contact_person { get; set; }
        public string equipment_type { get; set; }
        public string equipment_description { get; set; }
        public string product_identification { get; set; }
        public string refNum { get; set; }
        public string make { get; set; }
        public string software { get; set; }
        public string type_of_equipment { get; set; }
        public string other { get; set; }
        public string antenna_type { get; set; }
        public string antenna_gain { get; set; }
        public string channel_separation { get; set; }
        public string aspect { get; set; }
        public string compatibility { get; set; }
        public string security { get; set; }
        public string equipment_comm_type { get; set; }
        public string fee_code { get; set; }
        public List<Frequency> frequencies { get; set; }
    }
}