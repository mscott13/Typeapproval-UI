$(document).ready(function () {

  

    $('body').on('click', '.form_preview', function () {
        console.log($(this).data('appid')); 
        
        var html = '<div class="ui tiny active centered inline text loader feed ginfo">Getting info...</div>';
        $('.ui.tiny.modal.ginfo').find(".content").find(".ui.tiny.active.centered.inline.text.loader.feed.ginfo").remove();
        $('.ui.tiny.modal.ginfo').find(".content").append(html);

        var appid = $(this).data('appid');
        var modal = $('.ui.tiny.modal.ginfo')
            .modal({
                inverted: true,
                closable: false
            });

        $.ajax({
            type: "GET",
            url: "/new/preview",
            contentType: "application/json; charset=utf-8",
            data: { "application_id": appid },
            success: function (data) {
                
                initializePreview(data.form);
            },
            error: function (data) {
                //$(modal).modal('hide');
            }
        });
    });

    $('.license_view').click(function () {
        window.location = "/certificates?application_id=" + $(this).data('appid');
    });


    function initializePreview(data)
    {
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
            '<input readonly placeholder="John Brown" name="applicant_name" type="text" value="' + data.applicant_name +'">' +
            '<i class="user icon"></i>' +
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<label>Telephone</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. 1876-555-5555" name="telephone" type="text" value="' + data.applicant_tel+'">' +
            '<i class="phone volume icon"></i>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="three fields">' +
            '<div class="field">' +
            '<label>Addresss</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. 12 Beckford Street" name="address" type="text" value="' + data.applicant_address+'">' +
            '<i class="address book icon"></i>' +
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<label>Fax</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. 1876-555-5555" name="fax" type="text" value="' + data.applicant_fax +'">' +
            '<i class="fax icon"></i>' +
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<label>City/Town</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. Kingston" name="address" type="text" value="' + data.applicant_city_town+'">' +
            '<i class="map marker alternate icon"></i>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="two fields">' +
            '<div class="field">' +
            '<label>Contact Person</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. John Brown" name="applicant_contact_person" type="text" value="' + data.applicant_contact_person +'">' +
            '<i class="user circle icon"></i>' +
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<label>Nationality</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. Jamaica" name="address" type="text" value="' + data.applicant_nationality+'">' +
            '<i class="globe icon"></i>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<a class="ui grey ribbon label">2. &nbsp Manufacturer</a>' +
            '<div class="three fields">' +
            '<div class="field">' +
            '<label>Name</label>' +
            '<div class="ui left icon input">' +
            '<input readonly id="manufacturer_name" autocomplete="off" placeholder="Name" name="manufacturer_name" type="text" value="' + data.manufacturer_name+'" >' +
            '<i class="users icon"></i>' +
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<label>Telephone<span style="margin-left:5px;" class="ui readonly mini label">read only</span></label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. 1876-555-5555" name="manufacturer_telephone" type="text" value="' + data.manufacturer_tel +'" >' +
            '<i class="phone volume icon"></i>' +
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<label>Address<span style="margin-left:5px;" class="ui readonly mini label">read only</span></label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. 12 Beckford Street" name="manufacturer_address" type="text" value="' + data.manufacturer_address+'">' +
            '<i class="address book icon"></i>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="two fields">' +
            '<div class="field">' +
            '<label>Fax<span style="margin-left:5px;" class="ui readonly mini label">read only</span></label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. 1876-555-5555" name="manufacturer_fax" type="text" value="' + data.manufacturer_fax+'">' +
            '<i class="fax icon"></i>' +
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<label>Contact Person<span style="margin-left:5px;" class="ui readonly mini label">read only </span>' + '</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. John Brown" name="manufacturer_contact_person" type="text" value="' + data.manufacturer_contact_person+'">' +
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
                writeFrequencies(data.frequencies)+
            '</tbody>' +
            '</table>' +
            '</div>' +
            '<div class="three fields">' +
            '<div class="field">' +
            '<label>Antenna Type</label>' +
            '<div class="ui input">' +
            '<input readonly type="text" placeholder="" name="antenna_type" value="' + data.antenna_type+'">' +
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<label>Antenna Gain (db)</label>' +
            '<div class="ui input">' +
            '<input readonly type="text" placeholder="" name="antenna_gain" value="' + data.antenna_gain+'" >' +
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<div class="two fields">' +
            '<div class="field">' +
            '<label>Channels (khz)</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="" name="channel" type="text" value="'+data.channel+'">' +
            '<i class="rss icon"></i>' +
            '</div>' +
            '</div>' +
            '<div class="field">' +
            '<label>Separation (khz)</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="" name="separation" type="text" value="'+data.separation+'">' +
            '<i class="rss icon"></i>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="field">'+
                '<label>Additional Information</label>'+
                '<textarea readonly rows="3" name="additional_information">'+data.additional_info+'</textarea>'+
            '</div>'+
            '</div>' +
            '</div>';

        var sample_inv_html =

            '<div id="sample_invoice" class="ui raised segment">' +
            '<div class="ui one column grid">' +
            '<div class="row">' +
            '<div class="column">' +
            '<img class="ui medium image" src="/Content/images/invoice_logo.PNG">' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="column">' +
            '<h3 class="ui center aligned header header_override">Sample Invoice</h3>' +
            '<div class="ui two column grid">' +
            '<div class="row">' +
            '<div class="ten wide column">' +
            '<fieldset id="fieldset_main">' +
            '<p>Customer #   xxxxx-x</p>' +
            '<h4 class="ui header header_override">' + data.applicant_name + '</h4>' +
            '<p class="paragraph_ovrd">' + breakAtCommas(data.applicant_address) + '</p>' +
            '</fieldset>' +
            '</div>' +
            '<div class="six wide column">' +
            '<fieldset style="width:250px;" id="fieldset_invoice">' +
            '<div class="ui two column grid">' +
            '<div class="row row_override_v3">' +
            '<div class="seven wide column">' +
            '<h4 class="ui header header_override">Invoice #</h4>' +
            '</div>' +
            '<div class="nine wide column">' +
            '<h4 class="ui header header_override">xxxxx</h4>' +
            '</div>' +
            '</div>' +
            '<div class="row row_override_v3">' +
            '<div class="seven wide column">' +
            '<p class="paragraph_ovrd">Date:</p>' +
            '</div>' +
            '<div class="nine wide column">' +
            '<p class="paragraph_ovrd">12/3/2018</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</fieldset>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div class="ui two column grid">' +
            '<div class="row">' +
            '<div class="ten wide column">' +
            '<h5 style="margin-bottom:0;" class="ui header header_override"><u>Type Approval Equipment</u></h5>' +
            '<h5 style="margin-top:5px;" class="ui header header_override">Manufacturer:  ' + data.manufacturer_name+'</h5>' +
            '</div>' +
            '<div class="six wide column">' +
            '<h5 style="margin-top:20px;" class="ui header header_override">Model:  ' + data.product_identification + '</h5>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div style="margin:30px 0px 0px 0px;" class="ui three column grid">' +
            '<div class="row row_override">' +
            '<div class="column">' +
            '<h5 class="ui header header_override">Details of Fee Charges</h5>' +
            '</div>' +
            '<div class="column">' +
            '<h5 class="ui header header_override">Qty.</h5>' +
            '</div>' +
            '<div class="column">' +
            '<h5 class="ui right aligned header header_override">Total Amount <br />(US$)</h5>' +
            '</div>' +
            '</div>' +
            '<div class="row row_override_v2">' +
            '<div class="column">' +
            '<p>Processing fees Type Approval Certification (PRS50)</p>' +
            '</div>' +
            '<div class="column">' +
            '<p style="margin-left:40px;">1.00</p>' +
            '</div>' +
            '<div class="column">' +
            '<p style="text-align:right;">$350.00</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div style="margin:0px 0px 0px 0px;" class="ui two column grid">' +
            '<div class="row row_override_v2">' +
            '<div class="six wide column">' +

            '</div>' +
            '<div class="ten wide column">' +
            '<hr class="separator" />' +
            '</div>' +
            '</div>' +
            '<div class="row row_override_v3">' +
            '<div class="six wide column">' +

            '</div>' +
            '<div class="ten wide column">' +
            '<div class="ui two column grid">' +
            '<div class="row">' +
            '<div class="column">' +
            '<h4 style="margin-left:80px;" class="ui header header_override">Total</h4>' +
            '</div>' +
            '<div class="column">' +
            '<h4 class="ui  right aligned header header_override">$350.00</h4>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div style="margin-top:50px;" class="ui two column grid">' +
            '<div class="row">' +
            '<div style="margin-left:40px;" class="fifteen wide column">' +
            '<div class="ui two column grid">' +
            '<div class="row row_override_v3">' +
            '<div class="four wide column">' +
            '<h4 class="ui header header_override">Wire Transfer Details</h4>' +
            '</div>' +
            '<div class="twelve wide column">' +

            '</div>' +
            '</div>' +
            '<div class="row row_override_v3">' +
            '<div class="four wide column">' +
            '<p class="paragraph_ovrd_v2">Correspondent Bank:</p>' +
            '</div>' +
            '<div class="twelve wide column">' +
            '<p class="paragraph_ovrd_v2">Citibank N. A.</p>' +
            '</div>' +
            '</div>' +
            '<div class="row row_override_v3">' +
            '<div class="four wide column">' +
            '<p class="paragraph_ovrd_v2"></p>' +
            '</div>' +
            '<div class="twelve wide column">' +
            '<p class="paragraph_ovrd_v2">111 Wall Street,</p>' +
            '</div>' +
            '</div>' +
            '<div class="row row_override_v3">' +
            '<div class="four wide column">' +
            '<p class="paragraph_ovrd_v2"></p>' +
            '</div>' +
            '<div class="twelve wide column">' +
            '<p class="paragraph_ovrd_v2">New York, NY 10043</p>' +
            '</div>' +
            '</div>' +
            '<div class="row row_override_v3">' +
            '<div class="four wide column">' +
            '<p class="paragraph_ovrd_v2">Swift</p>' +
            '</div>' +
            '<div class="twelve wide column">' +
            '<p class="paragraph_ovrd_v2">CITIUS33</p>' +
            '</div>' +
            '</div>' +
            '<div class="row row_override_v3">' +
            '<div class="four wide column">' +
            '<p class="paragraph_ovrd_v2">ABA No.:</p>' +
            '</div>' +
            '<div class="twelve wide column">' +
            '<p class="paragraph_ovrd_v2">021000089</p>' +
            '</div>' +
            '</div>' +
            '<div class="row row_override_v4">' +
            '<div class="four wide column">' +
            '<p class="paragraph_ovrd_v2">Beneficiary</p>' +
            '</div>' +
            '<div class="twelve wide column">' +
            '<p class="paragraph_ovrd_v2">First Global Bank Limited</p>' +
            '</div>' +
            '</div>' +
            '<div class="row row_override_v3">' +
            '<div class="four wide column">' +
            '<p class="paragraph_ovrd_v2"></p>' +
            '</div>' +
            '<div class="twelve wide column">' +
            '<p class="paragraph_ovrd_v2">BIC (Swift): FILBJMKN</p>' +
            '</div>' +
            '</div>' +
            '<div class="row row_override_v3">' +
            '<div class="four wide column">' +
            '<p class="paragraph_ovrd_v2"></p>' +
            '</div>' +
            '<div class="twelve wide column">' +
            '<p class="paragraph_ovrd_v2">28-48 Barbados Avenue, Kingston 5, Jamaica, W.I.</p>' +
            '</div>' +
            '</div>' +
            '<div class="row row_override_v3">' +
            '<div class="four wide column">' +
            '<p class="paragraph_ovrd_v2"></p>' +
            '</div>' +
            '<div class="twelve wide column">' +
            '<p class="paragraph_ovrd_v2">For further Credit to Spectrum Management Authority</p>' +
            '</div>' +
            '</div>' +
            '<div class="row row_override_v3">' +
            '<div class="four wide column">' +
            '<p class="paragraph_ovrd_v2"></p>' +
            '</div>' +
            '<div class="twelve wide column">' +
            '<p class="paragraph_ovrd_v2">Account # 99</p>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '</div>' +
            '<div class="one wide column">' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<h5 style="margin-left:40px; margin-top:35px;" class="ui header header_override">NB: A bank charge of US$17.50 is incurred for wire transfer transactions.</h5>' +

            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        var actions_html =
            '<div class="actions">' +
            '<div class="ui blue ok button" >' +
            '<i class="checkmark icon"></i>' +
            'Finish' +
            '</div >' +
            '</div >';

        html += step1_html + step2_html + sample_inv_html;
        $(target).append(html);
        $(actions_html).insertAfter(target);
        set_equipment_type_checked(data.type_of_equipment, data.other);

        $('.ui.long.modal')
            .modal({
                closable: false
            }).modal('show');

    }

    function initializeFeed(data)
    {
        if (data.licensedApplications.length > 0)
        {
            var lic_target = $('#licensed_cert_table tbody');
            $(lic_target).html('');
            for (var i = 0; i < data.licensedApplications.length; i++)
            {
                var lic_html =
                    '<tr>' +
                    '<td><a href="#">' + data.licensedApplications[i].application_id + '</a></td>' +
                    '<td>' + data.licensedApplications[i].manufacturer + '</td>' +
                    '<td>' + data.licensedApplications[i].model + '</td>' +
                    '<td>12/11/2018</td>' +
                    '<td>12/11/2018</td>' +
                    '<td>mscott</td>' +
                    '<td>Type Approval</td>' +
                    '<td><i class="blue file alternate link icon license_view"></i></td>' +
                    '</tr >';

                $(lic_target).append(lic_html);
            }
        }
        else
        {

        }
    }

    function getFeed()
    {
        $.ajax({
            type: "GET",
            url: "/home/get-dashboard-feed",
            contentType: "application/json; charset=utf-8",
            data: {},
            success: function (data) {
                initializeFeed(data.dashboard);
            },
            error: function (data) {
                console.log(data);
            }
        });
    }

    function breakAtCommas(data)
    {
        var result = '';
        for (var i = 0; i < data.length; i++)
        {
            if (data.charAt(i) === ',') {
                result += data.charAt(i);
                result += '<br/>';
            }
            else
            {
                result += data.charAt(i);
            }
        }
        return result;  
    }

    function set_equipment_type_checked(type, other)
    {
        var radio_options = $('#equipent_types_handle .ui.radio.checkbox');
        $.each(radio_options, function (i, object) {
            if ($(object).find("input").val() == type) {
                $(object).checkbox('check');
                console.log("checked: " + type);

                if (type == 'Other')
                {
                    $("input[name=other_equipment]").val(other);
                    $("input[name=other_equipment]").removeClass('disabled');
                }
            }
        });
    }

    function writeFrequencies(data)
    {
        var html = '';
        for (var i = 0; i < data.length; i++)
        {
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
                '<input readonly type="text" placeholder="frequency type" style="width:100%" name="freq_type" value="' + data[i].freq_type+'">' +
                '</div>' +
                '</td>' +
                '</tr>';

            html += row;
        }
        return html;
    }
});