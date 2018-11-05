using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class Frequency
    {
        public string application_id { get; set; }
        public int sequence { get; set; }
        public string lower_freq { get; set; }
        public string upper_freq { get; set; }
        public string power { get; set; }
        public string tolerance { get; set; }
        public string emmission_desig { get; set; }
        public string freq_type { get; set; }
    }
}