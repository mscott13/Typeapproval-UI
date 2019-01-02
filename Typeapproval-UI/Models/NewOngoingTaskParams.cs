using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class NewOngoingTaskParams
    {
        public string application_id { get; set; }
        public string access_key { get; set; }
        public string assigned_to { get; set; }
    }
}