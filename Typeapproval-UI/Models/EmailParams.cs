using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class EmailParams
    {
        public string email { get; set; }
        public string password { get; set; }
        public string access_key { get; set; }
        public bool test_send { get; set; }
    }
}