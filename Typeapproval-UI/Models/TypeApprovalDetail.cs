using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class TypeApprovalDetail
    {
        public string LowerFrequency { get; set; }
        public string UpperFrequency { get; set; }
        public string PowerOutput { get; set; }
        public string FrequencyTolerance { get; set; }
        public string EmissionClass { get; set; }
    }
}