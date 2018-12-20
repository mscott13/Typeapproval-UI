$(document).ready(function () {

    var json_form; 
    var file_tech_spec;
    var file_test_report;
    var file_accreditation;
    var form_status;

    $('body').on('click', '.ui.divided.selection.list .item', function () {
        $('.ui.divided.selection.list .item').removeClass('active');
        $(this).toggleClass("active");

        $.ajax({
            type: "GET",
            url: "/new/edit",
            contentType: "application/json; charset=utf-8",
            data: { "application_id": $(this).data('appid') },
            success: function (data) {
               
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
                else {
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


    

    $('#step3_to_finish').click(function () {

        var btn_finish = $(this);
        btn_finish.addClass('disabled loading');

        var institution = $('input[name="institution"]').val();
        var country = $('input[name="country"]').val();

        $.ajax({
            type: "GET",
            url: "/retrieve/step-3",
            success: function (data) {

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

    function add_file_to_table(name, type, size)
    {
        var file_table = $('.ui.table.files');
        switch (type)
        {
            case 'doc':
                var html = '<tr>' +
                            '<td>' + '<i class="file word icon"></i>' + name + '' + '</td>' +
                            '<td>' + type + '</td>' +
                            '<td>'+size+'</td>' +
                            '+<td><i class="close link icon file_record"></i></td>' +
                            '</tr>';

                $(file_table).find('tbody').append(html);
                break;
            default:
                var html_default = '<tr>' +
                    '<td>' + '<i class="file word icon"></i>' + name + '' + '</td>' +
                    '<td>' + type + '</td>' +
                    '<td>' + size + '</td>' +
                    '</tr>';

                $(file_table).find('tbody').append(html_default);
                break;
        }
    }

    function add_file_table()
    {
        var html = '<table class="ui selectable table files">' +
                    '<tbody>' +
                    '</tbody>' +
                    '</table>';

        $(html).insertAfter('.ui.placeholder.segment');
    }

    function remove_files_table()
    {
        $('.ui.selectable.table.files').remove();
    }

    function addApplicationStatus(html) {
        var raw = '<div class="ui attached warning message application">' +
            '<i class="info icon"></i>' +
            html +
            '</div>';


        $(raw).insertAfter('.ui.tiny.three.top.attached.steps');
    }


});