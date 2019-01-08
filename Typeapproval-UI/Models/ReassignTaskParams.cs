using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class ReassignTaskParams
    {
        public string application_id { get; set; }
        public string assign_to { get; set; }
        public string access_key { get; set; }
    }
}