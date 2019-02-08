using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class Manufacturer
    {
        public Manufacturer(string name, string address)
        {
            this.name = name;
            this.address = address;
        }

        public string name { get; set; }
        public string address { get; set; }
    }
}