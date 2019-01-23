using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Commons
{
    public static class Constants
    {
        //@"Data Source=SMA-DBSRV\ASMSDEV;Initial Catalog=SLW_Database;Integrated Security=True";
        //@"Data Source=DESKTOP-6DGAJN8\SQLEXPRESS;Initial Catalog=SLW_Database;Integrated Security=True"
        //@"Data Source=DESKTOP-E9VTQUL\SQLEXPRESS;Initial Catalog=SLW_Database;Integrated Security=True"

        public const string databaseConnection = @"Data Source=SMA-DBSRV\ASMSDEV;Initial Catalog=SLW_Database;Integrated Security=True";
        //activity types
        public const string ACTIVITY_ACCOUNT_TYPE = "Account";
        public const string ACTIVITY_APPROVAL_TYPE = "Approval";
        public const string ACTIVITY_CANCELLATION_TYPE = "Cancellation";
        public const string ACTIVITY_NEW_APPLICATION_TYPE = "New Application";
        public const string ACTIVITY_SUBMISSION_TYPE = "Submission";
        public const string ACTIVITY_UPDATE = "Update";
        public const string ACTIVITY_NEW_UNASSIGNED = "New Unassigned";
        public const string ACTIVITY_NEW_ONGOING = "New Ongoing";
        public const string ACTIVITY_MOVE_UNASSAIGNED = "Move Unassigned";
        public const string ACTIVITY_MOVE_ONGOING = "Move Ongoing";
        public const string ACTIVITY_REJECT_UNASSIGNED = "Reject Unassigned";
        public const string ACTIVITY_SET_EMAIL = "Set Email";
        public const string ACTIVITY_CHANGE_PASSWORD = "Change Password";
        public const string ACTIVITY_RESET_PASSWORD = "Reset Password";
        public const string ACTIVITY_LOGIN = "Login";
        public const string ACTIVITY_CREATE_ACCOUNT = "Create Account";
        public const string ACTIVITY_DELETE_ACCOUNT = "Delete Account";
        public const string ACTIVITY_REASSIGN_TASK = "Task Reassignment";
        public const string ACTIVITY_ASSIGN_TASK = "Task Assignment";
        public const string ACTIVITY_ERROR = "Error";

        //application categories
        public const string TYPE_APPROVAL = "TYPE_APPROVAL";
        public const string MARINE = "MARINE";
        public const string MICROWAVE = "MICROWAVE";
        public const string PRIVATE_RADIO = "PRIVATE_RADIO";

        //application status types
        public const string INCOMPLETE_TYPE = "INCOMPLETE";
        public const string SUBMITTED_TYPE = "SUBMITTED";
        public const string PENDING_TYPE = "PENDING";
        public const string INVOICED_TYPE = "INVOICED";
        public const string LICENSED_TYPE = "LICENSED";
        public const string REJECTED = "REJECTED";
        public const string PENDING_RESUBMISSION = "RESUBMIT";

        //user types
        public const int USER_TYPE_CLIENT = 0;
        public const int USER_TYPE_STAFF = 1;
        public const int USER_TYPE_ADMINISTRATOR = 9;
        public const int USER_TYPE_SYS_ADMINISTRATOR = 10;
    }
}