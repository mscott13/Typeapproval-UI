using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class ApplicationFile
    {
        public ApplicationFile(string path, string filename)
        {
            this.path = path;
            this.filename = filename;
        }

        public string path { get; set; }
        public string filename { get; set; }
    }
}