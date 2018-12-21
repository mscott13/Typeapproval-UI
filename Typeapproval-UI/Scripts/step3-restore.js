$(document).ready(function () {

    var json_form; 
    var file_tech_spec;
    var file_test_report;
    var file_accreditation;
    var form_status;
    var form;

    $('.ui.read-only.checkbox.tech_spec_check').checkbox();
    $('.ui.read-only.checkbox.test_report_check').checkbox();
    $('.ui.read-only.checkbox.accreditation').checkbox();

     /////////////////////// Saving data to session /////////////////////////
    $('.ui.blue.button.save_app.s3').click(function () {
        var btn_save = $(this);
        $(btn_save).addClass("disabled loading");

        var jsonObj = new Object();
        jsonObj.name_of_test = $("input[name=institution]").val();
        jsonObj.country = $("input[name=country]").val();


        var json = JSON.stringify(jsonObj);
        $.ajax({
            type: "POST",
            url: "/save/step-3",
            contentType: "application/json; charset=utf-8",
            data: json,
            success: function (data) {
                $.ajax({
                    type: "GET",
                    url: "/new/post-current-app",
                    success: function (data) {
                        if (data.responseText === "posted") {
                            addApplicationStatus("Application saved with ID: <b>" + data.app_id + "<b>");
                            $(btn_save).removeClass("disabled loading");
                            $(btn_save).html("Saved");
                        }
                        else if (data.responseText === "updated") {
                            console.log("application updated");
                            $(btn_save).removeClass("disabled loading");
                            $(btn_save).html("Saved");
                        }
                        else if (data.responseText === "session expired") {
                            window.location = "/account";
                        }
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
            },
            error: function (data) {
                console.log(data);
            }
        });
    });
     /////////////////////// Saving data to session /////////////////////////

    $('body').on('click', '.ui.divided.selection.list .item', function () {
        $('.ui.divided.selection.list .item').removeClass('active');
        $(this).toggleClass("active");

        $.ajax({
            type: "GET",
            url: "/new/edit",
            contentType: "application/json; charset=utf-8",
            data: { "application_id": $(this).data('appid') },
            success: function (data) {
                restore_step3();
            },
            error: function (data) {
            }
        });
    });


    //////////////////////////////////////////////// HANDLING FILES HERE ///////////////////////////////////////////////
    $('#tech_spec').click(function () {
        $('#file_tech_spec').trigger('click');
    });

    $('#test_report').click(function () {
        $('#file_test_report').trigger('click');
    });

    $('#accreditation').click(function () {
        $('#file_accreditation').trigger('click');
    });

    $('body').on('change', '#file_tech_spec', function () {

        file_tech_spec = ($('#file_tech_spec'))[0].files;

        if (file_tech_spec.length > 0) {
            var filename = file_tech_spec[0].name;
            $('#tech_spec').html('<i class="file pdf icon"></i>' + filename + '</a>');
            $('.ui.read-only.checkbox.tech_spec_check').checkbox('check');
            
        }


        for (var i = 0; i < file_tech_spec.length; i++) {
            var size = Math.ceil(file_tech_spec[i].size / 1000);
            var sz_str = size + ' Kb';
            var type = file_tech_spec[i].type;
        }
    });

    $('body').on('change', '#file_test_report', function () {

        file_test_report = ($('#file_test_report'))[0].files;

        if (file_test_report.length > 0)
        {
            var filename = file_test_report[0].name;
            $('#test_report').html('<i class="file pdf icon"></i>' + filename + '</a>');
            $('.ui.read-only.checkbox.test_report_check').checkbox('check');
        }

        for (var i = 0; i < file_test_report.length; i++) {
            
            var size = Math.ceil(file_test_report[i].size / 1000);
            var sz_str = size + ' Kb';
            var type = file_test_report[i].type;
        }
    });

    $('body').on('change', '#file_accreditation', function () {

        file_accreditation = ($('#file_accreditation'))[0].files;

        if (file_accreditation.length > 0) {
            var filename = file_accreditation[0].name;
            $('#accreditation').html('<i class="file pdf icon"></i>' + filename + '</a>');
            $('.ui.read-only.checkbox.accreditation').checkbox('check');
        }

        for (var i = 0; i < file_accreditation.length; i++) {
            var size = Math.ceil(file_accreditation[i].size / 1000);
            var sz_str = size + ' Kb';
            var type = file_accreditation[i].type;
        }
    });
    //////////////////////////////////////////////// ///////////////////// ///////////////////////////////////////////////


    $.ajax({
        type: "GET",
        url: "/saved/get-documents",
        contentType: "application/json; charset=utf-8",
        data: {},
        success: function (data) {
            initializeSavedApps(data.savedApplications);
        },
        error: function (data) {
            console.log(data);
        }
    });

    function initializeSavedApps(data) {
        if (data.length > 0) {
            $('.ui.tiny.active.centered.inline.text.loader.saved-docs').remove();
            var html_main =
                '<div class="ui divided selection list">' +
                '</div >';

            $('#savedDocs').html('');
            $('#savedDocs').append(html_main);

            var html_inner = '';
            for (var i = 0; i < data.length; i++) {

                if (data[i].active === true) {
                    html_inner +=
                        '<div class="active item" data-appid=' + data[i].application_id + '>' +
                        '<div class="content">' +
                        '<h4 class="ui blue header">' + data[i].application_id + '</h4>' +
                        'Last update:' + data[i].last_updated + '' +
                        '</div>' +
                        '</div>';
                }
                else
                {
                    html_inner +=
                        '<div class="item" data-appid=' + data[i].application_id + '>' +
                        '<div class="content">' +
                        '<h4 class="ui blue header">' + data[i].application_id + '</h4>' +
                        'Last update:' + data[i].last_updated + '' +
                        '</div>' +
                        '</div>';
                }
            }

            $('.ui.divided.selection.list').append(html_inner);
        }
        else {
            $('.ui.tiny.active.centered.inline.text.loader.saved-docs').remove();
            $('#savedDocs').html('No saved applications found on your account.');
        }
    }

    function addApplicationStatus(html) {
        var raw = '<div class="ui attached warning message application">' +
            '<i class="info icon"></i>' +
            html +
            '</div>';

        $(raw).insertAfter('.ui.tiny.three.top.attached.steps');
    }
    

    $('#step3_to_finish').click(function () {

        var btn_finish = $(this);
        btn_finish.addClass('disabled loading');

        var institution = $('input[name="institution"]').val();
        var country = $('input[name="country"]').val();

        $.ajax({
            type: "GET",
            url: "/retrieve/application",
            success: function (data) {

                form = data.form;
                json_form = JSON.stringify(data.form);
                form_status = data.form.status;

                if (form_status === 'completed')
                {
                    var form_data = new FormData();
                    form_data.append("json", json_form);
                    form_data.append("institution", institution);
                    form_data.append("country", country);

                    for (var i = 0; i < file_tech_spec.length; i++)
                    {
                        form_data.append(i, file_tech_spec[i]);
                        form_data.append(i, file_test_report[i]);
                        form_data.append(i, file_accreditation[i]);
                    }

                    $.ajax({
                        type: "POST",
                        url: "http://localhost:54367/api/upload/multiple",
                        processData: false,
                        contentType: false,
                        data: form_data,
                        success: function (data) {
                            console.log(data);
                            btn_finish.removeClass('disabled loading');

                            var html = "<p style='text-align: center;'>Your application was submitted with ID: <b>" + data + "</b>. Your application will be reviewed and processed.</p>";
                            $('.ui.modal.upload-status').find(".content").prepend(html);

                           
                            var sample_inv_html =

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
                                '<h4 class="ui header header_override">' + form.applicant_name + '</h4>' +
                                '<p class="paragraph_ovrd">' + breakAtCommas(form.applicant_address) + '</p>' +
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
                                '<h5 style="margin-top:5px;" class="ui header header_override">Manufacturer:  ' + form.manufacturer_name + '</h5>' +
                                '</div>' +
                                '<div class="six wide column">' +
                                '<h5 style="margin-top:20px;" class="ui header header_override">Model:  ' + form.product_identification + '</h5>' +
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
                                '</div>';
                                
                            $('#sample_invoice').html(sample_inv_html);

                            $('.ui.modal.upload-status')
                                .modal({
                                    closable: false,
                                    blurring: false,
                                    onApprove: function () {
                                        window.location = "/home";
                                    }
                                }).modal('show');


                        },
                        error: function (data) {
                            console.log(data);
                            btn_finish.removeClass('disabled loading');
                        }
                    });
                }
                else {
                    $('.ui.modal.minfo')
                        .modal({
                            closable: false,
                            blurring: false
                        }).modal('show');

                    console.log(data);
                    btn_finish.removeClass('disabled loading');
                }
            },
            error: function (data) {
                console.log(data);
            }
        });
    });

    function breakAtCommas(data) {
        var result = '';
        for (var i = 0; i < data.length; i++) {
            if (data.charAt(i) === ',') {
                result += data.charAt(i);
                result += '<br/>';
            }
            else {
                result += data.charAt(i);
            }
        }
        return result;
    }

    function restore_step3() {
        $.ajax({
            type: "GET",
            url: "/retrieve/step-3",
            success: function (data) {
                if (data.data_present) {
                    $("input[name=institution]").val(data.step3.name_of_test);
                    $("input[name=country]").val(data.step3.country);

                    if (data.step3.application_id !== '') {
                        if ($('.ui.small.attached.warning.message.application').length === 0) {
                            var attatched_header =
                                '<div class="ui small attached warning message application">' +
                                '<i class="info icon"></i>' +
                                ' Application saved with ID: <b>' + data.step3.application_id + '</b>' +
                                '</div>';

                            $(attatched_header).insertAfter('.ui.tiny.three.top.attached.steps');
                        }
                        else {
                            var html =
                                '<i class="info icon"></i>' +
                                'Application saved with ID: <b>' + data.step3.application_id + '</b>';

                            $('.ui.small.attached.warning.message.application').html(html);
                        }
                    }
                }
            },
            error: function (data) {
                console.log(data);
            }
        });
    }

    restore_step3();
});