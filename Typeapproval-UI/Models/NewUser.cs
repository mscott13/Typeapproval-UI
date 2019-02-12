using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class NewUser
    {
        public string username { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string password { get; set; }
        public string user_type { get; set; }
        public int user_role { get; set; }
        public string email { get; set; }
        public string company { get; set; }
        public int clientId { get; set; }
        public string access_key { get; set; }
        public bool send_credentials { get; set; }
    }
}