$(document).ready(function () {
    $('body').on('click', '.form_preview', function () {
        console.log($(this).data('appid')); 
        var appid = $(this).data('appid');

        $.ajax({
            type: "GET",
            url: "/new/preview",
            contentType: "application/json; charset=utf-8",
            data: { "application_id": appid },
            success: function (data) {
                create_base_modal();
                initializePreview(data.form);
            },
            error: function (data) {
                //$(modal).modal('hide');
            }
        });
    });

    $('.license_view').click(function () {
        window.location = "/certificates-personal?application_id=" + $(this).data('appid');
    });

    function initializePreview(data)
    {
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
            '<label>Contact Person</label>' +
            '<div class="ui left icon input">' +
            '<input readonly placeholder="eg. John Brown" name="applicant_contact_person" type="text" value="' + data.applicant_contact_person + '">' +
            '<i class="user circle icon"></i>' +
            '</div>' +
            '</div>' +
           
            '</div>' +
           

            '<a class="ui grey ribbon label">2. &nbsp Grantee / Manufacturer</a>' +
            '<div class="two fields">'+
                '<div class="field">'+
                    '<label>Grantee</label>'+
            '<div class="ui left icon input"><input readonly="" id="manufacturer_name" autocomplete="off" placeholder="Name" name="manufacturer_name" type="text" value="' + data.grantee_name+'"><i class="users icon"></i></div>'+
                    '</div>'+
                    '<div class="field">'+
                        '<label>Manufacturer Name<span style="margin-left:5px;" class="ui readonly mini label">read only</span></label>'+
                        '<div class="ui left icon input"><input readonly="" placeholder="eg. 1876-555-5555" name="manufacturer_name" type="text" value="'+data.manufacturer_name+'"><i class="phone volume icon"></i></div>'+
                        '</div>'+
                    '</div>'+

                    '<div class="field">'+
                        '<label>Address<span style="margin-left:5px;" class="ui readonly mini label">read only</span></label>'+
                        '<div class="ui left icon input"><input readonly="" placeholder="eg. 12 Beckford Street" name="manufacturer_address" type="text" value="'+data.grantee_address+'"><i class="address book icon"></i></div>'+
                        '</div>'+
                       
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
       
        $('.ui.long.modal')
            .modal({
                closable: false,
                onApprove: function () {
                    setTimeout(function () {
                        $("#app_modal").remove();
                    }, 1000);
                }
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
            //...
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
                '</tr>';

            html += row;
        }
        return html;
    }

    function create_base_modal() {
        var html =
            '<div id="app_modal" class="ui long modal">' +
            '<div id = "app_id" class="header" >Application Preview<i></i></div >' +
            '<div id="preview" class="scrolling content">' +
            '</div>' +
            '<div class="actions">' +
            '<div class="ui primary tiny approve button">' +
            'Finish' +
            '</div>' +
            '</div>' +
            '</div>';

        $(html).insertAfter("#client_main_content");
    }
});