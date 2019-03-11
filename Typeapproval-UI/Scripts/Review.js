$(document).ready(function () {
    function get_files(application_id) {
        $.ajax({
            type: "POST",
            url: "staff/get-file-listing/" + application_id,
            contentType: "application/json; charset=utf-8",
            data: {},
            success: function (data) {
                console.log(data);

                $(".files-container").html('');

                var tech_spec_html =
                    '<h5 class="ui dividing header">' +
                    'Technical Specifications' +
                    '</h5>' +
                    '<div id="tech_spec_files" class="ui list">' +
                    '</div>';

                var test_report_html =
                    '<h5 class="ui dividing header">' +
                    'Test Report' +
                    '</h5>' +
                    '<div id="test_report_files" class="ui list">' +
                    '</div>';

                var accreditation_html =
                    '<h5 class="ui dividing header">' +
                    'Accreditation' +
                    '</h5>' +
                    '<div id="accreditation_files" class="ui list">' +
                    '</div>';

                var letter_authorization_html =
                    '<h5 class="ui dividing header">' +
                    'Letter of Authorization' +
                    '</h5>' +
                    '<div id="letter_auth_files" class="ui list">' +
                    '</div>';

                var user_manual =
                    '<h5 class="ui dividing header">' +
                    'User Manual' +
                    '</h5>' +
                    '<div id="user_manual_files" class="ui list">' +
                    '</div';




                $(".files-container").append(tech_spec_html);
                $(".files-container").append(test_report_html);
                $(".files-container").append(accreditation_html);
                $(".files-container").append(letter_authorization_html);
                $(".files-container").append(user_manual);


                for (var i = 0; i < data.applicationFileCategories.technicalSpecifications.length; i++) {
                    var tech_spec_item =
                        '<div class="item">' +
                        '<div class="content">' +
                        '<a target="_blank" href="/staff/get/' + data.applicationFileCategories.technicalSpecifications[i].file_id + '" class="link_override_v1" style="cursor:pointer !important;"><i class="file pdf icon"></i>' + data.applicationFileCategories.technicalSpecifications[i].filename + '</a>' +
                        '</div>' +
                        '</div>';

                    $("#tech_spec_files").append(tech_spec_item);
                }

                for (var j = 0; j < data.applicationFileCategories.testReport.length; j++) {
                    var test_report_item =
                        '<div class="item">' +
                        '<div class="content">' +
                        '<a target="_blank" href="/staff/get/' + data.applicationFileCategories.testReport[j].file_id + '" class="link_override_v1" style="cursor:pointer !important;"><i class="file pdf icon"></i>' + data.applicationFileCategories.testReport[j].filename + '</a>' +
                        '</div>' +
                        '</div>';

                    $("#test_report_files").append(test_report_item);
                }

                for (var k = 0; k < data.applicationFileCategories.accreditation.length; k++) {
                    var accreditation_item =
                        '<div class="item">' +
                        '<div class="content">' +
                        '<a target="_blank" href="/staff/get/' + data.applicationFileCategories.accreditation[k].file_id + '" class="link_override_v1" style="cursor:pointer !important;"><i class="file pdf icon"></i>' + data.applicationFileCategories.accreditation[k].filename + '</a>' +
                        '</div>' +
                        '</div>';

                    $("#accreditation_files").append(accreditation_item);
                }

                for (var l = 0; l < data.applicationFileCategories.letterAuthorization.length; l++) {
                    var letter_authorization_item =
                        '<div class="item">' +
                        '<div class="content">' +
                        '<a target="_blank" href="/staff/get/' + data.applicationFileCategories.letterAuthorization[l].file_id + '" class="link_override_v1" style="cursor:pointer !important;"><i class="file pdf icon"></i>' + data.applicationFileCategories.letterAuthorization[l].filename + '</a>' +
                        '</div>' +
                        '</div>';

                    $("#letter_auth_files").append(letter_authorization_item);
                }

                for (var m = 0; m < data.applicationFileCategories.userManual.length; m++) {
                    var user_manual_item =
                        '<div class="item">' +
                        '<div class="content">' +
                        '<a target="_blank" href="/staff/get/' + data.applicationFileCategories.userManual[m].file_id + '" class="link_override_v1" style="cursor:pointer !important;"><i class="file pdf icon"></i>' + data.applicationFileCategories.userManual[m].filename + '</a>' +
                        '</div>' +
                        '</div>';

                    $("#user_manual_files").append(user_manual_item);
                }
            },
            error: function (data) {
                console.log(data);
            }
        });
    }
});