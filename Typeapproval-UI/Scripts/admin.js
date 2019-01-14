$(document).ready(function () {

    $('#client-dropdown').dropdown({
        showOnFocus: false
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
        else
        {
            enable_disable_apply(target_table, 'disable');
            $(current_record).removeClass("row_hover");
        }
    });

    $("#grant-resumit").click(function () {
        $("#client_resubmit").modal({
            closable: false,
            onApprove: function () {
                return true;
            },
            onDeny: function () {
                return true;
            }
        }).modal('show');
    });

    $("body").on("click", ".app_view", function () {
        var appid = $(this).data("appid");
        getApplication(appid);
    });


    function create_base_modal() {
        var html =
            '<div id="app_modal" class="ui longer modal">' +
            '<div id = "app_id" class="header" >Application Preview<i></i></div >' +
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
            '<div id="context" class="ui segment">' +
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
            '<label>City/Town</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. Kingston" name="address" type="text" value="' + data.applicant_city_town + '">' +
            '<i class="map marker alternate icon"></i>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="two fields">' +
            '<div class="field">' +
            '<label>Contact Person</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. John Brown" name="applicant_contact_person" type="text" value="' + data.applicant_contact_person + '">' +
            '<i class="user circle icon"></i>' +
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<label>Nationality</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. Jamaica" name="address" type="text" value="' + data.applicant_nationality + '">' +
            '<i class="globe icon"></i>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<a class="ui grey ribbon label">2. &nbsp Manufacturer</a>' +
            '<div class="three fields">' +
            '<div class="field">' +
            '<label>Name</label>' +
            '<div class="ui left icon input">' +
            '<input readonly id="manufacturer_name" autocomplete="off" placeholder="Name" name="manufacturer_name" type="text" value="' + data.manufacturer_name + '" >' +
            '<i class="users icon"></i>' +
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<label>Telephone<span style="margin-left:5px;" class="ui readonly mini label">read only</span></label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. 1876-555-5555" name="manufacturer_telephone" type="text" value="' + data.manufacturer_tel + '" >' +
            '<i class="phone volume icon"></i>' +
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<label>Address<span style="margin-left:5px;" class="ui readonly mini label">read only</span></label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. 12 Beckford Street" name="manufacturer_address" type="text" value="' + data.manufacturer_address + '">' +
            '<i class="address book icon"></i>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="two fields">' +
            '<div class="field">' +
            '<label>Fax<span style="margin-left:5px;" class="ui readonly mini label">read only</span></label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. 1876-555-5555" name="manufacturer_fax" type="text" value="' + data.manufacturer_fax + '">' +
            '<i class="fax icon"></i>' +
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<label>Contact Person<span style="margin-left:5px;" class="ui readonly mini label">read only </span>' + '</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. John Brown" name="manufacturer_contact_person" type="text" value="' + data.manufacturer_contact_person + '">' +
            '<i class="user circle icon"></i>' +
            '</div>' +
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
            '<div class="one field">' +
            '<div class="field">' +
            '<label>Product identification (Model number and designation) together with version number.</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. OUS00-0569" name="product_identification" type="text" value="' + data.product_identification + '">' +
            '<i class="language icon"></i>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="fields">' +
            '<div class="three wide field">' +
            '<label>Ref #</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. 1000232" name="refNum" type="text" value="' + data.refNum + '">' +
            '<i class="user circle icon"></i>' +
            '</div>' +
            '</div>' +
            '<div class="four wide field">' +
            '<label>Make</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. 1byone" name="make" type="text" value="' + data.make + '">' +
            '<i class="barcode icon"></i>' +
            '</div>' +
            '</div>' +
            '<div class="nine wide field">' +
            '<label>Software (if any) - number and model designation of version</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. 1byone" name="software" type="text" value="' + data.software + '">' +
            '<i class="barcode icon"></i>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div id="equipent_types_handle" class="inline fields">' +
            '<label>Type of equipment</label>' +
            '<div class="field">' +
            '<div class="ui radio checkbox equipment_types">' +
            '<input readonly type="radio" name="equipment_types" tabindex="0" class="hidden" value="Transmitter">' +
            '<label>Transmitter</label>' +
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<div class="ui radio checkbox equipment_types">' +
            '<input readonly type="radio" name="equipment_types" tabindex="0" class="hidden" value="Receiver">' +
            '<label>Receiver</label>' +
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<div class="ui radio checkbox equipment_types">' +
            '<input readonly type="radio" name="equipment_types" tabindex="0" class="hidden" value="Transceiver">' +
            '<label>Transceiver</label>' +
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<div class="ui radio checkbox equipment_types">' +
            '<input readonly type="radio" name="equipment_types" tabindex="0" class="hidden" value="Other">' +
            '<label>Other</label>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="one field">' +
            '<div class="ui left icon disabled input">' +
            '<input readonly placeholder="Other equipment" name="other_equipment" type="text" value="' + data.other + '">' +
            '<i class="microchip icon"></i>' +
            '</div>' +
            '</div>' +
            '<div class="one field">' +
            '<label>Frequency information</label>' +
            '<table class="ui celled table">' +
            '<thead>' +
            '<tr>' +
            '<th class="two wide">Frequency - L (MHz)</th>' +
            '<th class="two wide">Frequency - U (MHz)</th>' +
            '<th class="two wide">Power</th>' +
            '<th class="two wide">Frequency Tolerance</th>' +
            '<th class="two wide">Emission Designator</th>' +
            '<th class="two wide">Frequency Type</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody id="table_frequencies">' +
            writeFrequencies(data.frequencies) +
            '</tbody>' +
            '</table>' +
            '</div>' +
            '<div class="three fields">' +
            '<div class="field">' +
            '<label>Antenna Type</label>' +
            '<div class="ui input">' +
            '<input readonly type="text" placeholder="" name="antenna_type" value="' + data.antenna_type + '">' +
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<label>Antenna Gain (db)</label>' +
            '<div class="ui input">' +
            '<input readonly type="text" placeholder="" name="antenna_gain" value="' + data.antenna_gain + '" >' +
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<div class="two fields">' +
            '<div class="field">' +
            '<label>Channels (khz)</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="" name="channel" type="text" value="' + data.channel + '">' +
            '<i class="rss icon"></i>' +
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<label>Separation (khz)</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="" name="separation" type="text" value="' + data.separation + '">' +
            '<i class="rss icon"></i>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<label>Additional Information</label>' +
            '<textarea readonly rows="3" name="additional_information">' + data.additional_info + '</textarea>' +
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
                '<td>' +
                '<div class="ui transparent input">' +
                '<input readonly type="text" placeholder="frequency type" style="width:100%" name="freq_type" value="' + data[i].freq_type + '">' +
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
                reset_unassigned_action();
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
                reset_ongoing_action();
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
                    '<td><input type="checkbox" class="check_task" value="" /> &nbsp;&nbsp; <a style="cursor: pointer;" data-appid="' + data.ongoing.application_id+'" class="app_view"><i class="file alternate outline icon"></i>' + data.ongoing.application_id + '</a></td>' +
                    '<td>' + data.ongoing.created_date + '</td>' +
                    '<td>' + data.ongoing.assigned_to + '</td>' +
                    '<td>' + data.ongoing.date_assigned + '</td>' +
                    '<td class="status_pending">' + data.ongoing.status + '</td>' +
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
                    '<td><input type="checkbox" class="check_task" value="" /> &nbsp;&nbsp; <a style="cursor: pointer;" data-appid="' + data.unassigned.application_id + '" class="app_view"><i class="file alternate outline icon"></i>' + data.unassigned.application_id + '</a></td>' +
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

    function getApplication(application_id) {
        $.ajax({
            type: "POST",
            url: "admin/get-application/" + application_id,
            contentType: "application/json; charset=utf-8",
            data: {},
            success: function (data) {
                console.log(data);
                create_base_modal();
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

    function reset_resubmit_options()
    {

    }
});