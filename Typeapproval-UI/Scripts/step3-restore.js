$(document).ready(function () {

    var json_form; 
    var form_status;

    $("input").keyup(function () {
        $('.ui.blue.button.save_app.s3').text("Save for later (Ctrl-S)");
    });

    $(window).bind('keydown', function (event) {
        if (event.ctrlKey || event.metaKey) {
            switch (String.fromCharCode(event.which).toLowerCase()) {
                case 's':
                    event.preventDefault();
                    $('.ui.blue.button.save_app.s3').trigger('click');
                    break;
                case 'f':
                    event.preventDefault();
                    break;
                case 'g':
                    event.preventDefault();
                    break;
            }
        }
    });

    $('.ui.read-only.checkbox.tech_spec_check').checkbox();
    $('.ui.read-only.checkbox.test_report_check').checkbox();
    $('.ui.read-only.checkbox.accreditation_check').checkbox();
    $('.ui.read-only.checkbox.letter_authorization_check').checkbox();
    $('.ui.read-only.checkbox.user_manual_check').checkbox();

     /////////////////////// Saving data to session /////////////////////////
    $('.ui.blue.button.save_app.s3').click(function () {
        $("input").blur();
        var btn_save = $(this);
        $(btn_save).addClass("disabled loading");

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
    $('body').on('click', '.tech_spec', function () {
        var sequence = $(this).data('seq');
        var file = $('input.file_tech_spec[data-seq="' + sequence + '"]');

        if ($(this).hasClass("file_remove"))
        {
            $(this).remove();
            $(file).remove();

            if ($(".tech_spec").length === 1)
            {
                $(".tech_spec").remove();
                $('input.file_tech_spec').remove();

                $('.ui.read-only.checkbox.tech_spec_check').checkbox('check');
                add_input_file("tech_spec");
            }
        }
        else 
        {
            $(file).trigger('click');
        }
    });

    $('body').on('click', '.test_report', function () {
        var sequence = $(this).data('seq');
        var file = $('input.file_test_report[data-seq="' + sequence + '"]');

        if ($(this).hasClass("file_remove")) {
            $(this).remove();
            $(file).remove();

            if ($(".test_report").length === 1) {
                $(".test_report").remove();
                $('input.file_test_report').remove();

                $('.ui.read-only.checkbox.test_report_check').checkbox('check');
                add_input_file("test_report");
            }
        }
        else {
            $(file).trigger('click');
        }
    });

    $('body').on('click', '.accreditation', function () {
        var sequence = $(this).data('seq');
        var file = $('input.file_accreditation[data-seq="' + sequence + '"]');

        if ($(this).hasClass("file_remove")) {
            $(this).remove();
            $(file).remove();

            if ($(".accreditation").length === 1) {
                $(".accreditation").remove();
                $('input.file_accreditation').remove();

                $('.ui.read-only.checkbox.accreditation_check').checkbox('check');
                add_input_file("accreditation");
            }
        }
        else {
            $(file).trigger('click');
        }
    });

    $('body').on('click', '.letter_authorization', function () {
        var sequence = $(this).data('seq');
        var file = $('input.file_letter_authorization[data-seq="' + sequence + '"]');

        if ($(this).hasClass("file_remove")) {
            $(this).remove();
            $(file).remove();

            if ($(".letter_authorization").length === 1) {
                $(".letter_authorization").remove();
                $('input.file_letter_authorization').remove();

                $('.ui.read-only.checkbox.letter_authorization_check').checkbox('check');
                add_input_file("letter_authorization");
            }
        }
        else {
            $(file).trigger('click');
        }
    });

    $('body').on('click', '.user_manual', function () {
        var sequence = $(this).data('seq');
        var file = $('input.file_user_manual[data-seq="' + sequence + '"]');

        if ($(this).hasClass("file_remove")) {
            $(this).remove();
            $(file).remove();

            if ($(".user_manual").length === 1) {
                $(".user_manual").remove();
                $('input.file_user_manual').remove();

                $('.ui.read-only.checkbox.user_manual_check').checkbox('check');
                add_input_file("user_manual");
            }
        }
        else {
            $(file).trigger('click');
        }
    });

    function add_input_file(type)
    {
        var target = $("#files_input_container");
        var file = '';
        var link = '';
        var count = 0;

        switch (type)
        {
            case "tech_spec":
                if ($(".file_tech_spec:last").data("seq") === undefined) {
                    $('.ui.read-only.checkbox.tech_spec_check').checkbox('uncheck');
                    count = 0;
                }
                else
                {
                    count = $(".file_tech_spec:last").data("seq") + 1;
                }
                
                file = '<input data-seq="' + count + '" class="file_tech_spec" accept="application/pdf" type="file" style="display: none" />';
                $(target).append(file);
                link = '<a data-seq="' + count + '" class="link_override_v1 tech_spec" style="cursor:pointer !important;"><i class="file pdf icon"></i>Attach PDF</a>';
                $("#tech_spec_links").append(link);
                break;
            case "test_report":
                if ($(".file_test_report:last").data("seq") === undefined)
                {
                    $('.ui.read-only.checkbox.test_report_check').checkbox('uncheck');
                    count = 0;
                }
                else
                {
                    count = $(".file_test_report:last").data("seq") + 1;
                }

                file = '<input data-seq="' + count + '" class="file_test_report" accept="application/pdf" type="file" style="display: none" />';
                $(target).append(file);
                link = '<a data-seq="' + count + '" class="link_override_v1 test_report" style="cursor:pointer !important;"><i class="file pdf icon"></i>Attach PDF</a>';
                $("#test_report_links").append(link);
                break;
            case "accreditation":
                if ($(".file_accreditation:last").data("seq") === undefined)
                {
                    $('.ui.read-only.checkbox.accreditation_check').checkbox('uncheck');
                    count = 0;
                }
                else
                {
                    count = $(".file_accreditation:last").data("seq") + 1;
                }

                file = '<input data-seq="' + count + '" class="file_accreditation" accept="application/pdf" type="file" style="display: none" />';
                $(target).append(file);
                link = '<a data-seq="' + count + '" class="link_override_v1 accreditation" style="cursor:pointer !important;"><i class="file pdf icon"></i>Attach PDF</a>';
                $("#accreditation_links").append(link);
                break;
            case "letter_authorization":
                if ($(".file_letter_authorization:last").data("seq") === undefined) {
                    $('.ui.read-only.checkbox.letter_authorization_check').checkbox('uncheck');
                    count = 0;
                }
                else {
                    count = $(".file_letter_authorization:last").data("seq") + 1;
                }

                file = '<input data-seq="' + count + '" class="file_letter_authorization" accept="application/pdf" type="file" style="display: none" />';
                $(target).append(file);
                link = '<a data-seq="' + count + '" class="link_override_v1 letter_authorization" style="cursor:pointer !important;"><i class="file pdf icon"></i>Attach PDF</a>';
                $("#letter_authorization_links").append(link);
                break;
            case "user_manual":
                if ($(".file_user_manual:last").data("seq") === undefined) {
                    $('.ui.read-only.checkbox.user_manual_check').checkbox('uncheck');
                    count = 0;
                }
                else {
                    count = $(".file_user_manual:last").data("seq") + 1;
                }

                file = '<input data-seq="' + count + '" class="file_user_manual" accept="application/pdf" type="file" style="display: none" />';
                $(target).append(file);
                link = '<a data-seq="' + count + '" class="link_override_v1 user_manual" style="cursor:pointer !important;"><i class="file pdf icon"></i>Attach PDF</a>';
                $("#user_manual_links").append(link);
                break;
        }
    }

    $('body').on('change', '.file_tech_spec', function () {
        var sequence = $(this).data("seq");
        var link = $('a.tech_spec[data-seq="' + sequence + '"]');
        var files = ($(this))[0].files;
        var filename = '';

        if (files.length > 0) {
            for (var i = 0; i < files.length; i++)
            {
                filename += files[i].name;
                if (i < files.length - 1)
                {
                    filename += ", ";
                }
            }

            $(link).html('<i class="file pdf icon"></i>' + filename + '<span style="float:right"><i class="close icon"></i></span>');
            $(link).addClass("file_remove");
            $('.ui.read-only.checkbox.tech_spec_check').checkbox('check');
            add_input_file("tech_spec");
        }
    });

    $('body').on('change', '.file_test_report', function () {
        var sequence = $(this).data("seq");
        var link = $('a.test_report[data-seq="' + sequence + '"]');
        var files = ($(this))[0].files;
        var filename = '';

        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                filename += files[i].name;
                if (i < files.length - 1) {
                    filename += ", ";
                }
            }

            $(link).html('<i class="file pdf icon"></i>' + filename + '<span style="float:right"><i class="close icon"></i></span>');
            $(link).addClass("file_remove");
            $('.ui.read-only.checkbox.test_report_check').checkbox('check');
            add_input_file("test_report");
        }
    });

    $('body').on('change', '.file_accreditation', function () {
        var sequence = $(this).data("seq");
        var link = $('a.accreditation[data-seq="' + sequence + '"]');
        var files = ($(this))[0].files;
        var filename = '';

        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                filename += files[i].name;
                if (i < files.length - 1) {
                    filename += ", ";
                }
            }

            $(link).html('<i class="file pdf icon"></i>' + filename + '<span style="float:right"><i class="close icon"></i></span>');
            $(link).addClass("file_remove");
            $('.ui.read-only.checkbox.accreditation_check').checkbox('check');
            add_input_file("accreditation");
        }
    });

    $('body').on('change', '.file_letter_authorization', function () {
        var sequence = $(this).data("seq");
        var link = $('a.letter_authorization[data-seq="' + sequence + '"]');
        var files = ($(this))[0].files;
        var filename = '';

        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                filename += files[i].name;
                if (i < files.length - 1) {
                    filename += ", ";
                }
            }

            $(link).html('<i class="file pdf icon"></i>' + filename + '<span style="float:right"><i class="close icon"></i></span>');
            $(link).addClass("file_remove");
            $('.ui.read-only.checkbox.letter_authorization_check').checkbox('check');
            add_input_file("letter_authorization");
        }
    });

    $('body').on('change', '.file_user_manual', function () {
        var sequence = $(this).data("seq");
        var link = $('a.user_manual[data-seq="' + sequence + '"]');
        var files = $(this)[0].files;
        var filename = '';

        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                filename += files[i].name;
                if (i < files.length - 1) {
                    filename += ", ";
                }
            }

            $(link).html('<i class="file pdf icon"></i>' + filename + '<span style="float:right"><i class="close icon"></i></span>');
            $(link).addClass("file_remove");
            $('.ui.read-only.checkbox.user_manual_check').checkbox('check');
            add_input_file("user_manual");
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

        $(raw).insertAfter('#steps');
    }
    

    $('#step3_to_finish').click(function () {

        if ($("#herby").is(":checked")) {
            var btn_finish = $(this);
            btn_finish.addClass('disabled loading');

            $.ajax({
                type: "GET",
                url: "/retrieve/application",
                success: function (data) {

                    form = data.form;
                    json_form = JSON.stringify(data.form);
                    form_status = data.form.status;

                    if (form_status === 'completed') {
                        var form_data = new FormData();
                        form_data.append("json", json_form);

                        ///////////////////////////////////////////////////////////////////////
                        var tech_spec_files = $("input.file_tech_spec");
                        var test_report_files = $("input.file_test_report");
                        var accreditation_files = $("input.file_accreditation");
                        var letter_authorization_files = $("input.file_letter_authorization");
                        var user_manual_files = $("input.file_user_manual");

                        var required_files_present = false;
                        if (tech_spec_files.length > 1) {
                            if (test_report_files.length > 1) {
                                if (accreditation_files.length > 1) {
                                    required_files_present = true;
                                }
                                else
                                {
                                    alert("Add Accreditation File");
                                }
                            }
                            else
                            {
                                alert("Add Test Report File");
                            }
                        }
                        else
                        {
                            alert("Add Technical Specifications File");
                        }

                        if (required_files_present) {
                            for (var i = 0; i < tech_spec_files.length; i++) {
                                var ts_list = ($(tech_spec_files[i]))[0].files;
                                if (ts_list.length > 0) {
                                    console.log("add files: " + ts_list[0].name);
                                    form_data.append("tech_spec", ts_list[0]);
                                }
                                else {
                                    console.log("empty file: " + ts_list);
                                }
                            }

                            for (var j = 0; j < test_report_files.length; j++) {
                                var tr_list = ($(test_report_files[j]))[0].files;
                                if (tr_list.length > 0) {
                                    console.log("add files: " + tr_list[0].name);
                                    form_data.append("test_report", tr_list[0]);
                                }
                                else {
                                    console.log("empty file: " + tr_list);
                                }
                            }

                            for (var k = 0; k < accreditation_files.length; k++) {
                                var a_list = ($(accreditation_files[k]))[0].files;
                                if (a_list.length > 0) {
                                    console.log("add files: " + a_list[0].name);
                                    form_data.append("accreditation", a_list[0]);
                                }
                                else {
                                    console.log("empty file: " + a_list);
                                }
                            }

                            for (var l = 0; l < letter_authorization_files.length; l++) {
                                var la_list = ($(letter_authorization_files[l]))[0].files;
                                if (la_list.length > 0) {
                                    console.log("add files: " + la_list[0].name);
                                    form_data.append("letter_auth", la_list[0]);
                                }
                                else {
                                    console.log("empty file: " + la_list);
                                }
                            }

                            for (var m = 0; m < user_manual_files.length; m++) {
                                var um_list = $(user_manual_files[m])[0].files;
                                if (um_list.length > 0) {
                                    console.log("add files: " + um_list[0].name);
                                    form_data.append("user_man", um_list[0]);
                                }
                                else {
                                    console.log("empty file: " + um_list);
                                }
                            }
                            ///////////////////////////////////////////////////////////////////////

                            $.ajax({
                                type: "POST",
                                url: "http://localhost:54367/api/upload/multiple",
                                processData: false,
                                contentType: false,
                                data: form_data,
                                success: function (data) {
                                    console.log(data);
                                    btn_finish.removeClass('disabled loading');
                                    clear_form(data);
                                },
                                error: function (data) {
                                    console.log(data);
                                    btn_finish.removeClass('disabled loading');
                                    var r = data.responseText.replace(/"/g, "");
                                    if (r === "invalid_file") {
                                        alert("Only pdf files are supported.");
                                    }
                                    else {
                                        alert("An unkown error has occured. Try saving the application and submit at a later date");
                                    }
                                }
                            });
                        }
                        else
                        {
                            btn_finish.removeClass('disabled loading');
                        }
                        
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
        }
        else
        {
            alert("Please tick the checkbox indicating that you agree to the conditions below.");
        }
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

    function set_application_id(id)
    {
        var jsonObject = new Object();
        jsonObject.appid = id;
        var json = JSON.stringify(jsonObject);

        $.ajax({
            type: "POST",
            url: "/new/set-app-id",
            contentType: 'application/json',
            data: json,
            success: function (data)
            {
                console.log("appid set");
                window.location = "/new/step-4";
            },
            error: function (data) {
                console.log("appid not set");
                window.location = "/home";
            }
        });
    }

    function clear_form(appid)
    {
        $.ajax({
            type: "POST",
            url: "/new/clear-form?appid=" + appid,
            contentType: 'application/json',
            data: {},
            success: function (data) {
                window.location = "/new/step-4?appid=" + appid;
            },
            error: function (data) {
                window.location = "/home";
            }
        });
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