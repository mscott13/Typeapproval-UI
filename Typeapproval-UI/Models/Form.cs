﻿using System.Collections.Generic;

namespace Typeapproval_UI.Models
{
    public class Form
    {
        public void RemoveNulls()
        {
            if (access_key == null)
            {
                access_key = "";
            }

            if (application_id == null)
            {
                application_id = "";
            }

            if (username == null)
            {
                username = "";
            }

            if (applicant_name == null)
            {
                applicant_name = "";
            }

            if (applicant_tel == null)
            {
                applicant_tel = "";
            }

            if (applicant_address == null)
            {
                applicant_address = "";
            }

            if (applicant_fax == null)
            {
                applicant_fax = "";
            }

            if (applicant_city_town == null)
            {
                applicant_city_town = "";
            }

            if (applicant_contact_person == null)
            {
                applicant_contact_person = "";
            }

            if (applicant_nationality == null)
            {
                  applicant_nationality = "";
            }

            if (manufacturer_name == null)
            {
                manufacturer_name = "";
            }
          
            if(manufacturer_tel == null)
            {
                manufacturer_tel = "";
            }

            if (manufacturer_address == null)
            {
                manufacturer_address = "";
            }

            if (manufacturer_fax == null)
            {
                manufacturer_fax = "";
            }

            if (manufacturer_contact_person == null)
            {
                manufacturer_contact_person = "";
            }

            if (equipment_type == null)
            {
                equipment_type = "";
            }

            if (equipment_description == null)
            {
                equipment_description = "";
            }

            if (product_identification == null)
            {
                product_identification = "";
            }
            
            if(refNum == null)
            {
                refNum = "";
            }

            if (make == null)
            {
                make = "";
            }

            if (software == null)
            {
                software = "";
            }

            if (type_of_equipment == null)
            {
                type_of_equipment = "";
            }

            if (other == null)
            {
                other = "";
            }

            if (antenna_type == null)
            {
                antenna_type = "";
            }

            if(antenna_gain == null)
            {
                antenna_gain = "";
            }

           if(channel == null)
            {
                channel = "";
            }

           if(separation == null)
            {
                separation = "";
            }

            if (frequencies == null)
            {
                frequencies = new List<Frequency>();
            }
            else
            {
                for (int i = 0; i < frequencies.Count; i++)
                {
                    if (frequencies[i].lower_freq == null)
                    {
                        frequencies[i].lower_freq = "";
                    }

                    if (frequencies[i].upper_freq == null)
                    {
                        frequencies[i].upper_freq = "";
                    }

                    if (frequencies[i].power == null)
                    {
                        frequencies[i].power = "";
                    }

                    if (frequencies[i].tolerance == null)
                    {
                        frequencies[i].tolerance = "";
                    }

                    if (frequencies[i].emmission_desig == null)
                    {
                        frequencies[i].emmission_desig = "";
                    }

                    if (frequencies[i].freq_type == null)
                    {
                        frequencies[i].freq_type = "";
                    }
                }
            }
        }

        public string access_key { get; set; }
        public string application_id { get; set; }
        public string username { get; set; }
        public string applicant_name { get; set; }
        public string applicant_tel { get; set; }
        public string applicant_address { get; set; }
        public string applicant_fax { get; set; }
        public string applicant_city_town { get; set; }
        public string applicant_contact_person { get; set; }
        public string applicant_nationality { get; set; }
        public string manufacturer_name { get; set; }
        public string manufacturer_tel { get; set; }
        public string manufacturer_address { get; set; }
        public string manufacturer_fax { get; set; }
        public string manufacturer_contact_person { get; set; }
        public string equipment_type { get; set; }
        public string equipment_description { get; set; }
        public string product_identification { get; set; }
        public string refNum { get; set; }
        public string make { get; set; }
        public string software { get; set; }
        public string type_of_equipment { get; set; }
        public string other { get; set; }
        public string antenna_type { get; set; }
        public string antenna_gain { get; set; }
        public string channel { get; set; }
        public string separation { get; set; }
        public string additional_info { get; set; }
        public List<Frequency> frequencies { get; set; }
        public string status { get; set; }
        public string category { get; set; }
    }
}