$(document).ready(function () {

    $('#btn-delete-user').popup({
    });
    $('#btn-edit-user').popup();
    $('#btn-reset-user').popup();
    $("#role_dropdown").dropdown();

    var current_record = null;
    var email_saved = false;

    $('body').on('change', 'input[type="checkbox"]', function () {

        current_record = $(this).parent().parent();
        $('.check_task').parent().parent().removeClass('row_hover');
        $('input[type="checkbox"]').not(this).prop('checked', false);

        if ($(this).is(":checked")) {
            $(current_record).addClass("row_hover");
        }
        else {
            enable_disable_apply(target_table, 'disable');
            $(current_record).removeClass("row_hover");
        }
    });

    $("#btn-new-user").click(function () {
        $("#create_user").modal({
            closable: false,
            onApprove: function () {
                remove_cuser_msg();
                var username = $("#u_username").val();
                var fname = $("#u_fname").val();
                var lname = $("#u_lname").val();
                var email = $("#u_email").val();
                var password = $("#u_password").val();
                var confirm = $("#u_confirm").val();
                var send_credentials = $("#send_credentials").is(':checked');
                var role = $("#role_dropdown").parent().find(".menu .item.active.selected").data("value");

                if (username !== '') {
                    if (fname !== '') {
                        if (lname !== '') {
                            if (email !== '') {
                                if (password !== '') {
                                    if (confirm !== '') {
                                        if (role !== undefined) {
                                            if (password === confirm) {
                                                create_user(username, fname, lname, email, role, password, send_credentials);
                                            }
                                            else
                                            {
                                                add_cuser_msg('Passwords do not match', 'error');
                                            }
                                        }
                                        else
                                        {
                                            add_cuser_msg('A role is required', 'error');
                                        }
                                    }
                                    else
                                    {
                                        add_cuser_msg('Confirm password', 'error');
                                    }
                                }
                                else
                                {
                                    add_cuser_msg('Please enter a password', 'error');
                                }
                            }
                            else
                            {
                                add_cuser_msg('Please enter an email address', 'error');
                            }
                        }
                        else
                        {
                            add_cuser_msg('Please enter a last name', 'error');
                        }
                    }
                    else
                    {
                        add_cuser_msg('Please enter first name', 'error');
                    }
                }
                else
                {
                    add_cuser_msg('Please enter a username', 'error');
                }
                return false;
            },
            onDeny: function () {
                setTimeout(function () {
                    remove_cuser_msg();
                    $("#u_username").val('');
                    $("#u_fname").val('');
                    $("#u_lname").val('');
                    $("#u_email").val('');
                    $("#u_password").val('');
                    $("#u_confirm").val('');
                }, 500);
                return true;
            }
        }).modal('show');
    });

    $("#email-setting").click(function () {
        $("#email_setting").modal({
            closable: false,
            onApprove: function () {
                if (email_saved) {
                    email_saved = false;

                    setTimeout(function () {
                        $("#setting_email").val('');
                        $("#setting_password").val('');
                        $("#setting_host").val('');
                        $("#setting_port").val('');
                        $("#btn-email-update").html('Udate <i class ="checkmark icon"></i >');
                        $('#use_ssl').prop('checked', false);
                        remove_email_msg();
                        email_saved = false;
                    }, 500);
                    
                    return true;
                }
                else
                {
                    remove_email_msg();
                    var email = $("#setting_email").val();
                    var password = $("#setting_password").val();
                    var host = $("#setting_host").val();
                    var port = $("#setting_port").val();
                    var use_ssl = $("#use_ssl").is(":checked");

                    if (email !== '') {
                        if (password !== '')
                        {
                            if (host !== '')
                            {
                                if (port !== '')
                                {
                                    set_email(email, password, host, port, use_ssl);
                                }
                                else
                                {
                                    add_email_msg('Enter a port number', 'error');
                                }
                            }
                            else
                            {
                                add_email_msg('Please provide a smtp server host.', 'error');
                            }
                        }
                        else {
                            add_email_msg('Please enter a password.', 'error');
                        }
                    }
                    else {
                        add_email_msg('Please provide an email.', 'error');
                    }
                    return false;
                }
            },
            onDeny: function () {
                
                setTimeout(function () {
                    
                    $("#setting_email").val('');
                    $("#setting_password").val('');
                    $("#setting_host").val('');
                    $("#setting_port").val('');
                    email_saved = false;
                }, 500);
                return true;
            }
        }).modal('show');
    });

    function create_user(username, first_name, last_name, email, role, password, send_credentials)
    {
        $("#btn-email-update").addClass("disabled loading");
        var jsonObj = new Object();
        jsonObj.username = username;
        jsonObj.first_name = first_name;
        jsonObj.last_name = last_name;
        jsonObj.password = password;
        jsonObj.email = email;
        jsonObj.user_type = role;
        jsonObj.send_credentials = send_credentials;

        $.ajax({
            type: "POST",
            url: "/sysadmin/createuser",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(jsonObj),
            success: function (data) {
                console.log(data);

                $("#email_setting").modal('hide');
                setTimeout(function () {

                    $("#setting_email").val('');
                    $("#setting_password").val('');
                    $("#setting_host").val('');
                    $("#setting_port").val('');
                    email_saved = false;
                }, 500);
                
            },
            error: function (data) {
                $("#btn-email-update").removeClass("disabled loading");
                console.log(data);
                $("#btn-email-update").removeClass("disabled loading");
            }
        });
    }

    function set_email(email, password, host, port, use_ssl)
    {
        $("#btn-email-update").addClass("disabled loading");
        var jsonObj = new Object();
        jsonObj.email = email;
        jsonObj.password = password;
        jsonObj.host = host;
        jsonObj.port = port;
        jsonObj.use_ssl = use_ssl;

        $.ajax({
            type: "POST",
            url: "/sysadmin/setemail",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(jsonObj),
            success: function (data) {
                console.log(data);
                if (data.result === "email_saved") {
                    $("#btn-email-update").removeClass("disabled loading");
                    $("#btn-email-update").html('Finish <i class ="checkmark icon"></i >');
                    add_email_msg('Email saved, please login to your email account and verify that you have recieved a TEST MESSAGE.', 'ok');
                    email_saved = true;
                }
                else
                {
                    add_email_msg('Email was not saved. an error occured...', 'error');
                    email_saved = false;
                }
            },
            error: function (data) {
                $("#btn-email-update").removeClass("disabled loading");
                console.log(data);
            }
        });
    }

    function remove_email_msg() {
        $(".email_msg").remove();
    }

    function add_email_msg(message, status) {
        var html = "";
        switch (status)
        {
            case 'error':
                 html =
                    '<div class="ui red tiny message email_msg">' +
                    '<ul class="list">' +
                    '<li>' + message + '</li>' +
                    '</ul>' +
                    '</div>';
                break;
            case 'ok':
                 html =
                    '<div class="ui green tiny message email_msg">' +
                    '<ul class="list">' +
                    '<li>' + message + '</li>' +
                    '</ul>' +
                    '</div>';
                break;
            default:
                html =
                    '<div class="ui  tiny message email_msg">' +
                    '<ul class="list">' +
                    '<li>' + message + '</li>' +
                    '</ul>' +
                    '</div>';

        }

        $(html).insertAfter("#email-form");
    }

    function remove_cuser_msg() {
        $(".cuser_msg").remove();
    }

    function add_cuser_msg(message, status) {
        var html = "";
        switch (status) {
            case 'error':
                html =
                    '<div class="ui red tiny message cuser_msg">' +
                    '<ul class="list">' +
                    '<li>' + message + '</li>' +
                    '</ul>' +
                    '</div>';
                break;
            case 'ok':
                html =
                    '<div class="ui green tiny message email_msg">' +
                    '<ul class="list">' +
                    '<li>' + message + '</li>' +
                    '</ul>' +
                    '</div>';
                break;
            default:
                html =
                    '<div class="ui  tiny message email_msg">' +
                    '<ul class="list">' +
                    '<li>' + message + '</li>' +
                    '</ul>' +
                    '</div>';

        }

        $(html).insertAfter("#user-form");
    }
});