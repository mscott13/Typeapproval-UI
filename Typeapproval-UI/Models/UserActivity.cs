using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class UserActivity
    {
        public string username { get; set; }
        public string type { get; set; }
        public string description { get; set; }
        public string extras { get; set; }
        public int priority { get; set; }
        public string date { get; set; }
        public string current_status { get; set; }
    }
}