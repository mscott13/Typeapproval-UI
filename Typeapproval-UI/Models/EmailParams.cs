using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class EmailParams
    {
        public string email { get; set; }
        public DateTime last_accessed { get; set; }
        public string company_name { get; set; }
        public string access_key { get; set; }
    }
}   