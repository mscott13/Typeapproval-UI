using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class PendingApproval
    {
        public string application_id { get; set; }
        public string manufacturer { get; set; }
        public string model { get; set; }
        public string created_date { get; set; }
        public string licensed_date { get; set; }
        public string author { get; set; }
        public string category { get; set; }
    }
}