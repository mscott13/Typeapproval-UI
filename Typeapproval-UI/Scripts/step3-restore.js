﻿$(document).ready(function () {

    var json_form; 
    var files;

    $.ajax({
        type: "GET",
        url: "/retrieve/step-3",
        success: function (data) {
            json_form = JSON.stringify(data.form);
        },
        error: function (data) {
            console.log(data);
        }
    });

    $('body').on('change', '#upload_files', function () {

        files = ($('#upload_files'))[0].files;
        remove_files_table();
        add_file_table();

        for (var i = 0; i < files.length; i++)
        {
            var filename = files[i].name;
            var size = Math.ceil(files[i].size / 1000);
            var sz_str = size + 'KB';
            var type = files[i].type;

            add_file_to_table(filename, type, sz_str);
        }
    });

    $('#step3_to_finish').click(function () {
        var form_data = new FormData();
        form_data.append("json_form", json_form);

        for (var i = 0; i < files.length; i++)
        {
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
                    '+<td><i class="close link icon file_record"></i></td>' +
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
});