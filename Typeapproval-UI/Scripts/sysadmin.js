$(document).ready(function () {
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

    $("#email-setting").click(function () {
        $("#email_setting").modal({
            closable: false,
            onApprove: function () {
                if (email_saved) {
                    email_saved = false;
                    return true;
                }
                else
                {
                    remove_email_msg();
                    var email = $("#setting_email").val();
                    var password = $("#setting_password").val();
                    var test_email = $("#email_test").is(":checked");

                    if (email !== '') {
                        if (password !== '') {
                            set_email(email, password, test_email);
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
                    email_saved = false;
                }, 500);
                return true;
            }
        }).modal('show');
    });

    function set_email(email, password, email_check)
    {
        $("#btn-email-update").addClass("disabled loading");
        var jsonObj = new Object();
        jsonObj.email = email;
        jsonObj.password = password;
        jsonObj.test_send = email_check;

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
});