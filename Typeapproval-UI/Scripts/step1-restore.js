$(document).ready(function () {

    $("input").keyup(function () {
        $('.ui.blue.button.save_app.s1').text("Save for later (Ctrl-S)");
    });

    $(window).bind('keydown', function (event) {
        if (event.ctrlKey || event.metaKey) {
            switch (String.fromCharCode(event.which).toLowerCase()) {
                case 's':
                    event.preventDefault();
                    $('.ui.blue.button.save_app.s1').trigger('click');
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

    $(".ui.selection.dropdown.grantees").dropdown({
        onChange: function (value, text, $item) {
            console.log(text);
            console.log(value);

            $("input[name=grantee_address]").val($($item).data("addr"));
        },
        wrapSelection: false
    });
    
    /////////////////////// Saving data to session /////////////////////////

    $('.ui.blue.button.save_app.s1').click(function () {
        $("input").blur();
            var btn_save = $(this);
            $(btn_save).addClass("disabled loading");

            var jsonObj = new Object();
            jsonObj.applicant_name = $("input[name=applicant_name]").val();
            jsonObj.applicant_tel = $("input[name=applicant_telephone]").val();
            jsonObj.applicant_address = $("input[name=applicant_address]").val();
            jsonObj.applicant_fax = $("input[name=applicant_fax]").val();
            jsonObj.applicant_contact_person = $("input[name=applicant_contact_person]").val();

            jsonObj.grantee_name = $(".ui.selection.dropdown.grantees").dropdown('get text');
            jsonObj.manufacturer_name = $("input[name=manufacturer_name]").val();
            jsonObj.grantee_address = $("input[name=grantee_address]").val();

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

    $("#add-grantee").click(function () {
        $("#add_grantee").modal({
            onApprove: function () {
                var grantee_name = $("#grant_name").val();
                var grantee_address = $("#grant_address").val();

                if (grantee_name !== '') {
                    if (grantee_address !== '')
                    {
                        add_grantee(grantee_name, grantee_address); 
                    }
                    else
                    {
                        alert("Please provide a grantee address");
                    }
                }
                else
                {
                    alert("Please provide a grantee name");
                }
                return false;
            },
            onDeny: function () {
                setTimeout(function () {
                    $("#grant_name").val('');
                    $("#grant_address").val('');
                }, 500);
                return true;
            }
        }).modal('show');
    });

    function add_grantee(grantee_name, grantee_address)
    {
        $("#btn-addgrant-apply").addClass("disabled loading");
        var jsonObj = new Object();
        jsonObj.name = grantee_name;
        jsonObj.address = grantee_address;

        var json = JSON.stringify(jsonObj);
        $.ajax({
            type: "POST",
            url: "http://localhost:54367/api/data/NewGrantee",
            contentType: "application/json; charset=utf-8",
            data: json,
            success: function (data) {
                console.log(data);
                $(".ui.selection.dropdown.grantees").find(".menu").append('<div class="item" data-addr="' + data.address +'" data-value="' + data.name + '">' + data.name + '</div>');
                $(".ui.selection.dropdown.grantees").dropdown('refresh');
                $(".ui.selection.dropdown.grantees").dropdown('set selected', data.name);
                $("#add_grantee").modal('hide');
                $("#btn-addgrant-apply").removeClass("disabled loading");
                alert('Grantee added to list. Selected: ' + grantee_name);
            },
            error: function (data) {
                console.log(data);
                $("#btn-addgrant-apply").removeClass("disabled loading");
            }
        });
    }

    $('#step1_to_next').click(function () {

        if (validate())
        {
            var jsonObj = new Object();
            jsonObj.applicant_name = $("input[name=applicant_name]").val();
            jsonObj.applicant_tel = $("input[name=applicant_telephone]").val();
            jsonObj.applicant_address = $("input[name=applicant_address]").val();
            jsonObj.applicant_fax = $("input[name=applicant_fax]").val();
            jsonObj.applicant_contact_person = $("input[name=applicant_contact_person]").val();

            jsonObj.grantee_name = $(".ui.selection.dropdown.grantees").dropdown('get text');
            jsonObj.manufacturer_name = $("input[name=manufacturer_name]").val();
            jsonObj.grantee_address = $("input[name=grantee_address]").val();
            
            var json = JSON.stringify(jsonObj);
            $.ajax({
                type: "POST",
                url: "/save/step-1",
                contentType: "application/json; charset=utf-8",
                data: json,
                success: function (data) {
                    console.log(data);
                    window.location = "/new/step-2";
                },
                error: function (data) {
                    console.log(data);
                }
            });
        }
        else
        {
            // do something here if required
        }
    });


    $('body').on('click', '.ui.divided.selection.list .item', function () {
        $('.ui.divided.selection.list .item').removeClass('active');
        $(this).toggleClass("active");

        $.ajax({
            type: "GET",
            url: "/new/edit",
            contentType: "application/json; charset=utf-8",
            data: { "application_id": $(this).data('appid') },
            success: function (data) {
                restore_step1_v2();
            },
            error: function (data) {
            }
        });
    });

    function addApplicationStatus(html) {
        var raw = '<div class="ui attached warning message application">' +
            '<i class="info icon"></i>'+
            html +
            '</div>';

        $(raw).insertAfter('.ui.tiny.four.top.attached.steps');
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
                    $(".ui.selection.dropdown.grantees").dropdown('set selected', data.step1.grantee_name);
                    $("input[name=manufacturer_name]").val(data.step1.manufacturer_name);
                    $("input[name=grantee_address]").val(data.step1.grantee_address);

                    if (data.step1.application_id !== '') {
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

    function restore_step1_v2() {
        $.ajax({
            type: "GET",
            url: "/retrieve/step-1",
            success: function (data) {
                if (data.data_present) {
                    $(".ui.selection.dropdown.grantees").dropdown('set selected', data.step1.grantee_name);
                    $("input[name=applicant_name]").val(data.step1.applicant_name);
                    $("input[name=applicant_telephone]").val(data.step1.applicant_telephone);
                    $("input[name=applicant_address]").val(data.step1.applicant_address);
                    $("input[name=applicant_fax]").val(data.step1.applicant_fax);
                    $("input[name=applicant_contact_person]").val(data.step1.applicant_contact_person);

                    $("input[name=manufacturer_name]").val(data.step1.manufacturer_name);
                    $("input[name=grantee_address]").val(data.step1.grantee_address);

                    if (data.step1.application_id !== '') {
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

    function validate()
    {
        var form_valid = true;
        if ($("input[name=manufacturer_name]").val() === '')
        {
            $("input[name=manufacturer_name]").addClass('input-error');
            form_valid = false;
        }

         if ($("input[name=grantee_address]").val() === '')
        {
            $("input[name=grantee_address]").addClass('input-error');
            form_valid = false;
        }

      
        return form_valid;
    }

    restore_step1();
});