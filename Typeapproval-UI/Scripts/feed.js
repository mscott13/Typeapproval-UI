﻿$(document).ready(function () {
  
    function getFeed()
    {
        $.ajax({
            type: "GET",
            url: "/home/get-feed",
            contentType: "application/json; charset=utf-8",
            data: {},
            success: function (data) {
                console.log(data);
                initializeFeed(data.userActivities);
            },
            error: function (data) {
                console.log(data);
            }
        });
    }


    function getRecentDocs() {
        $.ajax({
            type: "GET",
            url: "/home/get-recents",
            contentType: "application/json; charset=utf-8",
            data: {},
            success: function (data) {
                console.log(data);
                initializeRecentDocs(data.recentDocuments);
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
        if (data.length > 0) {
            for (var i = data.length - 1; i > -1; i--) {
                var html = '';
                if (data[i].type == ACCOUNT_TYPE) {
                    //implementing soon
                }
                else if (data[i].type == APPROVAL_TYPE) {
                    //implementing soon
                }
                else if (data[i].type == SUBMISSION_TYPE) {
                    html =
                        '<div class="ui feed">' +
                        '<div class="event">' +
                        '<div class="label">' +
                        '<i class="check circle icon"></i>' +
                        '</div>' +
                        '<div class="content">' +
                        '<div class="summary">' +
                        '' + data[i].type + '' +
                        '<div class="date">' +
                        '' + data[i].date + '' +
                        '</div>' +
                        '</div>' +
                        '<div class="extra text">' +
                        '<a>' + data[i].description + '</a> application was submitted successfully.' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
                else if (data[i].type == CANCELLATION_TYPE) {
                    html =
                        '<div class="ui feed">' +
                        '<div class="event">' +
                        '<div class="label">' +
                        '<i class="red trash alternate icon"></i>' +
                        '</div>' +
                        '<div class="content">' +
                        '<div class="summary">' +
                        ' ' + data[i].type + '' +
                        '<div class="date">' +
                        '' + data[i].date + '' +
                        '</div>' +
                        '</div>' +
                        '<div class="extra text">' +
                        'Application with ID: <a>' + data.description + '</a> was cancelled' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }

                else if (data[i].type == NEW_APPLICATION_TYPE) {
                    html =
                        '<div class="ui feed">' +
                        '<div class="event">' +
                        '<div class="label">' +
                        '<i class="file alternate icon"></i>' +
                        '</div>' +
                        '<div class="content">' +
                        '<div class="summary">' +
                        '' + data[i].type + '' +
                        ' <div class="date">' +
                        '' + data[i].date + '' +
                        '</div>' +
                        '</div>' +
                        '<div class="extra text">' +
                        'Application was created with ID: <a>' + data[i].description + '</a>.' +
                        '</div>' +
                        '<div class="meta">' +
                        '' + data[i].extras + '' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
                else if (data[i].type == UPDATE) {
                    html =
                        '<div class="ui feed">' +
                        '<div class="event">' +
                        '<div class="label">' +
                        '<i class="pencil alternate icon"></i>' +
                        '</div>' +
                        '<div class="content">' +
                        '<div class="summary">' +
                        '' + data[i].type + '' +
                        '<div class="date">' +
                        '' + data[i].date + '' +
                        '</div>' +
                        '</div>' +
                        '<div class="extra text">' +
                        '<a>' + data[i].description + '</a> application was updated' +
                        '</div>' +
                        '<div class="meta">' +
                        '' + data[i].extras + '' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
                $(html).insertAfter(target);
            }
            $('.ui.tiny.active.centered.inline.text.loader.feed').remove();
        }
        else
        {
            $('.ui.tiny.active.centered.inline.text.loader.feed').remove();
            var htm = '<p>No activities found on your account</p>';
            $(htm).insertAfter(target);
        }
    }

    function initializeRecentDocs(data) {
        if (data.length > 0) {
            var target = $('#recentDocs .ui.relaxed.divided.list');
            for (var i = 0; i < data.length; i++) {
                var html =
                    '<div class="item">' +
                    '<i class="large file alternate middle aligned icon"></i>' +
                    '<div class="content">' +
                    ' <a class="header">' + data[i].application_id + '</a>' +
                    '<div class="description">Last updated: ' + data[i].last_update + '</div>' +
                    '</div>' +
                    '</div>';

                $(target).append(html);
            }
            $('.ui.tiny.active.centered.inline.text.loader.docs').remove();
        }
        else
        {
            $('.ui.tiny.active.centered.inline.text.loader.docs').remove();
            $('#recentDocs').find('.ui.relaxed.divided.list').remove();
            $('#recentDocs').html("No recent documents found.");
        }
    }


    getRecentDocs();
    getFeed();
});