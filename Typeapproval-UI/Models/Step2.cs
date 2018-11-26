using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class Step2
    {
        public string equipment_type { get; set; }
        public string equipment_description { get; set; }
        public string product_identification { get; set; }
        public string ref_num { get; set; }
        public string make { get; set; }
        public string software { get; set; }
        public string equipment_types { get; set; }
        public string other_equipment { get; set; }
        public List<Frequency> frequencies { get; set; }
        public string antenna_type { get; set; }
        public string antenna_gain { get; set; }
        public string channels { get; set; }
        public string separation { get; set; }
        public string aspect { get; set; }
        public string compatibility { get; set; }
        public string security { get; set; }
        public string equipment_comm_type { get; set; }
        public string fee_code { get; set; }
    }
}