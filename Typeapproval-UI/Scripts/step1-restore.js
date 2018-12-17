$(document).ready(function () {

    $('body').on('click', '.ui.divided.selection.list .item', function () {
        $('.ui.divided.selection.list .item').removeClass('active');
        $(this).toggleClass("active");

        $.ajax({
            type: "GET",
            url: "/new/edit",
            contentType: "application/json; charset=utf-8",
            data: { "application_id": $(this).data('appid') },
            success: function (data) {
                restore_step1();
            },
            error: function (data) {
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
                        '<div class="header">' + data[i].application_id + '</div>' +
                        'Last update:' + data[i].last_updated + '' +
                        '</div>' +
                        '</div>';
                }
                else {
                    html_inner +=
                        '<div class="item" data-appid=' + data[i].application_id + '>' +
                        '<div class="content">' +
                        '<div class="header">' + data[i].application_id + '</div>' +
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

    function restore_step1() {
        $.ajax({
            type: "GET",
            url: "/retrieve/step-1",
            success: function (data) {
                if (data.data_present) {
                    $("#search_manufacturers").val(data.step1.manufacturer_name);
                    $("input[name=manufacturer_telephone]").val(data.step1.manufacturer_tel);
                    $("input[name=manufacturer_address]").val(data.step1.manufacturer_address);
                    $("input[name=manufacturer_fax]").val(data.step1.manufacturer_fax);
                    $("input[name=manufacturer_contact_person]").val(data.step1.manufacturer_contact_person);

                    if (data.step1.application_id !== '')
                    {
                        if ($('.ui.small.attached.warning.message.application').length === 0) {
                            var attatched_header =
                                '<div class="ui small attached warning message application">' +
                                '<i class="info icon"></i>' +
                                ' Application saved with ID: <b>' + data.step1.application_id + '</b>' +
                                '</div>';

                            $(attatched_header).insertAfter('.ui.tiny.three.top.attached.steps');
                        }
                        else {
                            var html =
                                '<i class="info icon"></i>' +
                                'Application saved with ID: <b>' + data.step1.application_id + '</b>';

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

    function reset_step_1()
    {

    }

    restore_step1();
});