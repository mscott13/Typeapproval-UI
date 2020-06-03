$(document).ready(function () {

    $("#reset-password").click(function () {
        window.location = "/account/reset";
    });

    $("#btn_reset").click(function () {
        $("#btn_reset").addClass("disabled loading");
        var jsonObj = new Object();
        jsonObj.username = $("input[name=reset_username]").val();
       
        var json = JSON.stringify(jsonObj);
        $.ajax({
            type: "POST",
            url: "http://server-erp2.sma.gov.jm:1786/api/user/ResetPassword",
            contentType: "application/json; charset=utf-8",
            data: json,
            success: function (data) {
                $("#btn_reset").removeClass("disabled loading");
                alert("Password reset. Check your email for your new credentials.");
                window.location = "/account";
            },
            error: function (data) {
                $("#btn_reset").removeClass("disabled loading");
                alert("Could not fulfill that request.");
            }
        });
    });

    $('.ui.dropdown').popup();
    $('.ui.dropdown').popup();
    $('.ui.small.red.label').popup();
    $('#sidebar').sidebar('show');
    $('.header.item').popup();

    $('.ui.sticky._form').sticky({
        context: '#context'
    });

    $('.ui.sticky.saved-docs').sticky({
        observeChanges: true,
        context: '.context'
    });

    $('.ui.top.left.pointing.dropdown.item').dropdown({
        onChange: function (val) {

        }
    });

    $('#btn_new_application').click(function () {
        window.location = '/new/step-1';
    });

    $(".ui.selection.dropdown.clients").dropdown();

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

                        response.results[type].results.push({
                            title: item.title,
                            description: item.description,
                            url: item.url
                        });
                    });
                    return response;
                },
                url: '//server-erp2.sma.gov.jm:1786/api/search/allcategories?q={query}'
            }
        });

    $('.ui.button.cancel_app').click(function () {
        console.log("cancelling application...");

        $('.ui.basic.modal.cancel-confirm')
            .modal({
                closable: false
            }).modal('show');
    });


    $('#step2_to_prev').click(function () {
        window.location = "/new/step-1?from=step-2";
    });

    $('#step3_to_prev').click(function () {
        window.location = "/new/step-2?from=step-3";
    });

    $('#new_application').click(function () {
        window.location = "/new/step-1";
    });

    $("#btn_create_account").click(function () {
        window.location.href = "/account/register";
    });

    $('#btn_add_documents').click(function () {
        $('#upload_files').trigger('click');
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
            url: "/account/login",
            contentType: "application/json; charset=utf-8",
            data: json,
            success: function (data) {
                console.log(data);

                if (data.success === true) {
                    switch (data.user_type) {
                        case 0:
                            window.location.href = "/grid";
                            break;
                        case 1:
                            window.location.href = "/staff";
                            break;
                        case 9:
                            window.location.href = "/admin";
                            break;
                        case 10:
                            window.location.href = "/systemadmin";
                            break;
                    }
                }
                else {
                    $("#btn_login").removeClass("disabled loading");
                    displayLoginError("Authentication failed. Check your login credentials then try again.");
                    $("input[name=reg_password]").val("");
                }
            },
            error: function (data) {
                console.log(data);
                $("#btn_login").removeClass("disabled loading");
            }
        });
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

    $("#search_clients").marcoPolo({
        url: "http://server-erp2.sma.gov.jm:1786/api/data/ClientCompanyList",
        delay: 50,
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
        url: "http://server-erp2.sma.gov.jm:1786/api/data/ManufacturersDetail",
        delay: 50,
        required: true,
        formatItem: function (data, $item) {
            return data.name;
        },
        onSelect: function (data, $item) {

            if (jQuery.type(data) === "string") {
                $("#search_manufacturers").val(data);
            }
            else {
                $("#search_manufacturers").val(data.name);
                $("#search_manufacturers").attr("data-clientid", "0");
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

  

    function displayLoginError(message) {
        var html = '<div id="login_error" class="ui small red floating message">' +
            ' <p>' + message + '</p>' +
            '</div>';

        $(html).insertAfter(".ui.stacked.segment");
    }

    function clearLoginError() {
        $('#login_error').remove();
    }

    $("body").on("click", ".ui.button.add_record", function () {
        addRecord($('#table_frequencies'));
    });

    $("body").on("click", ".ui.button.delete_record", function () {
        var count = $('#table_frequencies tr').length;
        if (count !== 1) {
            var record = $(this).parent().parent().parent();
            deleteRecord(record);
        }
        else {
            var _record = $(this).parent().parent().parent();
            deleteRecord(_record);
            addRecord($('#table_frequencies'));
        }
    });

    function addRecord(target) {

        var html =
            '<tr>' +
            '<td class="collapsing">' +
            '<div class="ui fluid tiny icon buttons">' +
            '<button class="ui button delete_record"><i class="minus icon"></i></button>' +
            '<button class="ui button add_record"><i class="add icon"></i></button>' +
            '</div>' +
            '</td >' +

            '<td>' +
            '<div class="ui transparent input">' +
            ' <input type="number" style="width:100%" name="lower_mhz">' +
            '</div>' +
            ' </td>' +

            '<td>' +
            '<div class="ui transparent input">' +
            '<input type="number"  style="width:100%" name="upper_mhz">' +
            '</div>' +
            '</td>' +

            '<td>' +
            '<div class="ui transparent input">' +
            '<input type="number" placeholder="" style="width:100%" name="power">' +
            '</div>' +
            '</td>' +

            '<td>' +
            '<div class="ui transparent input">' +
            '<input type="number" placeholder="" style="width:100%" name="tolerance">' +
            '</div>' +
            '</td>' +

            '<td>' +
            '<div class="ui transparent input">' +
            '<input type="text" placeholder="" style="width:100%" name="emmission_desig">' +
            '</div>' +
            '</td>' +
            ' </tr>';
        $(target).append(html);
        $('.ui.dropdown').dropdown();
    }

    function deleteRecord(target) {
        $(target).remove();
    }
});