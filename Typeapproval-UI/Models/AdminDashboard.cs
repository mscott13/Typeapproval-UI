using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class AdminDashboard
    {
        public List<EngineerUser> engineerUsers { get; set; }
        public List<UnassignedTask> unassignedTasks { get; set; }
        public List<OngoingTask> ongoingTasks { get; set; }
    }
}