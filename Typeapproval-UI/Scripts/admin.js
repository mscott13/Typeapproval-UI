$(document).ready(function () {

    var unassigned_action = '';
    var ongoing_action = '';
    var current_record = null;

    $('body').on('change', 'input[type="checkbox"]', function () {

        current_record = $(this).parent().parent();
        $('.check_task').parent().parent().removeClass('row_hover');
        $('input[type="checkbox"]').not(this).prop('checked', false);
        var target_table = $(current_record).parent().parent().attr("id");

        if ($(this).is(":checked")) {
            $(current_record).addClass("row_hover");
            enable_disable_apply(target_table, 'enable');
        }
        else
        {
            enable_disable_apply(target_table, 'disable');
            $(current_record).removeClass("row_hover");
        }
    });

    function enable_disable_apply(target, action)
    {
        if (target === 'tbl_unassigned') {
            if (action === 'enable') {
                $("#btn_unassigned_apply").addClass("blue");
                $("#btn_unassigned_apply").removeClass("disabled");
            }
            else if (action === 'disable')
            {
                $("#btn_unassigned_apply").removeClass("blue");
                $("#btn_unassigned_apply").addClass("disabled");
            }
        }
        else if (target === 'tbl_ongoing')
        {
            if (action === 'enable') {
                $("#btn_ongoing_apply").addClass("blue");
                $("#btn_ongoing_apply").removeClass("disabled");
            }
            else if (action === 'disable')
            {
                $("#btn_ongoing_apply").removeClass("blue");
                $("#btn_ongoing_apply").addClass("disabled");
            }
        }
    }


    $("#ongoing_action_dropdown .item").click(function () {
        var value = $(this).data("value");
        if (value === 'reassign_engineer') {
            if (ongoing_action !== 'reassign_engineer')
            {
                $('#reassign_engineer_select').toggleClass("display_invisible");
            }
            ongoing_action = 'reassign_engineer';
            
        }
        else if (value === 'move_unassigned') {
            if (ongoing_action !== 'move_unassigned')
            {
                $('#reassign_engineer_select').addClass("display_invisible");
            }
            ongoing_action = 'move_unassigned';
           
        }
    });

    $("#unassigned_action_dropdown .item").click(function () {
        var value = $(this).data("value");
        if (value === 'assign_engineer') {
            if (unassigned_action !== 'assign_engineer')
            {
                $('#assign_engineer_select').toggleClass("display_invisible");
            }
            unassigned_action = 'assign_engineer';
        }
        else if (value === 'delete') {
            if (unassigned_action !== 'delete')
            {
                $('#assign_engineer_select').addClass("display_invisible");
            }
            unassigned_action = 'delete';
        }
    });

    $('#unassigned_action_dropdown').dropdown();
    $("#ongoing_action_dropdown").dropdown();

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
                    reassign_task(reappid, selected_engineer, current_record);
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
                    $('#confirm_delete')
                        .modal({
                            closable: false,
                            onDeny: function () {
                                return true;
                            },
                            onApprove: function () {
                                var _appid = $(current_record).data("appid");
                                delete_task(_appid, current_record);
                            }
                        }).modal('show');
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
                    "<tr data-appid='" + data.ongoing.application_id + "'>" +
                    '<td><input type="checkbox" class="check_task" value="" /> &nbsp;&nbsp; <a href="#"><i class="file alternate outline icon"></i> Task #' + data.ongoing.application_id + '</a></td>' +
                    '<td>' + data.ongoing.created_date + '</td>' +
                    '<td>' + data.ongoing.assigned_to + '</td>' +
                    '<td>' + data.ongoing.date_assigned + '</td>' +
                    '<td class="status_submitted">' + data.ongoing.status + '</td>' +
                    "</tr>";

                var htm =
                    "<tr id='fallback_msg_unassigned'>" +
                    "<td colspan = 3>No unassigned applications found.</td>" +
                    "</tr>";

                $(html).prependTo("#tbl_ongoing tbody");

                if ($("#tbl_unassigned tbody tr").length === 0)
                {
                    $("#tbl_unassigned tbody").append(htm);
                }
                reset_unassigned_action();
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
                    "<tr id='fallback_msg_ongoing'>" +
                    "<td colspan = 3>No ongoing applications found.</td>" +
                    "</tr>";

                $(html).appendTo("#tbl_unassigned tbody");

                if ($("#tbl_ongoing tbody tr").length === 0) {
                    $("#tbl_ongoing tbody").append(htm);
                }
                reset_ongoing_action();
            },
            error: function (data) {
                $('#btn_ongoing_apply').removeClass("disabled loading");
                console.log(data);
            }
        });
    }

    function add_unassigned_task(application_id, submitted_by) {

    }

    function delete_task(application_id, target_record) {

        var jsonObj = new Object();
        jsonObj.application_id = application_id;
        var json = JSON.stringify(jsonObj);

        $.ajax({
            type: "POST",
            url: "/admin/deleteunassigned",
            contentType: "application/json; charset=utf-8",
            data: json,
            success: function (data) {

                if (data.responseText === 'task_deleted')
                {
                    $('#btn_unassigned_apply').removeClass("disabled loading");
                    $(target_record).remove();

                    var htm =
                        "<tr id='fallback_msg_unassigned'>" +
                        "<td colspan = 3>No unassigned applications found.</td>" +
                        "</tr>";

                    if ($("#tbl_unassigned tbody tr").length === 0) {
                        $("#tbl_unassigned tbody").append(htm);
                    }
                    reset_unassigned_action();
                }
            },
            error: function (data) {
                $('#btn_unassigned_apply').removeClass("disabled loading");
                console.log(data);
            }
        });

    }

    function reassign_task(application_id, assign_to, target_record) {
        var jsonObj = new Object();
        jsonObj.application_id = application_id;
        jsonObj.assign_to = assign_to;
        var json = JSON.stringify(jsonObj);

        $.ajax({
            type: "POST",
            url: "/admin/reassign",
            contentType: "application/json; charset=utf-8",
            data: json,
            success: function (data) {

                if (data.responseText === 'task_reassigned') {
                    $('#btn_ongoing_apply').removeClass("disabled loading");

                    $(target_record).find("td:eq(2)").html(data.ongoing.assigned_to);
                    $(target_record).find("td:eq(3)").html(data.ongoing.date_assigned);
                    $(target_record).removeClass("row_hover");
                    $('input[type="checkbox"]').prop('checked', false);
                    reset_ongoing_action();
                }
            },
            error: function (data) {
                $('#btn_ongoing_apply').removeClass("disabled loading");
                console.log(data);
            }
        });
    }

    function reset_ongoing_action()
    {
        var main_target = $("#ongoing_action_dropdown");
        var sub_target = $("#reassign_engineer_select");

        $(sub_target).find(".text").addClass("default").html("Choose engineer");
        $(sub_target).find(".menu .item").removeClass("active selected");
        $(sub_target).addClass("display_invisible");

        $(main_target).find(".text").addClass("default").html("Choose action");
        $(main_target).find(".menu .item").removeClass("active selected");
        ongoing_action = '';
        $('#btn_ongoing_apply').addClass("disabled").removeClass("blue");
    } 

    function reset_unassigned_action()
    {
        var main_target = $("#unassigned_action_dropdown");
        var sub_target = $("#assign_engineer_select");

        $(sub_target).find(".text").addClass("default").html("Choose engineer");
        $(sub_target).find(".menu .item").removeClass("active selected");
        $(sub_target).addClass("display_invisible");

        $(main_target).find(".text").addClass("default").html("Choose action");
        $(main_target).find(".menu .item").removeClass("active selected");

        $(main_target).dropdown('refresh');
        unassigned_action = '';
        $('#btn_unassigned_apply').addClass("disabled").removeClass("blue");
    }
});