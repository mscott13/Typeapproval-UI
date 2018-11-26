$(document).ready(function () {

    const USERNAME = 'grp_username';
    const EMAIL = 'grp_email';
    const FNAME = 'grp_fname';
    const LNAME = 'grp_lname';
    const PASSWORD = 'grp_password';
    const CONFIRM = 'grp_confirm';

    $('.ui.dropdown').dropdown();
    $('.ui.dropdown').popup();
    $('.ui.small.red.label').popup();
    $('.header.item').popup();
    $('.ui.radio.checkbox').checkbox();

    $('.ui.sticky').sticky({
        context: '#context'
    });

    $('.ui.small.category.search')
        .search({
            type: 'category',
            minCharacters: 1,
            apiSettings: {
                onResponse: function (apiResponse) {
                    var
                        response = {
                            results: {}
                        }
                        ;
                    $.each(apiResponse.items, function (index, item) {

                        var type = item.category || 'Unknown',
                            maxResults = 15;

                        if (index >= maxResults) {
                            return false;
                        }

                        if (response.results[type] === undefined) {
                            response.results[type] = {
                                name: type,
                                results: []
                            };
                        }
                        // add result to category
                        response.results[type].results.push({
                            title: item.title,
                            description: item.description,
                            url: item.url
                        });
                    });
                    return response;
                },
                url: '//localhost:54367/api/search/allcategories?q={query}'
            }
        })
        ;

    $('#step1_to_next').click(function () {

        var jsonObj = new Object();
        jsonObj.manufacturer_name             = $("input[name=manufacturer_name]").val();
        jsonObj.manufacturer_tel              = $("input[name=manufacturer_telephone]").val();
        jsonObj.manufacturer_address          = $("input[name=manufacturer_address]").val();
        jsonObj.manufacturer_fax              = $("input[name=manufacturer_fax]").val();
        jsonObj.manufacturer_contact_person   = $("input[name=manufacturer_contact_person]").val();
        jsonObj.provider_name                 = $("input[name=provider_name]").val();
        jsonObj.provider_telephone            = $("input[name=provider_telephone]").val();
        jsonObj.provider_address              = $("input[name=provider_address]").val();
        jsonObj.provider_fax                  = $("input[name=provider_fax]").val();
        jsonObj.provider_contact_person       = $("input[name=provider_contact_person]").val();

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
    });

    $("#step2_to_next").click(function () {
        var jsonObj = new Object();
        jsonObj.equipment_type         = $("input[name=equipment_type]").val();
        jsonObj.equipment_description  = $("textarea[name=equipment_description]").val();
        jsonObj.product_identification = $("input[name=product_identification]").val();
        jsonObj.refNum                 = $("input[name=refNum]").val();
        jsonObj.make                   = $("input[name=make]").val();
        jsonObj.software               = $("input[name=software]").val();
        jsonObj.type_of_equipment      = $(".ui.radio.checkbox.checked").children("input").val();
        jsonObj.other                  = $("input[name=other_equipment]").val();

        var i = 0; var frequencies = [];
        $("#table_frequencies tr").each(function () {
            var obj = {};
            obj["sequence"]        = ++i;
            obj["lower_freq"]      = $(this).find("input[name=lower_mhz]").val();
            obj["upper_freq"]      = $(this).find("input[name=upper_mhz]").val();
            obj["power"]           = $(this).find("input[name=power]").val();
            obj["tolerance"]       = $(this).find("input[name=tolerance]").val();
            obj["emmission_desig"] = $(this).find("input[name=emmission_desig]").val();
            obj["freq_type"]       = $(this).find(".menu").find(".item.active.selected").html();
            frequencies.push(obj);
        });

        jsonObj.frequencies = frequencies;
        jsonObj.antenna_type        = $("#antenna_type_dropdown").find(".menu").find(".item.active.selected").html();
        jsonObj.antenna_gain        = $("input[name=antenna_gain]").val();
        jsonObj.channel             = $("input[name=channels]").val();
        jsonObj.separation          = $("input[name=separation]").val();
        jsonObj.aspect              = $("input[name=aspect]").val();
        jsonObj.compatibility       = $("input[name=compatibility]").val();
        jsonObj.security            = $("input[name=security]").val();
        jsonObj.equipment_comm_type = $("#equipment_type_dropdown").find(".menu").find(".item.active.selected").html();
        jsonObj.fee_code            = $("#fee_code_dropdown").find(".menu").find(".item.active.selected").html();

        var json = JSON.stringify(jsonObj);
        $.ajax({
            type: "POST",
            url: "/save/step-2",
            contentType: "application/json; charset=utf-8",
            data: json,
            success: function (data) {
                console.log(data);
                //navigate to next step
            },
            error: function (data) {
                console.log(data);
            }
        });
    });

    $('#step2_to_prev').click(function () {
        window.location = "/new/step-1?from=prev";
    });

    $('#new_application').click(function () {
        window.location = "/new/step-1";
    });

    $("#btn_create_account").click(function () {
        window.location.href = "/account/register";
    });



    $("#register_form").form({
        keyboardShortcuts: false,
        fields: {
            reg_username: {
                rules: [
                    {
                        type: 'empty',
                        prompt: 'A username must be provided'
                    }
                ]
            },
            reg_clients: {
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Company name required'
                    }
                ]
            },
            reg_email: {
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Email is required'
                    }
                ]
            },
            reg_firstName: {
                rules: [
                    {
                        type: 'empty',
                        prompt: 'First name required'
                    }
                ]
            },
            reg_lastName: {
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Last name required'
                    }
                ]
            },
            reg_password: {
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Password required'
                    }
                ]
            },

            reg_confirmPassword: {
                rules: [
                    {
                        type: 'empty',
                        prompt: 'Password confirmation required'
                    }
                ]
            }

        }
    });

    $("#btn_register").click(function () {

        if ($("input[name=reg_password]").val() === $("input[name=reg_confirmPassword]").val()) {

            var valid = $('#register_form').form('is valid');
            if (valid) {
                $("#btn_register").addClass("disabled loading");

                var jsonObj = new Object();
                jsonObj.username = $("input[name=reg_username]").val();
                jsonObj.password = $("input[name=reg_password]").val();
                jsonObj.first_name = $("input[name=reg_firstName]").val();
                jsonObj.last_name = $("input[name=reg_lastName]").val();
                jsonObj.email = $("input[name=reg_email]").val();
                jsonObj.company = $("input[name=reg_clients]").val();
                jsonObj.user_type = 0;
                jsonObj.clientId = $("#search_clients").data("clientid");

                var json = JSON.stringify(jsonObj);
                $.ajax({
                    type: "POST",
                    url: "http://localhost:54367/api/user/register",
                    contentType: "application/json; charset=utf-8",
                    data: json,
                    success: function (data) {
                        console.log(data);
                        $("#btn_register").removeClass("disabled loading");
                        window.location.href = "/account";
                    },
                    error: function (data) {
                        console.log(data);
                        $("#btn_register").removeClass("disabled loading");
                    }
                });
            }
            else {
                console.log("Form invalid");
            }
        }
    });


    $("#btn_login").click(function () {
        $("#btn_login").addClass("disabled loading");
        clearLoginError();

        var jsonObj = new Object();
        jsonObj.username = $("input[name=reg_username]").val();
        jsonObj.password = $("input[name=reg_password]").val();

        var json = JSON.stringify(jsonObj);
        $.ajax({
            type: "POST",
            url: "http://localhost:63616/account/login",
            contentType: "application/json; charset=utf-8",
            data: json,
            success: function (data) {
                console.log(data);
                $("#btn_login").removeClass("disabled loading");

                if (data.success === true) {
                    window.location.href = "/account";
                }
                else {
                    displayLoginError("Check your login credentials then try again.");
                }
            },
            error: function (data) {
                console.log(data);
                $("#btn_login").removeClass("disabled loading");
            }
        });
    });

    var timer;
    $("input[name=reg_username]").on('input', function (e) {
        var input = $(this);
        var val = input.val();

        if (input.data("lastval") !== val) {
            input.data("lastval", val);

            $("#input_group_username").addClass("loading");
            clearError(USERNAME);
            clearTimeout(timer);
            timer = setTimeout(function () {
                if (input.val() !== "") {
                    $.ajax({
                        type: "GET",
                        url: "http://localhost:54367/api/data/CheckName?q=" + input.val(),
                        success: function (data) {
                            console.log(data);
                            if (data === true) {
                                addError("username already taken", USERNAME);
                                $("#input_group_username").removeClass("loading");
                            }
                            else {
                                clearError(USERNAME);
                                $("#input_group_username").removeClass("loading");
                            }
                        },
                        error: function (data) {
                            console.log(data);
                        }
                    });
                }
                else {
                    clearError(USERNAME);
                    $("#input_group_username").removeClass("loading");
                }
            }, 800);
        }
    });

    $("input[name=reg_confirmPassword]").on('input', function (e) {
        var input = $(this);
        var val = input.val();

        if (input.data("lastval") !== val) {
            input.data("lastval", val);

            clearError(PASSWORD);
            clearError(CONFIRM);

            clearTimeout(timer);
            timer = setTimeout(function () {
                if ($("input[name=reg_password]").val() !== $("input[name=reg_confirmPassword]").val()) {
                    addError("Passwords do not match", PASSWORD);
                    addError("Passwords do not match", CONFIRM);
                }
                else {
                    clearError(PASSWORD);
                    clearError(CONFIRM);
                }
            }, 800);
        }
    });

    $('#sign_out').click(function () {
        $.ajax({
            type: "GET",
            url: "/account/logout",
            success: function (data) {
                console.log(data);
                window.location.href = "/account";
            },
            error: function (data) {
                console.log(data);
            }
        });
    });

    //marcopolo lib usage
    $("#search_clients").marcoPolo({
        url: "http://localhost:54367/api/data/ClientCompanyList",
        delay: 50,
        minChars: 3,
        required: true,
        formatItem: function (data, $item) {
            return data.name;
        },
        onSelect: function (data, $item) {
            $("#search_clients").val(data.name);
            $("#search_clients").attr("data-clientid", data.clientId);
        },
        formatError: function ($item, jqXHR, textStatus, errorThrown) {
            var e = errorThrown;
        }
    });

    $("#search_manufacturers").marcoPolo({
        url: "http://localhost:54367/api/data/ClientCompanyList",
        delay: 50,
        minChars: 3,
        required:true,
        formatItem: function (data, $item) {
            return data.name;
        },
        onSelect: function (data, $item) {

            if (jQuery.type(data) === "string")
            {
                $("#search_manufacturers").val(data);
            }
            else
            {
                $("#search_manufacturers").val(data.name);
                $("#search_manufacturers").attr("data-clientid", data.clientId);
                $("input[name=manufacturer_telephone]").val(data.telephone);
                $("input[name=manufacturer_address]").val(data.address);
                $("input[name=manufacturer_fax]").val(data.fax);
                $("input[name=manufacturer_contact_person]").val(data.contactPerson);
            }
        },
        formatError: function ($item, jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

    function addError(message, target) {
        var html = ' <div id=' + target + ' class="ui pointing basic red label" > ' +
            message +
            '</div >';

        switch (target) {
            case USERNAME:
                $(html).insertAfter("#input_group_username");
                break;
            case EMAIL:
                $(html).insertAfter("#input_group_email");
                break;
            case FNAME:
                $(html).insertAfter("#input_group_fname");
                break;
            case LNAME:
                $(html).insertAfter("#input_group_lname");
                break;
            case PASSWORD:
                $(html).insertAfter("#input_group_password");
                break;
            case CONFIRM:
                $(html).insertAfter("#input_group_confirm");
                break;
        }
    }

    function clearError(target) {
        switch (target) {
            case USERNAME:
                $('#' + USERNAME).remove();
                break;
            case EMAIL:
                $('#' + EMAIL).remove();
                break;
            case FNAME:
                $('#' + FNAME).remove();
                break;
            case LNAME:
                $('#' + LNAME).remove();
                break;
            case PASSWORD:
                $('#' + PASSWORD).remove();
                break;
            case CONFIRM:
                $('#' + CONFIRM).remove();
                break;
        }
    }

    function displayLoginError(message) {
        var html = '<div id="login_error" class="ui tiny negative floating message">' +
            ' <p>' + message + '</p>' +
            '</div>';

        $(html).insertAfter(".ui.stacked.segment");
    }

    function clearLoginError() {
        $('#login_error').remove();
    }

    $("body").on("click", ".ui.button.add_record", function () {
        addRecord($(this).parent().parent().parent());
    });

    $("body").on("click", ".ui.button.delete_record", function () {
        var count = $('#table_frequencies tr').length;
        if (count!==1)
        {
            var record = $(this).parent().parent().parent();
            deleteRecord(record);
        }
    });

    function addRecord(target) {
        
    $('.ui.dropdown').dropdown();
        var html =
            '<tr id="record_2">' +
            '<td class="collapsing">' +
                '<div class="ui fluid tiny icon buttons">' +
                    '<button class="ui button delete_record"><i class="minus icon"></i></button>' +
                    '<button class="ui button add_record"><i class="add icon"></i></button>' +
                '</div>' +
            '</td >' +

            '<td>' +
            '<div class="ui transparent input">' +
            ' <input type="number" placeholder="lower mhz" style="width:100%" name="lower_mhz">' +
            '</div>' +
            ' </td>' +

            '<td>' +
            '<div class="ui transparent input">' +
            '<input type="number" placeholder="upper mhz" style="width:100%" name="upper_mhz">' +
            '</div>' +
            '</td>' +

            '<td>' +
            '<div class="ui transparent input">' +
            '<input type="number" placeholder="power" style="width:100%" name="power">' +
            '</div>' +
            '</td>' +

            '<td>' +
            '<div class="ui transparent input">' +
            '<input type="number" placeholder="tolerance" style="width:100%" name="tolerance">' +
            '</div>' +
            '</td>' +

            '<td>' +
            '<div class="ui transparent input">' +
            '<input type="text" placeholder="emmission desig..." style="width:100%" name="emmission_desig">' +
            '</div>' +
            '</td>' +

            '<td>' +
            '<div class="ui fluid dropdown">' +
            '<div class="text"></div>' +
            '<i class="dropdown icon"></i>' +
            '<div class="menu">' +
            '<div class="item">R</div>' +
            '<div class="item">T</div>' +
            '</div>' +
            '</div>' +
            '</td>' +

            ' </tr>';
        $(html).insertAfter(target);
        $('.ui.dropdown').dropdown();
    }

    function deleteRecord(target)
    {
        $(target).remove();
    }

    function restore_step1()
    {
        $.ajax({
            type: "GET",
            url: "/retrieve/step-1",
            success: function (data) {
                if (data.data_present)
                {
                    $("#search_manufacturers").val(data.step1.manufacturer_name);
                    $("input[name=manufacturer_telephone]").val(data.step1.manufacturer_tel);
                    $("input[name=manufacturer_address]").val(data.step1.manufacturer_address);
                    $("input[name=manufacturer_fax]").val(data.step1.manufacturer_fax);
                    $("input[name=manufacturer_contact_person]").val(data.step1.manufacturer_contact_person);

                    $("input[name=provider_name]").val(data.step1.manufacturer_tel);
                    $("input[name=provider_telephone]").val(data.step1.manufacturer_address);
                    $("input[name=provider_address]").val(data.step1.manufacturer_fax);
                    $("input[name=provider_fax]").val(data.step1.manufacturer_contact_person);
                    $("input[name=provider_contact_person]").val(data.step1.provider_contact_person);
                }
            },
            error: function (data) {
                console.log(data);
            }
        });
    }

    function restore_step2()
    {
        $.ajax({
            type: "GET",
            url: "/retrieve/step-2",
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.log(data);
            }
        });
    }

    restore_step1();
});