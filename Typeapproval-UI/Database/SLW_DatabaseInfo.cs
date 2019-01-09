using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

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
    }
}