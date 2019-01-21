using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class UserDetails
    {
        public string username { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string fullname { get; set; }
        public string user_type { get; set; }
        public string email { get; set; }
        public DateTime created_date { get; set; }
        public string created_date_str { get; set; }
        public string last_detected_activity_str { get; set; }
        public DateTime last_detected_activity { get; set; }
    }
}