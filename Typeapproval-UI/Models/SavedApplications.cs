using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class SavedApplications
    {
        public string application_id { get; set; }
        public string created_date { get; set; }
        public string last_updated { get; set; }
        public bool active { get; set; }
    }
}