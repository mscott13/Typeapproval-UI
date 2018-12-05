using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class RecentDocuments
    {
        public string application_id { get; set; }
        public string date { get; set; }
        public string status { get; set; }
        public string last_update { get; set; }
    }
}