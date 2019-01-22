$(document).ready(function () {

    var current_record = null;
    $('input[type="radio"]').prop("checked", false);
    $('body').on('click', 'input[type="radio"]', function () {

        current_record = $(this).parent().parent();
        $('.check_task').parent().parent().removeClass('row_hover');
        $('input[type="radio"]').not(this).prop('checked', false);

        if ($(this).is(":checked")) {
            $(current_record).addClass("row_hover");
            get_files($(current_record).data("appid"));
        }
        else {
            $(current_record).removeClass("row_hover");
            add_no_files_msg();
        }
    });

    function getApplication(application_id)
    {
        $.ajax({
            type: "POST",
            url: "staff/get-application/" + application_id,
            contentType: "application/json; charset=utf-8",
            data: {},
            success: function (data) {
                console.log(data);
                create_base_modal();
                $("#app_id").html("<i>Application: " + application_id + "</i>");
                initializePreview(data.form);
            },
            error: function (data) {
                console.log(data);
            }
        });
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

            '<div style="margin-top: 16px !important;" class="two fields">' +
            '<div class="field">' +
            '<label>Name of Main Test or Certification Institution<span style="color: red">&nbsp;*</span></label>' +
            '<div class="ui input">' +
            '<input autocomplete="new-password" name="institution" type="text" value=' + data.name_of_test+'>' +
           
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<label>Country of Mass Production<span class="required-label" style="color: red">&nbsp;*</span></label>' +
            '<div class="ui input">' +
            '<input autocomplete="new-password" name="country" type="text" value=' + data.country+'>' +
            
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

    function create_base_modal()
    {
        var html =
            '<div id="app_modal" class="ui longer modal">' +
            '<div id = "app_id" class="header" > <i></i></div >' +
            '<div id="preview" class="scrolling content">' +
            '</div>' +
            '<div class="actions">' +
            '<div class="ui primary tiny approve button">' +
            'Finish' +
            '</div>' +
            '</div>' +
            '</div>';

        $(html).insertAfter("#main_content");
    }

    function add_no_files_msg()
    {
        var html = '<p style="text-align:center;"><i class="grey info circle icon"></i>Select a record to view file details</p>';
        $(".files-container").html('').append(html);
    }

    $("#change-password").click(function () {
        $("#change_password").modal({
            closable: false,
            onApprove: function () {
                remove_psw_msg();
                var old_psw = $("#old_psw").val();
                var new_psw = $("#new_psw").val();
                var confirm_psw = $("#confirm_psw").val();

                if (old_psw !== '')
                {
                    if (new_psw !== '')
                    {
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
                    else
                    {
                        add_psw_msg("Please enter a new password...");
                    }
                }
                else
                {
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
   
    function add_notification(header, message) {
        var html =
            '<div class="ui small black floating message">' +
            '<p>' + message + '</p>' +
            '</div>';

        var element = $(html);
        $('.overlay-notify').hide().append(element).fadeIn(300).delay(3000).fadeOut(1000, function () {
            $(element).remove();
        });
    }

    function get_files(application_id)
    {
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
                

                $(".files-container").append(tech_spec_html);
                $(".files-container").append(test_report_html);
                $(".files-container").append(accreditation_html);


                for (var i = 0; i < data.applicationFileCategories.technicalSpecifications.length; i++)
                {
                    var tech_spec_item =
                        '<div class="item">' +
                        '<div class="content">' +
                        '<a target="_blank" href="/staff/get/' + data.applicationFileCategories.technicalSpecifications[i].file_id + '" class="link_override_v1" style="cursor:pointer !important;"><i class="file pdf icon"></i>' + data.applicationFileCategories.technicalSpecifications[i].filename + '</a>' +
                        '</div>' +
                        '</div>';

                    $("#tech_spec_files").append(tech_spec_item);
                }

                for (var j = 0; j < data.applicationFileCategories.testReport.length; j++)
                {
                    var test_report_item =
                        '<div class="item">' +
                        '<div class="content">' +
                        '<a target="_blank" href="/staff/get/' + data.applicationFileCategories.testReport[j].file_id + '" class="link_override_v1" style="cursor:pointer !important;"><i class="file pdf icon"></i>' + data.applicationFileCategories.testReport[j].filename + '</a>' +
                        '</div>' +
                        '</div>';

                    $("#test_report_files").append(test_report_item);
                }

                for (var k = 0; k < data.applicationFileCategories.accreditation.length; k++)
                {
                    var accreditation_item =
                        '<div class="item">' +
                        '<div class="content">' +
                        '<a target="_blank" href="/staff/get/' + data.applicationFileCategories.accreditation[k].file_id + '" class="link_override_v1" style="cursor:pointer !important;"><i class="file pdf icon"></i>' + data.applicationFileCategories.accreditation[k].filename + '</a>' +
                        '</div>' +
                        '</div>';

                    $("#accreditation_files").append(accreditation_item);
                }
            },
            error: function (data) {
                console.log(data);
            }
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
                $("#new_psw").val('');
                $("#confirm_psw").val('');

                add_notification('', 'password updated sucesssfully');
            },
            error: function (data) {
                $("#btn-password-change").removeClass("disabled loading");
                if (data.statusText === "incorrect_password") {
                    console.log("password invalid");
                    add_psw_msg("You have entered an incorrect password, please try again...");
                }
            }
        });
    }

    $(".app_view").click(function () {
        getApplication($(this).data("application"));
    });

    function remove_psw_msg()
    {
        $(".psw_msg").remove();
    }

    function add_psw_msg(message)
    {
        var html =
            '<div class="ui red inverted tiny message psw_msg">' +
            '<ul class="list">' +
            '<li>'+message+'</li>' +
            '</ul>' +
            '</div>';

        $(html).insertAfter("#form");
    }
});