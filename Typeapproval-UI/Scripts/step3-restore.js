﻿$(document).ready(function () {

    var json_form; 
    var files;
    var form_status;


    $('body').on('change', '#upload_files', function () {

        files = ($('#upload_files'))[0].files;
        remove_files_table();

        if (files.length > 0) {
            add_file_table();
            $('#step3_to_finish').removeClass('disabled');
        }
        else
        {
            $('#step3_to_finish').addClass('disabled');
        }

        for (var i = 0; i < files.length; i++)
        {
            var filename = files[i].name;
            var size = Math.ceil(files[i].size / 1000);
            var sz_str = size + ' Kb';
            var type = files[i].type;

            add_file_to_table(filename, type, sz_str);
        }
    });

    $('#step3_to_finish').click(function () {
        var btn_finish = $(this);
        btn_finish.addClass('disabled loading');

        $.ajax({
            type: "GET",
            url: "/retrieve/step-3",
            success: function (data) {
                json_form = JSON.stringify(data.form);
                form_status = data.form.status;

                if (form_status == 'completed') {
                    var form_data = new FormData();
                    form_data.append("json_form", json_form);

                    for (var i = 0; i < files.length; i++) {
                        form_data.append(i, files[i]);
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