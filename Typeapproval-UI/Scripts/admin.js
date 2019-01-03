$(document).ready(function () {

    var unassigned_action = '';
    var ongoing_action = '';
    var current_record = null;

    $('body').on('change', 'input[type="checkbox"]', function () {
        current_record = $(this).parent().parent();
        $('input[type="checkbox"]').not(this).prop('checked', false);
        $('.check_task').parent().parent().removeClass('row_hover');

        if ($(this).parent().parent().hasClass('row_hover')) {
            $(this.parent().parent().removeClass('row_hover'));
        }
        else {
            $(this).parent().parent().addClass("row_hover");
        }
    });


    $('#ongoing_action_dropdown').dropdown({
        onChange: function (value, text, $selectedItem) {
            if (value === 'reassign_engineer') {
                ongoing_action = 'reassign_engineer';
                $('#reassign_engineer_select').toggleClass("display_invisible");
            }
            else if (value === 'move_unassigned') {
                ongoing_action = 'move_unassigned';
                $('#reassign_engineer_select').addClass("display_invisible");
            }
        }
    });

    $('#unassigned_action_dropdown').dropdown({
        onChange: function (value, text, $selectedItem) {
            if (value === 'assign_engineer') {
                unassigned_action = 'reassign_engineer';
                $('#assign_engineer_select').toggleClass("display_invisible");
            }
            else if (value === 'delete') {
                unassigned_action = 'move_unassigned';
                $('#assign_engineer_select').addClass("display_invisible");
            }
        }
    });

    $('#reassign_engineer_select').dropdown();
    $('#assign_engineer_select').dropdown();

    $('#btn_ongoing_apply').click(function () {
        var check_tasks = $('#tbl_ongoing .check_task:checked');
        if ($(check_tasks).length > 0)
        {
            var action = $("#ongoing_action_dropdown .item.active.selected").data("value");
            switch (action)
            {
                case "reassign_engineer":
                    var selected_engineer = $("#reassign_engineer_select .item.active.selected").data("value");
                    var reappid = $(current_record).data("appid");
                    reassign_task(reappid, selected_engineer);
                    break;
                case "move_unassigned":
                    var appid = $(current_record).data("appid");
                    move_to_unassigned(appid, current_record);
                    break;
            }
        }
    });

    $('#btn_unassigned_apply').click(function () {
        var check_tasks = $('#tbl_unassigned .check_task:checked');
        if ($(check_tasks).length > 0) {
            var action = $("#unassigned_action_dropdown .item.active.selected").data("value");
            switch (action) {
                case "assign_engineer":
                    var selected_engineer = $("#assign_engineer_select .item.active.selected").data("value");
                    var appid = $(current_record).data("appid");
                    add_ongoing_task(appid, selected_engineer, current_record);
                    break;
                case "delete":
                    var _appid = $(this).parent().parent().data("appid");
                    delete_task(_appid);
                    break;
            }
        }
        else {
            console.log("no record selected");
        }

    });

    function add_ongoing_task(application_id, assigned_to, target_record) {
        var jsonObj = new Object();
        jsonObj.application_id = application_id;
        jsonObj.assigned_to = assigned_to;

        var json = JSON.stringify(jsonObj);
        $('#btn_unassigned_apply').addClass("disabled loading");

        $.ajax({
            type: "POST",
            url: "/admin/newongoing",
            contentType: "application/json; charset=utf-8",
            data: json,
            success: function (data) {
                $('#btn_unassigned_apply').removeClass("disabled loading");

                $(target_record).remove();
                $("#fallback_msg_ongoing").remove();

                var html =
                    "<tr data-appid='" + data.ongoing.application_id + "' class='row_hover'>" +
                    '<td><input type="checkbox" class="check_task" value="" /> &nbsp;&nbsp; <a href="#"><i class="file alternate outline icon"></i> Task #' + data.ongoing.application_id + '</a></td>' +
                    '<td>' + data.ongoing.created_date + '</td>' +
                    '<td>' + data.ongoing.assigned_to + '</td>' +
                    '<td>' + data.ongoing.date_assigned + '</td>' +
                    '<td class="status_submitted">' + data.ongoing.status + '</td>' +
                    "</tr>";

                var htm =
                    "<tr id='fallback_msg_unassigned' colspan = 3>" +
                    "<td>No unassigned applications found.</td>" +
                    "</tr>";

                $(html).prependTo("#tbl_ongoing tbody");

                if ($("#tbl_unassigned tbody tr").length === 0)
                {
                    $("#tbl_unassigned tbody").append(htm);
                }

            },
            error: function (data) {
                $('#btn_unassigned_apply').removeClass("disabled loading");
                console.log(data);
            }
        });
    }

    function move_to_unassigned(application_id, target_record)
    {
        var jsonObj = new Object();
        jsonObj.application_id = application_id;

        var json = JSON.stringify(jsonObj);
        $('#btn_ongoing_apply').addClass("disabled loading");

        $.ajax({
            type: "POST",
            url: "/admin/movetounassigned",
            contentType: "application/json; charset=utf-8",
            data: json,
            success: function (data) {
                $('#btn_ongoing_apply').removeClass("disabled loading");

                $(target_record).remove();
                $("#fallback_msg_unassigned").remove();

                var html =
                    "<tr data-appid='" + data.unassigned.application_id + "'>" +
                    '<td><input type="checkbox" class="check_task" value="" /> &nbsp;&nbsp; <a href="#"><i class="file alternate outline icon"></i> Task #' + data.unassigned.application_id + '</a></td>' +
                    '<td>' + data.unassigned.created_date + '</td>' +
                    '<td>' + data.unassigned.submitted_by + '</td>' +
                    "</tr>";

                var htm =
                    "<tr id='fallback_msg_ongoing' colspan = 3>" +
                    "<td>No ongoing applications found.</td>" +
                    "</tr>";

                $(html).appendTo("#tbl_unassigned tbody");

                if ($("#tbl_ongoing tbody tr").length === 0) {
                    $("#tbl_ongoing tbody").append(htm);
                }

            },
            error: function (data) {
                $('#btn_ongoing_apply').removeClass("disabled loading");
                console.log(data);
            }
        });
    }

    function add_unassigned_task(application_id, submitted_by) {

    }

    function delete_task(application_id) {

    }

    function reassign_task(application_id, assign_to) {

    }
});