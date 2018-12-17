$(document).ready(function () {

    $('#btn_new_application').click(function () {
        window.location = '/new/step-1';
    });

    $('#edit_application').click(function () {

        var appid = $('.active.item').data('appid');
        var html = '<div class="ui tiny active centered inline text loader feed ginfo">Getting info...</div>';
        $('.ui.tiny.modal.ginfo').find(".content").find(".ui.tiny.active.centered.inline.text.loader.feed.ginfo").remove();
        $('.ui.tiny.modal.ginfo').find(".content").append(html);

        var modal = $('.ui.tiny.modal.ginfo')
            .modal({
                inverted: true,
                closable: false
            });

        $(modal).modal('show');
        $.ajax({
            type: "GET",
            url: "/new/edit",
            contentType: "application/json; charset=utf-8",
            data: { "application_id": appid },
            success: function (data) {
                if (data.responseText == 'ready') {
                    setTimeout(function () {
                        window.location = "/new/step-1?from=home";
                    }, 500);
                }
                else {
                    //appropriate action here
                }

            },
            error: function (data) {
                $(modal).modal('hide');
            }
        });
    });

    $.ajax({
        type: "GET",
        url: "/saved/get-documents",
        contentType: "application/json; charset=utf-8",
        data: {},
        success: function (data) {
            initializeSavedApps(data.savedApplications);

            if (data.savedApplications.length > 0) {
                $.ajax({
                    type: "GET",
                    url: "/new/preview",
                    contentType: "application/json; charset=utf-8",
                    data: { "application_id": data.savedApplications[0].application_id },
                    success: function (data) {
                        initializePreview(data.form);
                    },
                    error: function (data) {
                        $('.ui.tiny.active.centered.inline.text.loader.saved-docs-preview').remove();
                    }
                });
            }
            else
            {

            }
            
        },
        error: function (data) {
            console.log(data);
        }
    });

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

   
    function initializeSavedApps(data)
    {
        if (data.length > 0)
        {
            $('.ui.tiny.active.centered.inline.text.loader.saved-docs').remove();
            var html_main =
                '<div class="ui divided selection list">' +
                '</div >';

            $('#savedDocs').html('');
            $('#savedDocs').append(html_main);

            var html_inner = '';
            for (var i = 0; i < data.length; i++) {
                if (i == 0) {
                    html_inner +=
                        '<div class="active item" data-appid=' + data[i].application_id +'>' +
                        '<div class="content">' +
                        '<div class="header">' + data[i].application_id + '</div>' +
                        'Last update:' + data[i].last_updated + '' +
                        '</div>' +
                        '</div>';
                }
                else {
                    html_inner +=
                        '<div class="item" data-appid=' + data[i].application_id +'>' +
                        '<div class="content">' +
                        '<div class="header">' + data[i].application_id + '</div>' +
                        'Last update:' + data[i].last_updated + '' +
                        '</div>' +
                        '</div>';
                }
            }

            $('.ui.divided.selection.list').append(html_inner);
        }
        else
        {
            $('.ui.tiny.active.centered.inline.text.loader.saved-docs').remove();
            $('#savedDocs').html('No saved applications found on your account.');
        }
    }

    function initializePreview(data) {
        $('.ui.tiny.active.centered.inline.text.loader.saved-docs-preview').remove();
        $('.actions').remove();
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

            '<div id="context" class="ui raised segment">' +
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
            '<div class="three fields">' +
            '<div class="field">' +
            '<label>Aspect</label>' +
            '<div class="ui input">' +
            '<input readonly type="text" placeholder="" name="aspect" value="' + data.aspect + '">' +
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<label>Compatibility</label>' +
            '<div class="ui input">' +
            '<input readonly type="text" placeholder="" name="compatibility" value="' + data.compatibility + '">' +
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<label>Security</label>' +
            '<div class="ui input">' +
            '<input readonly type="text" placeholder="" name="security" value="' + data.security + '">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="two fields">' +
            '<div class="field">' +
            '<label>Equipment type</label>' +
            '<div class="ui input">' +
            '<input readonly id="equipment_type_dropdown" type="text" placeholder="" name="equipment type" value="' + data.equipment_comm_type + '">' +
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<label>Fee Code</label>' +
            '<div class="ui input">' +
            '<input readonly id="fee_code_dropdown" type="text" placeholder="" name="fee code" value="' + data.fee_code + '">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';


        html += step1_html + step2_html;
        $(target).append(html);
        set_equipment_type_checked(data.type_of_equipment, data.other);
    }

    function set_equipment_type_checked(type, other) {
        var radio_options = $('#equipent_types_handle .ui.radio.checkbox');
        $.each(radio_options, function (i, object) {
            if ($(object).find("input").val() == type) {
                $(object).checkbox('check');
                console.log("checked: " + type);

                if (type == 'Other') {
                    $("input[name=other_equipment]").val(other);
                    $("input[name=other_equipment]").removeClass('disabled');
                }
            }
        });
    }
});
