$(document).ready(function () {
    $("#email-setting").click(function () {
        $("#email_setting").modal({
            closable: false,
            onApprove: function () {
               
                return false;
            },
            onDeny: function () {
                setTimeout(function () {
                   
                }, 500);
                return true;
            }
        }).modal('show');
    });
});