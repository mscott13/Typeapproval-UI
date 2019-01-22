$(document).ready(function () {
    $(".ui.selection.dropdown.manufacturers").dropdown({
        onChange: function (value, text, $item) {
            console.log(text);
            console.log(value);

            $("input[name=manufacturer_telephone]").val($($item).data("tel"));
            $("input[name=manufacturer_address]").val($($item).data("addr"));
            $("input[name=manufacturer_fax]").val($($item).data("fax"));
            $("input[name=manufacturer_contact_person]").val($($item).data("person"));
            
        }
    });
    
    /////////////////////// Saving data to session /////////////////////////

    $('.ui.blue.button.save_app.s1').click(function () {
        
        if (validate()) {
            var btn_save = $(this);
            $(btn_save).addClass("disabled loading");

            var jsonObj = new Object();
            jsonObj.manufacturer_name = $(".ui.selection.dropdown.manufacturers").dropdown('get text');
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
        }
        else
        {
            //do something here if needed
        }
    });
    /////////////////////// Saving data to session /////////////////////////

    $("#add-manufacturer").click(function () {
        $("#add_manufacturer").modal({
            onApprove: function () {
                var manufacturer_name = $("#man_name").val();
                var manufacturer_address = $("#man_address").val();
                var manufacturer_telephone = $("#man_telephone").val();
                var manufacturer_fax = $("#man_fax").val();
                var manufacturer_person = $("#man_person").val();

                if (manufacturer_name !== '') {
                    if (manufacturer_address !== '') {
                        if (manufacturer_telephone !== '') {
                            var man_name_exist = $(".ui.selection.dropdown.manufacturers").dropdown('get item', manufacturer_name);
                            if (!man_name_exist) {
                                add_manufacturer(manufacturer_name, manufacturer_address, manufacturer_telephone, manufacturer_fax, manufacturer_person);
                            }
                            else
                            {
                                alert('This manufacturer already exists');
                            }
                            
                        }
                        else
                        {
                            alert("Please provide a manufacturer telephone");
                        }
                    }
                    else
                    {
                        alert("Please provide a manufacturer address");
                    }
                }
                else
                {
                    alert("Please provide a manufacturer name");
                }
                return false;
            },
            onDeny: function () {
                setTimeout(function () {
                    $("#man_name").val('');
                    $("#man_address").val('');
                    $("#man_telephone").val('');
                    $("#man_fax").val('');
                    $("#man_person").val('');
                }, 500);
                return true;
            }
        }).modal('show');
    });

    function add_manufacturer(manufacturer_name, manufacturer_address, manufacturer_telephone, manufacturer_fax, manufacturer_person)
    {
        var jsonObj = new Object();
        jsonObj.name = manufacturer_name;
        jsonObj.telephone = manufacturer_telephone;
        jsonObj.address = manufacturer_address;
        jsonObj.fax = manufacturer_fax;
        jsonObj.contact_person = manufacturer_person;

        var json = JSON.stringify(jsonObj);
        $.ajax({
            type: "POST",
            url: "http://localhost:54367/api/data/NewManufacturer",
            contentType: "application/json; charset=utf-8",
            data: json,
            success: function (data) {
                console.log(data);
                $(".ui.selection.dropdown.manufacturers").find(".menu").append('<div class="item" data-addr="' + data.address + '" data-tel="' + data.telephone + '" data-fax="' + data.fax + '" data-person="' + data.contact_person + '" data-value="' + data.name + '">' + data.name + '</div>');
                $(".ui.selection.dropdown.manufacturers").dropdown('refresh');
                $(".ui.selection.dropdown.manufacturers").dropdown('set selected', data.name);
            },
            error: function (data) {
                console.log(data);
            }
        });
    }

    $('#step1_to_next').click(function () {

        if (validate()) {
            var jsonObj = new Object();
            jsonObj.manufacturer_name = $(".ui.selection.dropdown.manufacturers").dropdown('get text');;
            jsonObj.manufacturer_tel = $("input[name=manufacturer_telephone]").val();
            jsonObj.manufacturer_address = $("input[name=manufacturer_address]").val();
            jsonObj.manufacturer_fax = $("input[name=manufacturer_fax]").val();
            jsonObj.manufacturer_contact_person = $("input[name=manufacturer_contact_person]").val();

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
                    $(".ui.selection.dropdown.manufacturers").dropdown('set selected', data.step1.manufacturer_name);
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

    function validate()
    {
        var form_valid = true;
        if ($("input[name=manufacturer_name]").val() === '')
        {
            $("input[name=manufacturer_name]").addClass('input-error');
            form_valid = false;
        }

        if ($("input[name=manufacturer_telephone]").val() === '')
        {
            $("input[name=manufacturer_telephone]").addClass('input-error');
            form_valid = false;
        }

        if ($("input[name=manufacturer_address]").val() === '')
        {
            $("input[name=manufacturer_address]").addClass('input-error');
            form_valid = false;
        }
       
        return form_valid;
    }

    restore_step1();
});