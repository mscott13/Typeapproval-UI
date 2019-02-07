using System.Collections.Generic;

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

            if (selected_grantee == null)
            {
                selected_grantee = "";
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

            if (applicant_contact_person == null)
            {
                applicant_contact_person = "";
            }

            if (manufacturer_name == null)
            {
                manufacturer_name = "";
            }

            if (grantee_address == null)
            {
                grantee_address = "";
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

            if (make == null)
            {
                make = "";
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
                }
            }

            if (name_of_test == null)
            {
                name_of_test = "";
            }

            if (country == null)
            {
                country = "";
            }
        }

        public string selected_grantee { get; set; }
        public string access_key { get; set; }
        public string application_id { get; set; }
        public string username { get; set; }
        public string applicant_name { get; set; }
        public string applicant_tel { get; set; }
        public string applicant_address { get; set; }
        public string applicant_fax { get; set; }
        public string applicant_contact_person { get; set; }

        public string grantee_name { get; set; }
        public string grantee_address { get; set; }
        public string equipment_type { get; set; }
        public string equipment_description { get; set; }
        public string product_identification { get; set; }
        public string make { get; set; }
        public List<Frequency> frequencies { get; set; }
        public string status { get; set; }
        public string category { get; set; }
        public string name_of_test { get; set; }
        public string country { get; set; }
        public string manufacturer_name { get; set; }
    }
}