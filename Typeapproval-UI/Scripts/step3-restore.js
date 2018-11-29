$(document).ready(function () {

    var json_form; 

    $.ajax({
        type: "GET",
        url: "/retrieve/step-3",
        success: function (data) {
            json_form = data;
        },
        error: function (data) {
            console.log(data);
        }
    });

    $('body').on('change', '#upload_files', function () {
        var files = ($('#upload_files'))[0].files;
    });

    $('#step3_to_finish').click(function () {
        //save completed form if everything is in place. direct to sample invoice screen..
    });

});