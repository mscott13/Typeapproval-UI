using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class Step2
    {
        public string application_id { get; set; }
        public string equipment_type { get; set; }
        public string equipment_description { get; set; }
        public string product_identification { get; set; }
        public string make { get; set; }
       
        public List<Frequency> frequencies { get; set; }
        public string name_of_test { get; set; }
        public string country { get; set; }
    }
}