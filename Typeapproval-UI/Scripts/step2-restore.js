$(document).ready(function () {

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
                if (data[i].active === true) {
                    html_inner +=
                        '<div class="active item" data-appid=' + data[i].application_id + '>' +
                        '<div class="content">' +
                        '<div class="header">' + data[i].application_id + '</div>' +
                        'Last update:' + data[i].last_updated + '' +
                        '</div>' +
                        '</div>';
                }
                else {
                    html_inner +=
                        '<div class="item" data-appid=' + data[i].application_id + '>' +
                        '<div class="content">' +
                        '<div class="header">' + data[i].application_id + '</div>' +
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
                    set_equipment_comm_type(data.step2.equipment_comm_type);
                    set_fee_code_options(data.step2.equipment_comm_type.toLowerCase());
                    set_fee_code_type(data.step2.fee_code);

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

                    $("input[name=aspect]").val(data.step2.aspect);
                    $("input[name=antenna_gain]").val(data.step2.antenna_gain);
                    $("input[name=channel]").val(data.step2.channels);
                    $("input[name=separation]").val(data.step2.separation);
                    $("input[name=compatibility]").val(data.step2.compatibility);
                    $("input[name=security]").val(data.step2.security);
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

    restore_step2();
});