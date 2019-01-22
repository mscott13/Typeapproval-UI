using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class ResetPasswordParams
    {
        public string access_key { get; set; }
        public string username { get; set; }
        public string new_password { get; set; }
    }
}