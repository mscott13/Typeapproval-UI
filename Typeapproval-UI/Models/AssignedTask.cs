using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class AssignedTask
    {
        public string application_id { get; set; }
        public string created_date { get; set; }
        public string assigned_date { get; set; }
        public string submitted_by { get; set; }
        public string status { get; set; }
        public List<ApplicationFiles> applicationFiles { get; set; }
    }
}