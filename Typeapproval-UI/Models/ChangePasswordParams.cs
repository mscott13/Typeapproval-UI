using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class ChangePasswordParams
    {
        public string old_psw { get; set; }
        public string new_psw { get; set; }
    }
}