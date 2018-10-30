using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Typeapproval_UI.Models
{
    public class Login
    {
        [Required(ErrorMessage = "Username required")]
        [Display(Name = "Username")]
        public string username { get; set; }

        [Required(ErrorMessage = "Password required")]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string password { get; set; }
    }
}