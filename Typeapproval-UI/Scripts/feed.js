$(document).ready(function () {
  
    function getFeed()
    {
        $.ajax({
            type: "GET",
            url: "/home/get-feed",
            contentType: "application/json; charset=utf-8",
            data: {},
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.log(data);
            }
        });
    }

    function initializeFeed(data)
    {
        var ACCOUNT_TYPE = "Account";
        var APPROVAL_TYPE = "Approval";
        var CANCELLATION_TYPE = "Cancellation";
        var NEW_APPLICATION_TYPE = "New Application";
        var SUBMISSION_TYPE = "Submission";
        var UPDATE = "Update";

        var target = $('.ui.aligned.segment').find(".ui.divider");
        for (var i = 0; i < data.length; i++) 
        {
            var html = '';
            switch (data.type)
            {
                case ACCOUNT_TYPE:
                    break;
                case APPROVAL_TYPE:
                     html =
                        '<div class="ui feed">' +
                        '<div class="event">' +
                        '<div class="label">' +
                        '<i class="green check circle icon"></i>' +
                        '</div>' +
                        '<div class="content">' +
                        '<div class="summary">' +
                        'Submission Successful' +
                        '<div class="date">' +
                        '04.12.2018 08:29 pm' +
                        '</div>' +
                        '</div>' +
                        '<div class="extra text">' +
                        '200933-44089-4944 application was submitted successfully.' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    break;
                case CANCELLATION_TYPE:
                    html =
                        '<div class="ui feed">' +
                        '<div class="event">' +
                        '<div class="label">' +
                        '<i class="red trash alternate icon"></i>' +
                        '</div>' +
                        '<div class="content">' +
                        '<div class="summary">' +
                        ' Application Cancelled' +
                        '<div class="date">' +
                        '04.12.2018 08:29 pm' +
                        '</div>' +
                        '</div>' +
                        '<div class="extra text">' +
                        'Application with ID: 2003-300040-2033 was cancelled' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    break;
                case NEW_APPLICATION_TYPE:
                    html =
                        html =
                        '<div class="ui feed">' +
                        '<div class="event">' +
                        '<div class="label">' +
                        '<i class="blue file alternate icon"></i>' +
                        '</div>' +
                        '<div class="content">' +
                        '<div class="summary">' +
                        'New Application' +
                        ' <div class="date">' +
                        '04.12.2018 08:29 pm' +
                        '</div>' +
                        '</div>' +
                        '<div class="extra text">' +
                        'Application was created with ID: <a><u>2003-33004-30033</u></a>.' +
                        '</div>' +
                        '<div class="meta">' +
                        'status: incomplete' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    break;
                case SUBMISSION_TYPE:
                    break;
                case UPDATE:
                    html =
                        '<div class="ui feed">' +
                        '<div class="event">' +
                        '<div class="label">' +
                        '<i class="red clipboard icon"></i>' +
                        '</div>' +
                        '<div class="content">' +
                        '<div class="summary">' +
                        'Application Update' +
                        '<div class="date">' +
                        '04.12.2018 08:29 pm' +
                        '</div>' +
                        '</div>' +
                        '<div class="extra text">' +
                        '200933-44089-4944 application was updated' +
                        '</div>' +
                        '<div class="meta">' +
                        'status: incomplete' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    break;
            }
        }

        $(html).insertAfter(target);
    }

    getFeed();
});