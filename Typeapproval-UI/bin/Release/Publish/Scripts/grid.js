$(document).ready(function () {
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

    $('#dashboard').click(function () {
        window.location = "/home";
    });

    $('#type_approval').click(function () {
        window.location = "/new/step-1";
    });

    $('#marine_license').click(function () {
        
    });

    $('#microwave').click(function () {
       
    });

    $('#private_radio').click(function () {
      
    });

    $('#account_settings').click(function () {
        
    });
});