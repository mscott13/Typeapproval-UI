using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class Manufacturer
    {
        public Manufacturer(string name, string address, string telephone, string fax, string contact_person)
        {
            this.name = name;
            this.address = address;
            this.telephone = telephone;
            this.fax = fax;
            this.contact_person = contact_person;

        }

        public string name { get; set; }
        public string address { get; set; }
        public string telephone { get; set; }
        public string fax { get; set; }
        public string contact_person { get; set; }
    }
}