$(document).ready(function () {

    $('.ui.dropdown').dropdown();
    $('.ui.dropdown').popup();
    $('.ui.small.red.label').popup();
    $('.header.item').popup();
    $('.ui.sticky').sticky({
        context: '#context'
    });
    $('.ui.radio.checkbox').checkbox();
    $('#step1_to_next').click(function () {
        window.location = "/new/step-2";
    });
    $('#step2_to_prev').click(function () {
        window.location = "/new/step-1";
    });
    $('#new_application').click(function () {
        window.location = "/new/step-1";
    });

    $("#btn_create_account").click(function () {
        window.location.href = "/account/register";
    });

    $("#register_form").form({
        fields: {
            name: {
                identifier: 'reg_username',
                rules: [
                    {
                        type: 'empty',
                        prompt: 'A username must be provided'
                    }
                ]
            }
        }
    });

    $("#btn_register").click(function () {
      
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

});