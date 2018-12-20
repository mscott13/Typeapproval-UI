$(document).ready(function () {

    /////////////////////// Saving data to session /////////////////////////
    $('.ui.blue.button.save_app.s1').click(function () {
        var btn_save = $(this);
        $(btn_save).addClass("disabled loading");
       
        var jsonObj = new Object();
        jsonObj.manufacturer_name = $("input[name=manufacturer_name]").val();
        jsonObj.manufacturer_tel = $("input[name=manufacturer_telephone]").val();
        jsonObj.manufacturer_address = $("input[name=manufacturer_address]").val();
        jsonObj.manufacturer_fax = $("input[name=manufacturer_fax]").val();
        jsonObj.manufacturer_contact_person = $("input[name=manufacturer_contact_person]").val();
        jsonObj.provider_name = $("input[name=provider_name]").val();
        jsonObj.provider_telephone = $("input[name=provider_telephone]").val();
        jsonObj.provider_address = $("input[name=provider_address]").val();
        jsonObj.provider_fax = $("input[name=provider_fax]").val();
        jsonObj.provider_contact_person = $("input[name=provider_contact_person]").val();

        var json = JSON.stringify(jsonObj);
        $.ajax({
            type: "POST",
            url: "/save/step-1",
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
                        else if (data.responseText === "session expired")
                        {
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
                restore_step1();
            },
            error: function (data) {
            }
        });
    });

    function addApplicationStatus(html) {
        var raw = '<div class="ui attached warning message application">' +
            '<i class="info icon"></i>' +
            html +
            '</div>';

        $(raw).insertAfter('.ui.tiny.three.top.attached.steps');
    }

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

    function restore_step1() {
        $.ajax({
            type: "GET",
            url: "/retrieve/step-1",
            success: function (data) {
                if (data.data_present) {
                    $("input[name=manufacturer_name]").val(data.step1.manufacturer_name);
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