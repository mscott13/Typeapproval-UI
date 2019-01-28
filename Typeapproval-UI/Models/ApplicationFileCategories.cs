using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class ApplicationFileCategories
    {
        public List<ApplicationFiles> technicalSpecifications { get; set; }
        public List<ApplicationFiles> testReport { get; set; }
        public List<ApplicationFiles> accreditation { get; set; }
        public List<ApplicationFiles> letterAuthorization { get; set; }
        public List<ApplicationFiles> userManual { get; set; }
    }
}