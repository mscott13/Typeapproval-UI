using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Typeapproval_UI.Commons
{
    public static class Constants
    {
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
    }
}