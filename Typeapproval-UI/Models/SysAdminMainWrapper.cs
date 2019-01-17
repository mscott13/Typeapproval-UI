using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class SysAdminMainWrapper
    {
        public List<UserDetails> userDetails { get; set; }
        public List<UserActivity> userActivities { get; set; }
    }
}