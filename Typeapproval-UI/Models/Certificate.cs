using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class Certificate
    {
        public List<Frequency> frequencies { get; set; }
        public string manufacturer_name { get; set; }
        public string manufacturer_address { get; set; }
        public string product_identification { get; set; }
        public string equipment_description { get; set; }

        public Certificate GetDefaultSample()
        {
            frequencies = new List<Frequency>();
            Frequency frequency = new Frequency();
            frequency.application_id = "00000";
            frequency.emmission_desig = "";
            frequency.freq_type = "R";
            frequency.lower_freq = "2410";
            frequency.upper_freq = "2510";
            frequency.power = "0.00000100";
            frequency.tolerance = "";
            frequency.sequence = 1;
            frequency.authorization_notes = "FCC ID: MG3-0602284";
            frequencies.Add(frequency);

            manufacturer_name = "Universal Electronics Inc.";
            manufacturer_address = "201 East Sandepointe Ave, 8th Floor, Santa Anna CA 92707 USA";
            product_identification = "060-2284";
            equipment_description = "JPN Panasonic Viera TV Touch Pad BT remote - Spread Sectrum Transmitter";

            return this;
        }
    }
}