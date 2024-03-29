﻿$(document).ready(function () {

    $('.message .close')
        .on('click', function () {
            $(this).closest('.message').transition('fade');
        });

    $('#client-dropdown').dropdown({
        onChange: function (value, text, $choice) {
            reset_resubmit_options();
            get_application_ids(value);
        }
    });

    $("#application-dropdown").dropdown();

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
        else {
            enable_disable_apply(target_table, 'disable');
            $(current_record).removeClass("row_hover");
        }
    });

    $("#grant-resumit").click(function () {
        $("#client_resubmit").modal({
            closable: false,
            onApprove: function () {
                reset_resubmit_options();
                $("#client-dropdown").dropdown('clear');
                return true;
            },
            onDeny: function () {
                setTimeout(function () {
                    reset_resubmit_options();
                    $("#client-dropdown").dropdown('clear');
                }, 500);
                return true;
            }
        }).modal('show');
    });

    $("#change-password").click(function () {
        $("#change_password").modal({
            closable: false,
            onApprove: function () {

                remove_psw_msg();
                var old_psw = $("#old_psw").val();
                var new_psw = $("#new_psw").val();
                var confirm_psw = $("#confirm_psw").val();

                if (old_psw !== '') {
                    if (new_psw !== '') {
                        if (new_psw.length > 5) {
                            if (confirm_psw !== '') {
                                if (new_psw === confirm_psw) {
                                    change_password(old_psw, new_psw);
                                }
                                else {
                                    add_psw_msg('Passwords do not match.');
                                }
                            }
                            else {
                                add_psw_msg('Please confirm your password...');
                            }
                        }
                        else
                        {
                            add_psw_msg("Enter at least 6 characters for your new password");
                        }
                    }
                    else {
                        add_psw_msg("Please enter a new password...");
                    }
                }
                else {
                    add_psw_msg("Please enter your current password...");
                }
                return false;
            },
            onDeny: function () {
                setTimeout(function () {
                    $("#old_psw").val('');
                    $("#new_psw").val('');
                    $("#confirm_psw").val('');
                    remove_psw_msg();
                }, 500);
                return true;
            }
        }).modal('show');
    });

    $("body").on("click", ".app_view", function () {
        var appid = $(this).data("appid");
        getApplication(appid);
    });


    function create_base_modal(application_id) {
        var html =
            '<div id="app_modal" class="ui longer modal">' +
            '<div id = "app_id" class="header" >Application Review - ' + application_id + '<i></i></div >' +
            '<div id="preview" class="scrolling content">' +
            '</div>' +
            '<div class="actions">' +
            '<div class="ui primary tiny approve button">' +
            'Finish' +
            '</div>' +
            '</div>' +
            '</div>';

        $(html).insertAfter("#confirm_delete");
    }

    function initializePreview(data) {
        var target = $('#preview');
        $(target).html('');

        var html = '';
        var step1_html =
            '<div id="context" class="ui raised segment">' +
            '<a class="ui grey ribbon label">1. &nbsp Applicant</a>' +
            '<form class="ui form">' +
            '<div class="two fields">' +
            '<div class="field">' +
            '<label>Name</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="John Brown" name="applicant_name" type="text" value="' + data.applicant_name + '">' +
            '<i class="user icon"></i>' +
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<label>Telephone</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. 1876-555-5555" name="telephone" type="text" value="' + data.applicant_tel + '">' +
            '<i class="phone volume icon"></i>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="three fields">' +
            '<div class="field">' +
            '<label>Addresss</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. 12 Beckford Street" name="address" type="text" value="' + data.applicant_address + '">' +
            '<i class="address book icon"></i>' +
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<label>Fax</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. 1876-555-5555" name="fax" type="text" value="' + data.applicant_fax + '">' +
            '<i class="fax icon"></i>' +
            '</div>' +

            '</div>' +
            '<div class="field">' +
            '<label>Contact Person</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. John Brown" name="applicant_contact_person" type="text" value="' + data.applicant_contact_person + '">' +
            '<i class="user circle icon"></i>' +
            '</div>' +
            '</div>' +

            '</div>' +


            '<a class="ui grey ribbon label">2. &nbsp Grantee / Manufacturer</a>' +
            '<div class="two fields">' +
            '<div class="field">' +
            '<label>Grantee</label>' +
            '<div class="ui left icon input"><input readonly="" id="manufacturer_name" autocomplete="off" placeholder="Name" name="manufacturer_name" type="text" value="' + data.grantee_name + '"><i class="users icon"></i></div>' +
            '</div>' +
            '<div class="field">' +
            '<label>Manufacturer Name<span style="margin-left:5px;" class="ui readonly mini label">read only</span></label>' +
            '<div class="ui left icon input"><input readonly="" placeholder="eg. 1876-555-5555" name="manufacturer_name" type="text" value="' + data.manufacturer_name + '"><i class="phone volume icon"></i></div>' +
            '</div>' +
            '</div>' +

            '<div class="field">' +
            '<label>Address<span style="margin-left:5px;" class="ui readonly mini label">read only</span></label>' +
            '<div class="ui left icon input"><input readonly="" placeholder="eg. 12 Beckford Street" name="manufacturer_address" type="text" value="' + data.grantee_address + '"><i class="address book icon"></i></div>' +
            '</div>' +

            '</div>' +
            '</form>' +
            '</div>';

        var step2_html =

            '<div id="context" class="ui segment">' +
            '<div class="ui form">' +
            '<a class="ui grey ribbon label">3. &nbsp Equipment Description</a>' +
            '<div class="inline field">' +
            '<label>Type of equipment (modem, telefax, telephone)</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. Wireless router" name="equipment_type" type="text" value="' + data.equipment_type + '">' +
            '<i class="microchip icon"></i>' +
            '</div>' +
            '</div>' +
            '<div class="one field">' +
            '<div class="field">' +
            '<label>Brief description of the equipment (to be used in the list of approved equipment and in the certificate of approval)</label>' +
            '<textarea readonly rows="4" name="equipment_description">' + data.equipment_description + '</textarea>' +
            '</div>' +

            '</div>' +

            '<div class="two fields">' +
            '<div class="four wide field">' +
            '<label>Make</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. 1byone" name="make" type="text" value="' + data.make + '">' +
            '<i class="barcode icon"></i>' +
            '</div>' +
            '</div>' +

            '<div class="twelve wide field">' +
            '<div class="field">' +
            '<label>Model Number</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. OUS00-0569" name="product_identification" type="text" value="' + data.product_identification + '">' +
            '<i class="language icon"></i>' +
            '</div>' +
            '</div>' +
            '</div>' +



            '</div>' +


            '<div class="one field">' +
            '<label>Frequency information</label>' +
            '<table class="ui celled table">' +
            '<thead>' +
            '<tr>' +
            '<th class="two wide">Frequency - L (MHz)</th>' +
            '<th class="two wide">Frequency - U (MHz)</th>' +
            '<th class="two wide">Power (W)</th>' +
            '<th class="two wide">Frequency Tolerance</th>' +
            '<th class="two wide">Emission Designator</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody id="table_frequencies">' +
            writeFrequencies(data.frequencies) +
            '</tbody>' +
            '</table>' +
            '</div>' +


            '<div style="margin-top: 16px !important;" class="two fields">' +
            '<div class="field">' +
            '<label>Name of Main Test or Certification Institution<span style="color: red">&nbsp;*</span></label>' +
            '<div class="ui input">' +
            '<input autocomplete="new-password" name="institution" type="text" value="' + data.name_of_test + '">' +

            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<label>Country of Mass Production<span class="required-label" style="color: red">&nbsp;*</span></label>' +
            '<div class="ui input">' +
            '<input autocomplete="new-password" name="country" type="text" value="' + data.country + '">' +

            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';


        html += step1_html + step2_html;
        $(target).append(html);

        set_equipment_type_checked(data.type_of_equipment, data.other);

        $('.ui.longer.modal')
            .modal({
                closable: false,
                onApprove: function () {
                    setTimeout(function () {
                        $("#app_modal").remove();
                    }, 1000);
                }
            }).modal('show');

        get_files(data.application_id);
    }

    function writeFrequencies(data) {
        var html = '';
        for (var i = 0; i < data.length; i++) {
            var row =
                '<tr>' +
                '<td>' +
                '<div class="ui transparent input">' +
                '<input readonly type="number" placeholder="lower mhz" style="width:100%" name="lower_mhz" value="' + data[i].lower_freq + '">' +
                '</div>' +
                '</td>' +
                '<td>' +
                '<div class="ui transparent input">' +
                '<input readonly type="number" placeholder="upper mhz" style="width:100%" name="upper_mhz" value="' + data[i].upper_freq + '">' +
                '</div>' +
                '</td>' +
                '<td>' +
                '<div class="ui transparent input">' +
                '<input readonly type="number" placeholder="power" style="width:100%" name="power" value="' + data[i].power + '">' +
                '</div>' +
                '</td>' +
                '<td>' +
                '<div class="ui transparent input">' +
                '<input readonly type="number" placeholder="tolerance" style="width:100%" name="tolerance" value="' + data[i].tolerance + '">' +
                '</div>' +
                '</td>' +
                '<td>' +
                '<div class="ui transparent input">' +
                '<input readonly type="text" placeholder="emmission desig..." style="width:100%" name="emmission_desig" value="' + data[i].emmission_desig + '">' +
                '</div>' +
                '</td>' +
                '</tr>';

            html += row;
        }
        return html;
    }

    function set_equipment_type_checked(type, other) {
        var radio_options = $('#equipent_types_handle .ui.radio.checkbox');
        $.each(radio_options, function (i, object) {
            if ($(object).find("input").val() === type) {
                $(object).checkbox('check');
                console.log("checked: " + type);

                if (type === 'Other') {
                    $("input[name=other_equipment]").val(other);
                    $("input[name=other_equipment]").removeClass('disabled');
                }
            }
        });
    }

    function enable_disable_apply(target, action) {
        if (target === 'tbl_unassigned') {
            if (action === 'enable') {
                $("#btn_unassigned_apply").addClass("blue");
                $("#btn_unassigned_apply").removeClass("disabled");
            }
            else if (action === 'disable') {
                $("#btn_unassigned_apply").removeClass("blue");
                $("#btn_unassigned_apply").addClass("disabled");
                reset_unassigned_action();
            }
        }
        else if (target === 'tbl_ongoing') {
            if (action === 'enable') {
                $("#btn_ongoing_apply").addClass("blue");
                $("#btn_ongoing_apply").removeClass("disabled");
            }
            else if (action === 'disable') {
                $("#btn_ongoing_apply").removeClass("blue");
                $("#btn_ongoing_apply").addClass("disabled");
                reset_ongoing_action();
            }
        }
    }


    $("#ongoing_action_dropdown .item").click(function () {
        var value = $(this).data("value");
        if (value === 'reassign_engineer') {
            if (ongoing_action !== 'reassign_engineer') {
                $('#reassign_engineer_select').toggleClass("display_invisible");
            }
            ongoing_action = 'reassign_engineer';

        }
        else if (value === 'move_unassigned') {
            if (ongoing_action !== 'move_unassigned') {
                $('#reassign_engineer_select').addClass("display_invisible");
            }
            ongoing_action = 'move_unassigned';

        }
    });

    $("#unassigned_action_dropdown .item").click(function () {
        var value = $(this).data("value");
        if (value === 'assign_engineer') {
            if (unassigned_action !== 'assign_engineer') {
                $('#assign_engineer_select').toggleClass("display_invisible");
            }
            unassigned_action = 'assign_engineer';
        }
        else if (value === 'delete') {
            if (unassigned_action !== 'delete') {
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
        if ($(check_tasks).length > 0) {
            var action = $("#ongoing_action_dropdown .item.active.selected").data("value");
            switch (action) {
                case "reassign_engineer":
                    var selected_engineer = $("#reassign_engineer_select .item.active.selected").data("value");
                    var reappid = $(current_record).data("appid");

                    if (selected_engineer !== undefined) {
                        reassign_task(reappid, selected_engineer, current_record);
                    }
                    else
                    {
                        add_notification('', 'Please select an engineer for re-assignment.');
                    }
                    
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

                    if (selected_engineer !== undefined) {
                        add_ongoing_task(appid, selected_engineer, current_record);
                    }
                    else
                    {
                        add_notification('', "Please select an engineer for assignment.");
                    }
                   
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
                    '<td><input type="checkbox" class="check_task" value="" /> &nbsp;&nbsp; <a style="cursor: pointer;" data-appid="' + data.ongoing.application_id + '" class="app_view"><i class="file alternate outline icon"></i>' + data.ongoing.application_id + '</a></td>' +
                    '<td>' + data.ongoing.created_date + '</td>' +
                    '<td>' + data.ongoing.assigned_to + '</td>' +
                    '<td>' + data.ongoing.date_assigned + '</td>' +
                    '<td class="status_pending">' + data.ongoing.status + '</td>' +
                    "</tr>";

                $(html).prependTo("#tbl_ongoing tbody");

                var htm =
                    "<tr id='fallback_msg_unassigned'>" +
                    "<td colspan = 3>No unassigned applications found.</td>" +
                    "</tr>";

                if ($("#tbl_unassigned tbody tr").length === 0) {
                    $("#tbl_unassigned tbody").append(htm);
                }
                reset_unassigned_action();

                var msg = "Application: <b>" + application_id + "</b> assigned to <i><b>" + data.ongoing.assigned_to + "</b></i>";
                add_notification("Task removal", msg);
            },
            error: function (data) {
                $('#btn_unassigned_apply').removeClass("disabled loading");
                console.log(data);
            }
        });
    }

    function move_to_unassigned(application_id, target_record) {
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
                    '<td><input type="checkbox" class="check_task" value="" /> &nbsp;&nbsp; <a style="cursor: pointer;" data-appid="' + data.unassigned.application_id + '" class="app_view"><i class="file alternate outline icon"></i>' + data.unassigned.application_id + '</a></td>' +
                    '<td>' + data.unassigned.created_date + '</td>' +
                    '<td>' + data.unassigned.submitted_by + '</td>' +
                    "</tr>";

                $(html).appendTo("#tbl_unassigned tbody");

                var htm =
                    "<tr id='fallback_msg_ongoing'>" +
                    "<td colspan = 3>No assigned applications found.</td>" +
                    "</tr>";

                if ($("#tbl_ongoing tbody tr").length === 0) {
                    $("#tbl_ongoing tbody").append(htm);
                }
                reset_ongoing_action();

                var msg = "Task: <b>" + application_id + "</b> moved to unassigned";
                add_notification("Task removal", msg);
            },
            error: function (data) {
                $('#btn_ongoing_apply').removeClass("disabled loading");
                console.log(data);
            }
        });
    }

    function getApplication(application_id) {
        $.ajax({
            type: "POST",
            url: "admin/get-application/" + application_id,
            contentType: "application/json; charset=utf-8",
            data: {},
            success: function (data) {
                console.log(data);
                create_base_modal(application_id);
                initializePreview(data.form);
            },
            error: function (data) {
                console.log(data);
            }
        });
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

                if (data.responseText === 'task_deleted') {
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

                    var msg = "Application: <b>" + application_id + "</b> rejected";
                    add_notification("", msg);
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

        $('#btn_ongoing_apply').addClass("disabled loading");

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

                    var msg = "Task: <b>" + application_id + "</b> reassigned";
                    add_notification("Task Assignment", msg);
                }
            },
            error: function (data) {
                $('#btn_ongoing_apply').removeClass("disabled loading");
                console.log(data);
            }
        });
    }

    function reset_ongoing_action() {
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

    function reset_unassigned_action() {
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

    function get_client_list() {
        $.ajax({
            type: "POST",
            url: "/admin/getclients",
            contentType: "application/json; charset=utf-8",
            data: {},
            success: function (data) {
                for (var i = 0; i < data.clientUsers.length; i++) {
                    var html = '<option value="' + data.clientUsers[i].username + '">' + data.clientUsers[i].first_name + ' ' + data.clientUsers[i].last_name + " (" + data.clientUsers[i].username+") "+ '</option>';
                    $("#client-dropdown").append(html);
                }
            },
            error: function (data) {

            }
        });
    }

    function get_application_ids(username) {
        $.ajax({
            type: "POST",
            url: "/admin/getapplicationids/" + username,
            contentType: "application/json; charset=utf-8",
            data: {},
            success: function (data) {
                for (var i = 0; i < data.applications.length; i++) {
                    var html = '<option class="client-appids" value="' + data.applications[i] + '">' + data.applications[i] + '</option>';
                    $("#application-dropdown").append(html);
                }
            },
            error: function (data) {

            }
        });
    }

    function client_resubmit(application_id) {
        $.ajax({
            type: "POST",
            url: "/admin/clientresubmit/" + application_id,
            contentType: "application/json; charset=utf-8",
            data: {},
            success: function (data) {
                $("#btn-resubmit-apply").addClass("disabled loading");
                if (data.responseText === "updated") {
                    remove_unassigned_resubmit_record(application_id);
                    remove_ongoing_resubmit_record(application_id);
                    $("#btn-resubmit-apply").removeClass("disabled loading");
                }
            },
            error: function (data) {
                console.log(data);
                $("#btn-resubmit-apply").removeClass("disabled loading");
            }
        });
    }

    $("#btn-resubmit-apply").click(function () {
        var appid = $("#application-dropdown").parent().find(".menu .item.active.selected").html();
        client_resubmit(appid);
        $("#btn-resubmit-apply").addClass("disabled loading");
    });

    function remove_ongoing_resubmit_record(application_id) {
        var rows = $("#tbl_ongoing tbody tr");
        if (rows !== undefined) {
            $.each(rows, function (index, value) {
                var row_id = $(value).data("appid");
                if (row_id == application_id) {
                    $(value).remove();

                    var htm =
                        "<tr id='fallback_msg_ongoing'>" +
                        "<td colspan = 3>No assigned applications found.</td>" +
                        "</tr>";

                    if ($("#tbl_ongoing tbody tr").length === 0) {
                        $("#tbl_ongoing tbody").append(htm);
                    }
                }
            });
        }
    }

    function remove_unassigned_resubmit_record(application_id) {
        var rows = $("#tbl_unassigned tbody tr");
        if (rows !== undefined) {
            $.each(rows, function (index, value) {
                var row_id = $(value).data("appid");
                if (row_id == application_id) {
                    $(value).remove();

                    var htm =
                        "<tr id='fallback_msg_unassigned'>" +
                        "<td colspan = 3>No unassigned applications found.</td>" +
                        "</tr>";

                    if ($("#tbl_unassigned tbody tr").length === 0) {
                        $("#tbl_unassigned tbody").append(htm);
                    }
                }
            });
        }
    }

    function reset_resubmit_options() {
        $(".client-appids").remove();

        $("#application-dropdown").dropdown('clear');
    }

    function add_notification(header, message) {
        var html =
            '<div class="ui small black floating message">' +
            '<p>' + message + '</p>' +
            '</div>';

        var element = $(html);
        $('.overlay-notify').hide().append(element).fadeIn(300).delay(4000).fadeOut(1000, function () {
            $(element).remove();
        });
    }

    function change_password(old_psw, new_psw) {
        $("#btn-password-change").addClass("disabled loading");
        var jsonObj = new Object();
        jsonObj.old_psw = old_psw;
        jsonObj.new_psw = new_psw;
      
        $.ajax({
            type: "POST",
            url: "/account/changepassword",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(jsonObj),
            success: function (data) {
                $("#btn-password-change").removeClass("disabled loading");
                $("#change_password").modal('hide');
                $("#old_psw").val('');
                $("#new_psw").val('');
                $("#confirm_psw").val('');

                add_notification('', 'Password updated sucessfully');
            },
            error: function (data) {
                $("#btn-password-change").removeClass("disabled loading");
                if (data.statusText === "incorrect_password")
                {
                    add_psw_msg('You have entered an incorrect password, please try again...');
                }
            }
        });
    }

    function remove_psw_msg() {
        $(".psw_msg").remove();
    }

    function add_psw_msg(message) {
        var html =
            '<div class="ui red tiny message psw_msg">' +
            '<ul class="list">' +
            '<li>' + message + '</li>' +
            '</ul>' +
            '</div>';

        $(html).insertAfter("#form");
    }

    function get_files(application_id) {
        $("#preview").append('<div class="files-container-admin"></div>');
        $.ajax({
            type: "POST",
            url: "staff/get-file-listing/" + application_id,
            contentType: "application/json; charset=utf-8",
            data: {},
            success: function (data) {
                console.log(data);

                $(".files-container").html('');

                var tech_spec_html =
                    '<h5 class="ui dividing header">' +
                    'Technical Specifications' +
                    '</h5>' +
                    '<div id="tech_spec_files" class="ui list">' +
                    '</div>';

                var test_report_html =
                    '<h5 class="ui dividing header">' +
                    'Test Report' +
                    '</h5>' +
                    '<div id="test_report_files" class="ui list">' +
                    '</div>';

                var accreditation_html =
                    '<h5 class="ui dividing header">' +
                    'Accreditation' +
                    '</h5>' +
                    '<div id="accreditation_files" class="ui list">' +
                    '</div>';

                var letter_authorization_html =
                    '<h5 class="ui dividing header">' +
                    'Letter of Authorization' +
                    '</h5>' +
                    '<div id="letter_auth_files" class="ui list">' +
                    '</div>';

                var user_manual =
                    '<h5 class="ui dividing header">' +
                    'User Manual' +
                    '</h5>' +
                    '<div id="user_manual_files" class="ui list">' +
                    '</div';




                $(".files-container-admin").append(tech_spec_html);
                $(".files-container-admin").append(test_report_html);
                $(".files-container-admin").append(accreditation_html);
                $(".files-container-admin").append(letter_authorization_html);
                $(".files-container-admin").append(user_manual);


                for (var i = 0; i < data.applicationFileCategories.technicalSpecifications.length; i++) {
                    var tech_spec_item =
                        '<div class="item">' +
                        '<div class="content">' +
                        '<a target="_blank" href="/staff/get/' + data.applicationFileCategories.technicalSpecifications[i].file_id + '" class="link_override_v1" style="cursor:pointer !important;"><i class="file pdf icon"></i>' + data.applicationFileCategories.technicalSpecifications[i].filename + '</a>' +
                        '</div>' +
                        '</div>';

                    $("#tech_spec_files").append(tech_spec_item);
                }

                for (var j = 0; j < data.applicationFileCategories.testReport.length; j++) {
                    var test_report_item =
                        '<div class="item">' +
                        '<div class="content">' +
                        '<a target="_blank" href="/staff/get/' + data.applicationFileCategories.testReport[j].file_id + '" class="link_override_v1" style="cursor:pointer !important;"><i class="file pdf icon"></i>' + data.applicationFileCategories.testReport[j].filename + '</a>' +
                        '</div>' +
                        '</div>';

                    $("#test_report_files").append(test_report_item);
                }

                for (var k = 0; k < data.applicationFileCategories.accreditation.length; k++) {
                    var accreditation_item =
                        '<div class="item">' +
                        '<div class="content">' +
                        '<a target="_blank" href="/staff/get/' + data.applicationFileCategories.accreditation[k].file_id + '" class="link_override_v1" style="cursor:pointer !important;"><i class="file pdf icon"></i>' + data.applicationFileCategories.accreditation[k].filename + '</a>' +
                        '</div>' +
                        '</div>';

                    $("#accreditation_files").append(accreditation_item);
                }

                for (var l = 0; l < data.applicationFileCategories.letterAuthorization.length; l++) {
                    var letter_authorization_item =
                        '<div class="item">' +
                        '<div class="content">' +
                        '<a target="_blank" href="/staff/get/' + data.applicationFileCategories.letterAuthorization[l].file_id + '" class="link_override_v1" style="cursor:pointer !important;"><i class="file pdf icon"></i>' + data.applicationFileCategories.letterAuthorization[l].filename + '</a>' +
                        '</div>' +
                        '</div>';

                    $("#letter_auth_files").append(letter_authorization_item);
                }

                for (var m = 0; m < data.applicationFileCategories.userManual.length; m++) {
                    var user_manual_item =
                        '<div class="item">' +
                        '<div class="content">' +
                        '<a target="_blank" href="/staff/get/' + data.applicationFileCategories.userManual[m].file_id + '" class="link_override_v1" style="cursor:pointer !important;"><i class="file pdf icon"></i>' + data.applicationFileCategories.userManual[m].filename + '</a>' +
                        '</div>' +
                        '</div>';

                    $("#user_manual_files").append(user_manual_item);
                }
            },
            error: function (data) {
                console.log(data);
            }
        });
    }

    get_client_list();
});