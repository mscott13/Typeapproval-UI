$(document).ready(function () {

    $('#btn-delete-user').popup({
    });
    $('#btn-edit-user').popup();
    $('#btn-reset-user').popup();
    $("#role_dropdown").dropdown();

    var current_record = null;
    var email_saved = false;

    $("#btn-reset-user").click(function () {
        if (current_record !== null) {
            var user = $(current_record).children().eq(1).text().trim();
            $("#reset_password .header").html("Reset Password (" + user + ")");
            $("#reset_password").modal({
                closable: false,
                onApprove: function () {
                    
                    var new_psw = $("#reset_new_psw").val();
                    var confirm = $("#reset_confirm_psw").val();

                    if (new_psw === '' && confirm === '') {
                        $("#reset_new_psw").val('genrerate_rand');
                        $("#reset_new_psw").val('genrerate_rand');
                        $("#reset_confirm_psw").val('');
                        reset_psw(user, "");
                    }
                    else
                    {
                        if (new_psw !== '') {
                            if (confirm !== '') {
                                if (new_psw === confirm) {
                                    reset_psw(user, new_psw);
                                }
                                else {
                                    alert("Passwords do not match");
                                }
                            }
                            else {
                                alert("Please confirm the new password");
                            }
                        }
                        else {
                            alert("Please enter a new password");
                        }
                    }
                    return false;
                },
                onDeny: function () {
                    setTimeout(function () {
                        $("#reset_new_psw").val('');
                        $("#reset_confirm_psw").val('');
                        $("#reset_password .header").html("Reset Password");
                    }, 500);
                    return true;
                }
            }).modal('show');
        }
    });

    function reset_psw(user, new_psw)
    {
        $("#btn-resetpsw-change").addClass("disabled loading");
        var jsonObj = new Object();
        jsonObj.username = user;
        jsonObj.new_password = new_psw;

        $.ajax({
            type: "POST",
            url: "/sysadmin/reset",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(jsonObj),
            success: function (data) {

                $("#btn-resetpsw-change").removeClass("disabled loading");
                alert("Password was reset sucessfully");
                $("#reset_password").modal('hide');
                $("#reset_password .header").html("Reset Password");

                setTimeout(function () {
                    $("#reset_new_psw").val('');
                    $("#reset_confirm_psw").val('');
                }, 500);
            },
            error: function (data) {
                console.log(data);
                $("#btn-resetpsw-change").removeClass("disabled loading");
            }
        });
    }

    $('body').on('change', 'input[type="checkbox"]', function () {

        current_record = $(this).parent().parent();
        $('.check_task').parent().parent().removeClass('row_hover');
        $('input[type="checkbox"]').not(this).prop('checked', false);

        if ($(this).is(":checked")) {
            $(current_record).addClass("row_hover");
        }
        else {
            $(current_record).removeClass("row_hover");
            current_record = null;
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
                    return true;
                }
                else {
                    remove_email_msg();
                    var email = $("#setting_email").val();
                    var company = $("#setting_company").val();

                    if (email !== '') {
                        if (company !== '') {
                            set_email(email, company);
                        }
                        else {
                            add_email_msg('Please enter a company name.', 'error');
                        }
                    }
                    else {
                        add_email_msg('Please provide an email address.', 'error');
                    }
                    return false;
                }
            },
            onDeny: function () {
                setTimeout(function () {
                    $("#setting_email").val('');
                    $("#setting_company").val('');
                    email_saved = false;
                }, 500);
                return true;
            }
        }).modal('show');
    });

    function create_user(username, first_name, last_name, email, role, password, send_credentials)
    {
        $("#btn-create-user").addClass("disabled loading");
        var jsonObj = new Object();
        jsonObj.username = username;
        jsonObj.first_name = first_name;
        jsonObj.last_name = last_name;
        jsonObj.password = password;
        jsonObj.email = email;
        jsonObj.user_role = role;
        jsonObj.send_credentials = send_credentials;

        $.ajax({
            type: "POST",
            url: "/sysadmin/createuser",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(jsonObj),
            success: function (data) {
                console.log(data);
                add_user_record(data.userDetails.username, data.userDetails.fullname, data.userDetails.user_type, data.userDetails.email, data.userDetails.created_date_str, data.userDetails.last_detected_activity_str);
                $("#create_user").modal('hide');
                $("#btn-create-user").removeClass("disabled loading");

                setTimeout(function () {

                    $("#setting_email").val('');
                    $("#setting_password").val('');
                    $("#setting_host").val('');
                    $("#setting_port").val('');
                    remove_cuser_msg();
                }, 500);
                
            },
            error: function (data) {
                $("#btn-create-user").removeClass("disabled loading");
                console.log(data);
            }
        });
    }

    function add_user_record(username, name, user_type, email, created_date, last_detected_activity)
    {
        var html =
            '<tr>' +
            '<td>' +'<input style="margin-right: 8px;" type="checkbox" class="check_task" /> '+'</td>'+
            '<td>' + username + '</td>' +
            '<td>' + name + '</td>' +
            '<td>' + last_detected_activity + '</td>' +
            '<td>' + user_type + '</td>' +
            '<td>' + email + '</td>' +
            '<td>' + created_date + '</td>' +
            '</tr>';
        $("#staff-task-records").prepend(html);
    }

    function set_email(email, company) {
        $("#btn-email-update").addClass("disabled loading");
        var jsonObj = new Object();
        jsonObj.email = email;
        jsonObj.company_name = company;

        $.ajax({
            type: "POST",
            url: "/sysadmin/setemail",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(jsonObj),
            success: function (data) {
                console.log(data);
                if (data.result === "email_saved") {
                    $("#btn-email-update").removeClass("disabled loading");
                    $("#btn-email-update").text("Finish");
                    add_email_msg('Email saved, please login to your email account and verify that you have recieved a TEST MESSAGE.', 'ok');
                    email_saved = true;
                }
                else {
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