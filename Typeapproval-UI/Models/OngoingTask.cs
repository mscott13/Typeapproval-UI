using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class OngoingTask
    {
        public string application_id { get; set; }
        public string created_date { get; set; }
        public string assigned_to { get; set; }
        public string date_assigned { get; set; }
        public string status { get; set; }
    }
}