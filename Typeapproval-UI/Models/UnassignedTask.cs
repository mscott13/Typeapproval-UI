﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class UnassignedTask
    {
        public string application_id { get; set; }
        public string created_date { get; set; }
        public string submitted_by { get; set; }
    }
}