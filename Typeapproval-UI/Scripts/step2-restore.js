$(document).ready(function () {

    $("input, textarea").keyup(function () {
        $('.ui.blue.button.save_app.s2').text("Save for later (Ctrl-S)");
    });

    $(window).bind('keydown', function (event) {
        if (event.ctrlKey || event.metaKey) {
            switch (String.fromCharCode(event.which).toLowerCase()) {
                case 's':
                    event.preventDefault();
                    $('.ui.blue.button.save_app.s2').trigger('click');
                    break;
                case 'f':
                    event.preventDefault();
                    break;
                case 'g':
                    event.preventDefault();
                    break;
            }
        }
    });

    $("#popup_fcc").popup();

    $('.ui.blue.button.save_app.s2').click(function () {
        $("input, textarea").blur();
            var btn_save = $(this);
            $(btn_save).addClass("disabled loading");

            var jsonObj = new Object();
            jsonObj.equipment_type = $("input[name=equipment_type]").val();
            jsonObj.equipment_description = $("textarea[name=equipment_description]").val();
            jsonObj.product_identification = $("input[name=product_identification]").val();
            jsonObj.make = $("input[name=make]").val();
          

            var i = 0; var frequencies = [];
            $("#table_frequencies tr").each(function () {
                var obj = {};
                obj["sequence"] = ++i;
                obj["lower_freq"] = $(this).find("input[name=lower_mhz]").val();
                obj["upper_freq"] = $(this).find("input[name=upper_mhz]").val();
                obj["power"] = $(this).find("input[name=power]").val();
                obj["tolerance"] = $(this).find("input[name=tolerance]").val();
                obj["emmission_desig"] = $(this).find("input[name=emmission_desig]").val();
                frequencies.push(obj);
            });

            jsonObj.frequencies = frequencies;
            jsonObj.name_of_test = $("input[name=institution]").val();
            jsonObj.country = $("input[name=country]").val();

            var json = JSON.stringify(jsonObj);
            $.ajax({
                type: "POST",
                url: "/save/step-2",
                contentType: "application/json; charset=utf-8",
                data: json,
                success: function (data) {
                    $.ajax({
                        type: "GET",
                        url: "/new/post-current-app",
                        success: function (data) {
                            if (data.responseText === "posted") {
                                addApplicationStatus("Application saved with ID: <b>" + data.app_id + "<b>");
                                $(btn_save).removeClass("disabled loading");
                                $(btn_save).html("Saved");
                            }
                            else if (data.responseText === "updated") {
                                console.log("application updated");
                                $(btn_save).removeClass("disabled loading");
                                $(btn_save).html("Saved");
                            }
                            else if (data.responseText === "session expired") {
                                window.location = "/account";
                            }
                        },
                        error: function (data) {
                            console.log(data);
                        }
                    });
                },
                error: function (data) {
                    console.log(data);
                }
            });
    });

    $("#step2_to_next").click(function () {
        if (validate())
        {
            var jsonObj = new Object();
            jsonObj.equipment_type = $("input[name=equipment_type]").val();
            jsonObj.equipment_description = $("textarea[name=equipment_description]").val();
            jsonObj.product_identification = $("input[name=product_identification]").val();
            jsonObj.make = $("input[name=make]").val();

            var i = 0; var frequencies = [];
            $("#table_frequencies tr").each(function () {
                var obj = {};
                obj["sequence"] = ++i;
                obj["lower_freq"] = $(this).find("input[name=lower_mhz]").val();
                obj["upper_freq"] = $(this).find("input[name=upper_mhz]").val();
                obj["power"] = $(this).find("input[name=power]").val();
                obj["tolerance"] = $(this).find("input[name=tolerance]").val();
                obj["emmission_desig"] = $(this).find("input[name=emmission_desig]").val();
                frequencies.push(obj);
        });

        jsonObj.frequencies = frequencies;
        jsonObj.name_of_test = $("input[name=institution]").val();
        jsonObj.country = $("input[name=country]").val();

        var json = JSON.stringify(jsonObj);
        $.ajax({
            type: "POST",
            url: "/save/step-2",
            contentType: "application/json; charset=utf-8",
            data: json,
            success: function (data) {
                console.log(data);
                window.location = "/new/step-3";
            },
            error: function (data) {
                console.log(data);
            }
        });
        }
    });

    function addApplicationStatus(html) {
        var raw = '<div class="ui attached warning message application">' +
            '<i class="info icon"></i>' +
            html +
            '</div>';

        $(raw).insertAfter('.ui.tiny.four.top.attached.steps');
    }

    $('body').on('click', '.ui.divided.selection.list .item', function () {
        $('.ui.divided.selection.list .item').removeClass('active');
        $(this).toggleClass("active");

        $.ajax({
            type: "GET",
            url: "/new/edit",
            contentType: "application/json; charset=utf-8",
            data: { "application_id": $(this).data('appid') },
            success: function (data) {
                restore_step2();
            },
            error: function (data) {
            }
        });
    });

    $.ajax({
        type: "GET",
        url: "/saved/get-documents",
        contentType: "application/json; charset=utf-8",
        data: {},
        success: function (data) {
            initializeSavedApps(data.savedApplications);
        },
        error: function (data) {
            console.log(data);
        }
    });

    function initializeSavedApps(data) {
        if (data.length > 0) {
            $('.ui.tiny.active.centered.inline.text.loader.saved-docs').remove();
            var html_main =
                '<div class="ui divided selection list">' +
                '</div >';

            $('#savedDocs').html('');
            $('#savedDocs').append(html_main);

            var html_inner = '';
            for (var i = 0; i < data.length; i++) {
                if (data[i].active === true)
                {
                    html_inner +=
                        '<div class="active item" data-appid=' + data[i].application_id + '>' +
                        '<div class="content">' +
                        '<h4 class="ui blue header">' + data[i].application_id + '</h4>' +
                        'Last update:' + data[i].last_updated + '' +
                        '</div>' +
                        '</div>';
                }
                else
                {
                    html_inner +=
                        '<div class="item" data-appid=' + data[i].application_id + '>' +
                        '<div class="content">' +
                        '<h4 class="ui blue header">' + data[i].application_id + '</h4>' +
                        'Last update:' + data[i].last_updated + '' +
                        '</div>' +
                        '</div>';
                }
            }

            $('.ui.divided.selection.list').append(html_inner);
        }
        else {
            $('.ui.tiny.active.centered.inline.text.loader.saved-docs').remove();
            $('#savedDocs').html('No saved applications found on your account.');
        }
    }

    $('.ui.fluid.selection.dropdown.fee_code').dropdown({
        onChange: function (val) {
           
        }
    });

    $('.ui.fluid.selection.dropdown.antenna').dropdown({
        onChange: function (val) {
        }
    });

    $('.ui.fluid.dropdown.freq_type').dropdown({
        onChange: function (val) {
        }
    });


    function addRecord(target, lower_freq, upper_freq, power, freq_tol, emmision_desig) {

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
            ' <input type="number" placeholder="(required)" style="width:100%" name="lower_mhz" value=' + lower_freq + '>' +
            '</div>' +
            ' </td>' +

            '<td>' +
            '<div class="ui transparent input">' +
            '<input type="number" placeholder="(required)" style="width:100%" name="upper_mhz" value=' + upper_freq + '>' +
            '</div>' +
            '</td>' +

            '<td>' +
            '<div class="ui transparent input">' +
            '<input type="number" placeholder="" style="width:100%" name="power" value=' + power + '>' +
            '</div>' +
            '</td>' +

            '<td>' +
            '<div class="ui transparent input">' +
            '<input type="number" placeholder="" style="width:100%" name="tolerance" value=' + freq_tol + '>' +
            '</div>' +
            '</td>' +

            '<td>' +
            '<div class="ui transparent input">' +
            '<input type="text" placeholder="" style="width:100%" name="emmission_desig" value=' + emmision_desig + '>' +
            '</div>' +
            '</td>';

        html+= '</tr>';
        $(target).append(html);
    }

    function restore_step2()
    {
        $.ajax({
            type: "GET",
            url: "/retrieve/step-2",
            success: function (data) {
                if (data.data_present)
                {
                    $('input[name=equipment_type]').val(data.step2.equipment_type);
                    $("textarea[name=equipment_description]").val(data.step2.equipment_description);
                    $("input[name=product_identification]").val(data.step2.product_identification);
                    $("input[name=make]").val(data.step2.make);
                   
                    var target = $('#table_frequencies');
                    if (data.step2.frequencies.length > 0) {
                        $(target).find("tr").remove();
                    }
                    else
                    {
                        $(target).find("tr").remove();
                        addRecord(target, "", "", "", "", "");
                    }


                    for (var i = 0; i < data.step2.frequencies.length; i++)
                    {
                        var lower_freq      = data.step2.frequencies[i].lower_freq;
                        var upper_freq      = data.step2.frequencies[i].upper_freq;
                        var power           = data.step2.frequencies[i].power;
                        var tolerance       = data.step2.frequencies[i].tolerance;
                        var emmission_desig = data.step2.frequencies[i].emmission_desig;
                        addRecord(target, lower_freq, upper_freq, power, tolerance, emmission_desig);
                    }

                    $('.ui.fluid.dropdown.freq_type').dropdown({
                        onChange: function (val) {
                        }
                    });

                    $("input[name=institution]").val(data.step2.name_of_test);
                    $("input[name=country]").val(data.step2.country);
                   

                    if (data.step2.application_id !== '')
                    {
                        if ($('.ui.small.attached.warning.message.application').length === 0) {
                            var attatched_header =
                                '<div class="ui small attached warning message application">' +
                                '<i class="info icon"></i>' +
                                ' Application saved with ID: <b>' + data.step2.application_id + '</b>' +
                                '</div>';

                            $(attatched_header).insertAfter('.ui.tiny.three.top.attached.steps');
                        }
                        else {
                            var html =
                                '<i class="info icon"></i>' +
                                'Application saved with ID: <b>' + data.step2.application_id + '</b>';

                            $('.ui.small.attached.warning.message.application').html(html);
                        }
                    }

                }
            },
            error: function (data) {
                console.log(data);
            }
        });
    }

    function validate()
    {
        var form_valid = true;


        if ($("input[name=equipment_type]").val() === '')
        {
            $("input[name=equipment_type]").addClass('input-error');
            form_valid = false;
        }

        if ($("textarea[name=equipment_description]").val() === '')
        {
            $("textarea[name=equipment_description]").addClass('input-error');
            form_valid = false;
        }

        if ($("input[name=product_identification]").val() === '')
        {
            $("input[name=product_identification]").addClass('input-error');
            form_valid = false;
        }

        if ($("input[name=make]").val() === '')
        {
            $("input[name=make]").addClass('input-error');
            form_valid = false;
        }

        $("#table_frequencies tr").each(function () {
          
            if ($(this).find("input[name=lower_mhz]").val() === '')
            {
                $(this).find("input[name=lower_mhz]").addClass('input-error');
                form_valid = false;
            }

            if ($(this).find("input[name=upper_mhz]").val() === '')
            {
                $(this).find("input[name=upper_mhz]").addClass('input-error');
                form_valid = false;
            } 
        });


        if ($('input[name=institution]').val() === '')
        {
            $('input[name=institution]').addClass('input-error');
            form_valid = false;
        }

        if ($('input[name=country]').val() === '') {
            $('input[name=country]').addClass('input-error');
            form_valid = false;
        }

        return form_valid;
    }

    restore_step2();
});

