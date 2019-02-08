using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Typeapproval_UI.Models;

namespace Typeapproval_UI.Database
{
    public class SLW_DatabaseInfo
    {
        string SLW_dbConn = Commons.Constants.databaseConnection;

        public Models.ApplicationFile GetFilePath(string file_id)
        {
            SqlConnection conn = new SqlConnection(SLW_dbConn);
            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader = null;
            cmd.CommandText = "sp_getFilePath @file_id";
            cmd.Parameters.AddWithValue("@file_id", file_id);
            cmd.Connection = conn;

            conn.Open();
            reader = cmd.ExecuteReader();
            if (reader.HasRows)
            {
                reader.Read();
                Models.ApplicationFile application = new Models.ApplicationFile(reader["path"].ToString(), reader["filename"].ToString());
                conn.Close();
                return application;
            }
            else
            {
                conn.Close();
                return null;
            }
        }

        public List<Manufacturer> GetManufacturers(string query)
        {
            SqlConnection conn = new SqlConnection(SLW_dbConn);
            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader = null;
            List<Manufacturer> manufacturers = new List<Manufacturer>();
            cmd.CommandText = "sp_getManufacturers @query";
            cmd.Parameters.AddWithValue("@query", query);

            cmd.Connection = conn;
            conn.Open();
            reader = cmd.ExecuteReader();

            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    manufacturers.Add(new Manufacturer(reader["Dealer"].ToString(), reader["Address2"].ToString()));
                }
            }
            reader.Close();
            conn.Close();

            return FixDuplicates(manufacturers);
        }

        public List<Manufacturer> GetLocalManufacturers()
        {
            SqlConnection conn = new SqlConnection(SLW_dbConn);
            SqlCommand cmd = new SqlCommand();
            List<Manufacturer> manufacturers = new List<Manufacturer>();
            SqlDataReader reader = null;
            cmd.CommandText = " sp_getLocalManufacturers @manufacturer_id";
            cmd.Parameters.AddWithValue("@manufacturer_id", "");
            cmd.Connection = conn;

            conn.Open();
            reader = cmd.ExecuteReader();

            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    manufacturers.Add(new Manufacturer(reader["dealer"].ToString(), reader["address"].ToString()));
                }
            }

            conn.Close();
            return manufacturers;
        }

        public List<ClientCompany> FixClientDuplicates(List<ClientCompany> data)
        {
            List<ClientCompany> group = new List<ClientCompany>();
            List<ClientCompany> duplicates = new List<ClientCompany>();
            bool addToGroup = true;

            for (int i = 0; i < data.Count; i++)
            {
                addToGroup = true;
                if (group.Count == 0)
                {
                    group.Add(data[i]);
                }
                else
                {
                    for (int j = 0; j < group.Count; j++)
                    {
                        if (group[j].name.ToLower() == data[i].name.ToLower())
                        {
                            duplicates.Add(data[i]);
                            j = group.Count;
                            addToGroup = false;
                        }
                    }

                    if (addToGroup)
                    {
                        group.Add(data[i]);
                    }
                }
            }
            group.Sort((a, b) => a.name.CompareTo(b.name));
            return group;
        }

        public List<Manufacturer> FixDuplicates(List<Manufacturer> data)
        {
            List<Manufacturer> group = new List<Manufacturer>();
            List<Manufacturer> duplicates = new List<Manufacturer>();
            bool addToGroup = true;

            for (int i = 0; i < data.Count; i++)
            {
                addToGroup = true;
                if (group.Count == 0)
                {
                    group.Add(data[i]);
                }
                else
                {
                    for (int j = 0; j < group.Count; j++)
                    {
                        if (group[j].name.ToLower() == data[i].name.ToLower())
                        {
                            duplicates.Add(data[i]);
                            j = group.Count;
                            addToGroup = false;
                        }
                    }

                    if (addToGroup)
                    {
                        group.Add(data[i]);
                    }
                }
            }
            group.Sort((a, b) => a.name.CompareTo(b.name));
            return group;
        }

        public List<ClientCompany> GetClientDetails(string query)
        {
            SqlConnection conn = new SqlConnection(SLW_dbConn);
            SqlCommand cmd = new SqlCommand();
            SqlDataReader reader = null;
            cmd.CommandText = "sp_getClientDetails @clientCompany";
            cmd.Parameters.AddWithValue("@clientCompany", query);
            cmd.Connection = conn;
            List<ClientCompany> clientCompanies = new List<ClientCompany>();

            conn.Open();
            reader = cmd.ExecuteReader();

            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    clientCompanies.Add(new ClientCompany(reader["clientId"].ToString(), reader["clientCompany"].ToString(), reader["clientTelNum"].ToString(),
                                                          reader["address"].ToString(), reader["clientFaxNum"].ToString(), "", "", reader["nationality"].ToString()));
                }
            }
            conn.Close();
            return FixClientDuplicates(clientCompanies);
        }
    }
}