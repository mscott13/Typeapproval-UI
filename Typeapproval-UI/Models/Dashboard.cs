using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Models
{
    public class Dashboard
    {
        public int licensed_app_count { get; set; }
        public int pending_app_count { get; set; }
        public int incomplete_app_count { get; set; }

        public List<PendingApproval> pendingApprovals { get; set; }
        public List<LicensedApplication> licensedApplications { get; set; }
        public List<RecentActivity> recentActivities { get; set; }
    }
}