$(document).ready(function () {

    $('#sign_out').click(function () {
        $.ajax({
            type: "POST",
            url:"account/logout"
        });
    });
});