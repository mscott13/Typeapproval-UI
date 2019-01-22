$(document).ready(function () {

  

    $('.ui.blue.button.save_app.s2').click(function () {
            var btn_save = $(this);
            $(btn_save).addClass("disabled loading");

            var jsonObj = new Object();
            jsonObj.equipment_type = $("input[name=equipment_type]").val();
            jsonObj.equipment_description = $("textarea[name=equipment_description]").val();
            jsonObj.product_identification = $("input[name=product_identification]").val();
            jsonObj.refNum = $("input[name=refNum]").val();
            jsonObj.make = $("input[name=make]").val();
            jsonObj.software = $("input[name=software]").val();
            jsonObj.type_of_equipment = $(".ui.radio.checkbox.checked").children("input").val();
            jsonObj.other = $("input[name=other_equipment]").val();

            var i = 0; var frequencies = [];
            $("#table_frequencies tr").each(function () {
                var obj = {};
                obj["sequence"] = ++i;
                obj["lower_freq"] = $(this).find("input[name=lower_mhz]").val();
                obj["upper_freq"] = $(this).find("input[name=upper_mhz]").val();
                obj["power"] = $(this).find("input[name=power]").val();
                obj["tolerance"] = $(this).find("input[name=tolerance]").val();
                obj["emmission_desig"] = $(this).find("input[name=emmission_desig]").val();
                obj["freq_type"] = $(this).find(".menu").find(".item.active.selected").html();
                frequencies.push(obj);
            });

            jsonObj.frequencies = frequencies;
            jsonObj.antenna_type = $("input[name=antenna_type]").val();
            jsonObj.antenna_gain = $("input[name=antenna_gain]").val();
            jsonObj.channel = $("input[name=channel]").val();
            jsonObj.separation = $("input[name=separation]").val();
            jsonObj.additional_info = $("textarea[name=additional_information]").val();
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
        jsonObj.refNum = $("input[name=refNum]").val();
        jsonObj.make = $("input[name=make]").val();
        jsonObj.software = $("input[name=software]").val();
        jsonObj.type_of_equipment = $(".ui.radio.checkbox.checked").children("input").val();
        jsonObj.other = $("input[name=other_equipment]").val();

        var i = 0; var frequencies = [];
        $("#table_frequencies tr").each(function () {
            var obj = {};
            obj["sequence"] = ++i;
            obj["lower_freq"] = $(this).find("input[name=lower_mhz]").val();
            obj["upper_freq"] = $(this).find("input[name=upper_mhz]").val();
            obj["power"] = $(this).find("input[name=power]").val();
            obj["tolerance"] = $(this).find("input[name=tolerance]").val();
            obj["emmission_desig"] = $(this).find("input[name=emmission_desig]").val();
            obj["freq_type"] = $(this).find(".menu").find(".item.active.selected").html();
            frequencies.push(obj);
        });

        jsonObj.frequencies = frequencies;
        jsonObj.antenna_type = $("input[name=antenna_type]").val();
        jsonObj.antenna_gain = $("input[name=antenna_gain]").val();
        jsonObj.channel = $("input[name=channel]").val();
        jsonObj.separation = $("input[name=separation]").val();
        jsonObj.additional_info = $("textarea[name=additional_information]").val();
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

        $(raw).insertAfter('.ui.tiny.three.top.attached.steps');
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

    $('.ui.fluid.selection.dropdown.equipment').dropdown({
        onChange: function (val) {
            set_fee_code_options(val);
        }
    });

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

    $('.ui.radio.checkbox.equipment_types').checkbox({
        onChecked: function ()
        {
            if ($(this).val() === 'Other')
            {
                $("input[name=other_equipment]").val('');
                $("input[name=other_equipment]").parent().removeClass('disabled');
            }
            else
            {
                $("input[name=other_equipment]").val('');
                $("input[name=other_equipment]").parent().addClass('disabled');
            }
        }
    });

    function addRecord(target, lower_freq, upper_freq, power, freq_tol, emmision_desig, freq_type) {

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
            ' <input type="number" placeholder="lower mhz" style="width:100%" name="lower_mhz" value=' + lower_freq + '>' +
            '</div>' +
            ' </td>' +

            '<td>' +
            '<div class="ui transparent input">' +
            '<input type="number" placeholder="upper mhz" style="width:100%" name="upper_mhz" value=' + upper_freq + '>' +
            '</div>' +
            '</td>' +

            '<td>' +
            '<div class="ui transparent input">' +
            '<input type="number" placeholder="power" style="width:100%" name="power" value=' + power + '>' +
            '</div>' +
            '</td>' +

            '<td>' +
            '<div class="ui transparent input">' +
            '<input type="number" placeholder="tolerance" style="width:100%" name="tolerance" value=' + freq_tol + '>' +
            '</div>' +
            '</td>' +

            '<td>' +
            '<div class="ui transparent input">' +
            '<input type="text" placeholder="emmission desig..." style="width:100%" name="emmission_desig" value=' + emmision_desig + '>' +
            '</div>' +
            '</td>';

        if (freq_type === 'R') {
            html +=

                '<td>' +
                '<div class="ui fluid dropdown freq_type">' +
                '<div class="text">' + freq_type + '</div>' +
                '<i class="dropdown icon"></i>' +
                '<div class="menu">' +
                '<div class="item active selected">R</div>' +
                '<div class="item">T</div>' +
                '</div>' +
                '</div>' +
                '</td>';
        }
        else if (freq_type === 'T') {
            html +=

                '<td>' +
                '<div class="ui fluid dropdown freq_type">' +
                '<div class="text">' + freq_type + '</div>' +
                '<i class="dropdown icon"></i>' +
                '<div class="menu">' +
                '<div class="item">R</div>' +
                '<div class="item active selected">T</div>' +
                '</div>' +
                '</div>' +
                '</td>';
        }
        else
        {
            html +=

            '<td>' +
                '<div class="ui fluid dropdown freq_type">' +
                '<div class="text"></div>' +
                '<i class="dropdown icon"></i>' +
                '<div class="menu">' +
                '<div class="item">R</div>' +
                '<div class="item">T</div>' +
                '</div>' +
                '</div>' +
                '</td>';
        }

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
                    $("input[name=refNum]").val(data.step2.ref_num);
                    $("input[name=make]").val(data.step2.make);
                    $("input[name=make]").val(data.step2.make);
                    $("input[name=software]").val(data.step2.software);
                    $("input[name=antenna_type]").val(data.step2.antenna_type);
                    set_equipment_type_checked(data.step2.equipment_types, data.step2.other_equipment);

                    var target = $('#table_frequencies');
                    if (data.step2.frequencies.length > 0)
                    {
                        $(target).find("tr").remove();
                    }

                    for (var i = 0; i < data.step2.frequencies.length; i++)
                    {
                        var lower_freq      = data.step2.frequencies[i].lower_freq;
                        var upper_freq      = data.step2.frequencies[i].upper_freq;
                        var power           = data.step2.frequencies[i].power;
                        var tolerance       = data.step2.frequencies[i].tolerance;
                        var emmission_desig = data.step2.frequencies[i].emmission_desig;
                        var freq_type       = data.step2.frequencies[i].freq_type;

                        addRecord(target, lower_freq, upper_freq, power, tolerance, emmission_desig, freq_type);
                    }

                    $('.ui.fluid.dropdown.freq_type').dropdown({
                        onChange: function (val) {
                        }
                    });

                    $("input[name=antenna_gain]").val(data.step2.antenna_gain);
                    $("input[name=channel]").val(data.step2.channels);
                    $("input[name=separation]").val(data.step2.separation);
                    $("textarea[name=additional_information]").val(data.step2.additional_info);
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

    function set_equipment_type_checked(type, other)
    {
        var radio_options = $('#equipent_types_handle .ui.radio.checkbox');
        $.each(radio_options, function (i, object) {
            if ($(object).find("input").val() === type) {
                $(object).checkbox('check');
                console.log("checked: " + type);

                if (type === 'Other')
                {
                    $("input[name=other_equipment]").val(other);
                    $("input[name=other_equipment]").removeClass('disabled');
                }
            }
        });
    }

    function set_equipment_comm_type(type)
    {
        var comm_options = $('#equipment_type_dropdown .menu .item');
        $.each(comm_options, function (i, object) {
            if ($(object).text() === type)
            {
                var span_text = $(object).parent().parent().find(".text");
                $(object).addClass('active selected');

                $(span_text).text(type);
                $(span_text).removeClass('default');

            }
            else
            {
                console.log($(object).text());
            }
        });
    }

    function set_fee_code_type(type)
    {
        var fee_code_options = $('#fee_code_dropdown .menu .item');
        $.each(fee_code_options, function (i, object) {
            if ($(object).text() === type) {
                var span_text = $(object).parent().parent().find(".text");
                $(object).addClass('active selected');

                $(span_text).text(type);
                $(span_text).removeClass('default');
            }
            else
            {
                console.log($(object).text());
            }
        });
    }

    function set_fee_code_options(type)
    {
        var fee_code_dropdown = $('.ui.fluid.selection.dropdown.fee_code');
        var span_text = $(fee_code_dropdown).find('.text');
        var menu_holder = $(fee_code_dropdown).find('.menu');

        var html = '';

        switch (type)
        {
            case "pabx":
                html =
                    '<div class="item">PABX with less than 24 ports</div>' +
                    '<div class="item">PABX with than 128-256 ports</div>' +
                    '<div class="item">PABX with than 24-48 ports</div>' +
                    '<div class="item">PABX with than 48-128 ports</div>' +
                    '<div class="item">PABX with more than 256 ports</div>';
                break;
            case "satellite systems":
                html =
                    '<div class="item">Satellite Earth Station</div>' +
                    '<div class="item">VSAT Terminals</div>';
                break;
            case "radio systems":
                html =
                    '<div class="item">Low Power Devices</div>' +
                    '<div class="item">Radio Interface Equipment</div>' +
                    '<div class="item">Radio Transmitters</div>' +
                    '<div class="item">Wireless MicroPhones</div>';
                break;
            case "telecomms equipment":
                html =
                    '<div class="item">Answering Machines</div>' +
                    '<div class="item">Basic Telephones</div>' +
                    '<div class="item">Cordless Telephones</div>' +
                    '<div class="item">Dealership</div>' +
                    '<div class="item">Facsimile</div>' +
                    '<div class="item">FM Transmitters</div>' +
                    '<div class="item">Ham Radios</div>' +
                    '<div class="item">Modems</div>' +
                    '<div class="item">Multiplex Equipment (Voice/Data)</div>' +
                    '<div class="item">Others</div>' +
                    '<div class="item">Satcom</div>';
                break;
            case "miscellaneous":
                html =
                    '<div class="item">Alarm Systems</div>' +
                    '<div class="item">Other</div>' +
                    '<div class="item">Renewal for TA</div>' +
                    '<div class="item">Sticker Fee</div>' +
                    '<div class="item">TA Fee with Wire Transfer Charge</div>';
                break;
            default:
                html = '<div class="item">Empty</div>';
                break;
        }

        $(menu_holder).find('.item').remove();
        $(span_text).text("Select Type");
        $(menu_holder).append(html);
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

        if ($("textarea[name=additional_information]").val() === '')
        {
            $("textarea[name=additional_information]").addClass("input-error");
            form_valid = false;
        }

        var equipment_types_error =
            '<div class="ui left pointing red label equipment">' +
            'Choose an equipment type' +
            '</div>';

        var checked = false;
        var radio_options = $('#equipent_types_handle .ui.radio.checkbox');
        $.each(radio_options, function (i, object) {
            if ($(object).hasClass('checked')) {
                checked = true;
            }
        });

        if (!checked)
        {
            $('#equipent_types_handle').find('.ui.left.pointing.red.label.equipment').remove();
            $('#equipent_types_handle').append(equipment_types_error);
        }

        
        if ($("input[name=antenna_type]").val() === '')
        {
            $("input[name=antenna_type]").addClass('error');
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
});$(document).ready(function () {

    $('.ui.blue.button.save_app.s2').click(function () {
       
            var btn_save = $(this);
            $(btn_save).addClass("disabled loading");

            var jsonObj = new Object();
            jsonObj.equipment_type = $("input[name=equipment_type]").val();
            jsonObj.equipment_description = $("textarea[name=equipment_description]").val();
            jsonObj.product_identification = $("input[name=product_identification]").val();
            jsonObj.refNum = $("input[name=refNum]").val();
            jsonObj.make = $("input[name=make]").val();
            jsonObj.software = $("input[name=software]").val();
            jsonObj.type_of_equipment = $(".ui.radio.checkbox.checked").children("input").val();
            jsonObj.other = $("input[name=other_equipment]").val();

            var i = 0; var frequencies = [];
            $("#table_frequencies tr").each(function () {
                var obj = {};
                obj["sequence"] = ++i;
                obj["lower_freq"] = $(this).find("input[name=lower_mhz]").val();
                obj["upper_freq"] = $(this).find("input[name=upper_mhz]").val();
                obj["power"] = $(this).find("input[name=power]").val();
                obj["tolerance"] = $(this).find("input[name=tolerance]").val();
                obj["emmission_desig"] = $(this).find("input[name=emmission_desig]").val();
                obj["freq_type"] = $(this).find(".menu").find(".item.active.selected").html();
                frequencies.push(obj);
            });

            jsonObj.frequencies = frequencies;
            jsonObj.antenna_type = $("#antenna_type_dropdown").find(".menu").find(".item.active.selected").html();
            jsonObj.antenna_gain = $("input[name=antenna_gain]").val();
            jsonObj.channel = $("input[name=channel]").val();
            jsonObj.separation = $("input[name=separation]").val();
            jsonObj.additional_info = $("textarea[name=additional_information]").val();
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
        jsonObj.refNum = $("input[name=refNum]").val();
        jsonObj.make = $("input[name=make]").val();
        jsonObj.software = $("input[name=software]").val();
        jsonObj.type_of_equipment = $(".ui.radio.checkbox.checked").children("input").val();
        jsonObj.other = $("input[name=other_equipment]").val();

        var i = 0; var frequencies = [];
        $("#table_frequencies tr").each(function () {
            var obj = {};
            obj["sequence"] = ++i;
            obj["lower_freq"] = $(this).find("input[name=lower_mhz]").val();
            obj["upper_freq"] = $(this).find("input[name=upper_mhz]").val();
            obj["power"] = $(this).find("input[name=power]").val();
            obj["tolerance"] = $(this).find("input[name=tolerance]").val();
            obj["emmission_desig"] = $(this).find("input[name=emmission_desig]").val();
            obj["freq_type"] = $(this).find(".menu").find(".item.active.selected").html();
            frequencies.push(obj);
        });

        jsonObj.frequencies = frequencies;
        jsonObj.antenna_type = $("#antenna_type_dropdown").find(".menu").find(".item.active.selected").html();
        jsonObj.antenna_gain = $("input[name=antenna_gain]").val();
        jsonObj.channel = $("input[name=channel]").val();
        jsonObj.separation = $("input[name=separation]").val();
        jsonObj.additional_info = $("textarea[name=additional_information]").val();
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

        $(raw).insertAfter('.ui.tiny.three.top.attached.steps');
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

    $('.ui.fluid.selection.dropdown.equipment').dropdown({
        onChange: function (val) {
            set_fee_code_options(val);
        }
    });

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

    $('.ui.radio.checkbox.equipment_types').checkbox({
        onChecked: function ()
        {
            if ($(this).val() === 'Other')
            {
                $("input[name=other_equipment]").val('');
                $("input[name=other_equipment]").parent().removeClass('disabled');
            }
            else
            {
                $("input[name=other_equipment]").val('');
                $("input[name=other_equipment]").parent().addClass('disabled');
            }
        }
    });

    function addRecord(target, lower_freq, upper_freq, power, freq_tol, emmision_desig, freq_type) {

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
            ' <input type="number" placeholder="lower mhz" style="width:100%" name="lower_mhz" value=' + lower_freq + '>' +
            '</div>' +
            ' </td>' +

            '<td>' +
            '<div class="ui transparent input">' +
            '<input type="number" placeholder="upper mhz" style="width:100%" name="upper_mhz" value=' + upper_freq + '>' +
            '</div>' +
            '</td>' +

            '<td>' +
            '<div class="ui transparent input">' +
            '<input type="number" placeholder="power" style="width:100%" name="power" value=' + power + '>' +
            '</div>' +
            '</td>' +

            '<td>' +
            '<div class="ui transparent input">' +
            '<input type="number" placeholder="tolerance" style="width:100%" name="tolerance" value=' + freq_tol + '>' +
            '</div>' +
            '</td>' +

            '<td>' +
            '<div class="ui transparent input">' +
            '<input type="text" placeholder="emmission desig..." style="width:100%" name="emmission_desig" value=' + emmision_desig + '>' +
            '</div>' +
            '</td>';

        if (freq_type === 'R') {
            html +=

                '<td>' +
                '<div class="ui fluid dropdown freq_type">' +
                '<div class="text">' + freq_type + '</div>' +
                '<i class="dropdown icon"></i>' +
                '<div class="menu">' +
                '<div class="item active selected">R</div>' +
                '<div class="item">T</div>' +
                '</div>' +
                '</div>' +
                '</td>';
        }
        else if (freq_type === 'T') {
            html +=

                '<td>' +
                '<div class="ui fluid dropdown freq_type">' +
                '<div class="text">' + freq_type + '</div>' +
                '<i class="dropdown icon"></i>' +
                '<div class="menu">' +
                '<div class="item">R</div>' +
                '<div class="item active selected">T</div>' +
                '</div>' +
                '</div>' +
                '</td>';
        }
        else
        {
            html +=

            '<td>' +
                '<div class="ui fluid dropdown freq_type">' +
                '<div class="text"></div>' +
                '<i class="dropdown icon"></i>' +
                '<div class="menu">' +
                '<div class="item">R</div>' +
                '<div class="item">T</div>' +
                '</div>' +
                '</div>' +
                '</td>';
        }

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
                    $("input[name=refNum]").val(data.step2.ref_num);
                    $("input[name=make]").val(data.step2.make);
                    $("input[name=make]").val(data.step2.make);
                    $("input[name=software]").val(data.step2.software);

                    set_equipment_type_checked(data.step2.equipment_types, data.step2.other_equipment);
                    set_antenna_type_dropdown(data.step2.antenna_type);

                    var target = $('#table_frequencies');

                    if (data.step2.frequencies.length > 0)
                    {
                        $(target).find("tr").remove();
                    }

                    for (var i = 0; i < data.step2.frequencies.length; i++)
                    {
                        var lower_freq      = data.step2.frequencies[i].lower_freq;
                        var upper_freq      = data.step2.frequencies[i].upper_freq;
                        var power           = data.step2.frequencies[i].power;
                        var tolerance       = data.step2.frequencies[i].tolerance;
                        var emmission_desig = data.step2.frequencies[i].emmission_desig;
                        var freq_type       = data.step2.frequencies[i].freq_type;

                        addRecord(target, lower_freq, upper_freq, power, tolerance, emmission_desig, freq_type);
                    }

                    $('.ui.fluid.dropdown.freq_type').dropdown({
                        onChange: function (val) {
                        }
                    });

                    $("input[name=antenna_gain]").val(data.step2.antenna_gain);
                    $("input[name=channel]").val(data.step2.channels);
                    $("input[name=separation]").val(data.step2.separation);
                    $("textarea[name=additional_information]").val(data.step2.additional_info);
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

    function set_equipment_type_checked(type, other)
    {
        var radio_options = $('#equipent_types_handle .ui.radio.checkbox');
        $.each(radio_options, function (i, object) {
            if ($(object).find("input").val() === type) {
                $(object).checkbox('check');
                console.log("checked: " + type);

                if (type === 'Other')
                {
                    $("input[name=other_equipment]").val(other);
                    $("input[name=other_equipment]").removeClass('disabled');
                }
            }
        });
    }

    function set_antenna_type_dropdown(type)
    {
        var antenna_options = $("#antenna_type_dropdown .menu .item");
        $.each(antenna_options, function (i, object) {

            if ($(object).text() === type)
            {
                var span_text = $(object).parent().parent().find(".text");
                $(object).addClass('active selected');

                $(span_text).text(type);
                $(span_text).removeClass('default');

                console.log(type + " selected");
            }
            else
            {
                console.log(type);
            }
        });
    }

    function set_equipment_comm_type(type)
    {
        var comm_options = $('#equipment_type_dropdown .menu .item');
        $.each(comm_options, function (i, object) {
            if ($(object).text() === type)
            {
                var span_text = $(object).parent().parent().find(".text");
                $(object).addClass('active selected');

                $(span_text).text(type);
                $(span_text).removeClass('default');

            }
            else
            {
                console.log($(object).text());
            }
        });
    }

    function set_fee_code_type(type)
    {
        var fee_code_options = $('#fee_code_dropdown .menu .item');
        $.each(fee_code_options, function (i, object) {
            if ($(object).text() === type) {
                var span_text = $(object).parent().parent().find(".text");
                $(object).addClass('active selected');

                $(span_text).text(type);
                $(span_text).removeClass('default');
            }
            else
            {
                console.log($(object).text());
            }
        });
    }

    function set_fee_code_options(type)
    {
        var fee_code_dropdown = $('.ui.fluid.selection.dropdown.fee_code');
        var span_text = $(fee_code_dropdown).find('.text');
        var menu_holder = $(fee_code_dropdown).find('.menu');

        var html = '';

        switch (type)
        {
            case "pabx":
                html =
                    '<div class="item">PABX with less than 24 ports</div>' +
                    '<div class="item">PABX with than 128-256 ports</div>' +
                    '<div class="item">PABX with than 24-48 ports</div>' +
                    '<div class="item">PABX with than 48-128 ports</div>' +
                    '<div class="item">PABX with more than 256 ports</div>';
                break;
            case "satellite systems":
                html =
                    '<div class="item">Satellite Earth Station</div>' +
                    '<div class="item">VSAT Terminals</div>';
                break;
            case "radio systems":
                html =
                    '<div class="item">Low Power Devices</div>' +
                    '<div class="item">Radio Interface Equipment</div>' +
                    '<div class="item">Radio Transmitters</div>' +
                    '<div class="item">Wireless MicroPhones</div>';
                break;
            case "telecomms equipment":
                html =
                    '<div class="item">Answering Machines</div>' +
                    '<div class="item">Basic Telephones</div>' +
                    '<div class="item">Cordless Telephones</div>' +
                    '<div class="item">Dealership</div>' +
                    '<div class="item">Facsimile</div>' +
                    '<div class="item">FM Transmitters</div>' +
                    '<div class="item">Ham Radios</div>' +
                    '<div class="item">Modems</div>' +
                    '<div class="item">Multiplex Equipment (Voice/Data)</div>' +
                    '<div class="item">Others</div>' +
                    '<div class="item">Satcom</div>';
                break;
            case "miscellaneous":
                html =
                    '<div class="item">Alarm Systems</div>' +
                    '<div class="item">Other</div>' +
                    '<div class="item">Renewal for TA</div>' +
                    '<div class="item">Sticker Fee</div>' +
                    '<div class="item">TA Fee with Wire Transfer Charge</div>';
                break;
            default:
                html = '<div class="item">Empty</div>';
                break;
        }

        $(menu_holder).find('.item').remove();
        $(span_text).text("Select Type");
        $(menu_holder).append(html);
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

        if ($("textarea[name=additional_information]").val() === '')
        {
            $("textarea[name=additional_information]").addClass("input-error");
            form_valid = false;
        }

        var equipment_types_error =
            '<div class="ui left pointing red label equipment">' +
            'Choose an equipment type' +
            '</div>';

        var checked = false;
        var radio_options = $('#equipent_types_handle .ui.radio.checkbox');
        $.each(radio_options, function (i, object) {
            if ($(object).hasClass('checked')) {
                checked = true;
            }
        });

        if (!checked)
        {
            $('#equipent_types_handle').find('.ui.left.pointing.red.label.equipment').remove();
            $('#equipent_types_handle').append(equipment_types_error);
        }

        var antenna_selected = false;
        var antenna_options = $("#antenna_type_dropdown .menu .item");
        $.each(antenna_options, function (i, object) {

            if ($(object).hasClass('active selected')) {
                antenna_selected = true;
            }
        });

        if (!antenna_selected)
        {
            $("#antenna_type_dropdown").addClass('error');
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