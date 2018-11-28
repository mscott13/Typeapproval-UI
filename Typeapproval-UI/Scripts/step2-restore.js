$(document).ready(function () {

    $('.ui.fluid.selection.dropdown.equipment').dropdown({
        onChange: function (val) {
            alert(val);
        }
    });

    $('.ui.fluid.selection.dropdown.antenna').dropdown({
        onChange: function (val) {
            alert(val);
        }
    });

    $('.ui.fluid.dropdown.freq_type').dropdown({
        onChange: function (val) {
            alert(val);
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

        if (freq_type == 'R') {
            html +=

                '<td>' +
                '<div class="ui fluid dropdown">' +
                '<div class="text">' + freq_type + '</div>' +
                '<i class="dropdown icon"></i>' +
                '<div class="menu">' +
                '<div class="item active selected">R</div>' +
                '<div class="item">T</div>' +
                '</div>' +
                '</div>' +
                '</td>';
        }
        else if (freq_type == 'T')
        {
            html +=

            '<td>' +
                '<div class="ui fluid dropdown">' +
                '<div class="text">' + freq_type + '</div>' +
                '<i class="dropdown icon"></i>' +
                '<div class="menu">' +
                '<div class="item">R</div>' +
                '<div class="item active selected">T</div>' +
                '</div>' +
                '</div>' +
                '</td>';
        }

        html+= '</tr>';
        $(target).append(html);
    }

    function restore_step2() {
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

                    set_equipment_type_checked(data.step2.equipment_types);
                    set_antenna_type_dropdown(data.step2.antenna_type);
                    set_equipment_comm_type(data.step2.equipment_comm_type);

                    var target = $('#table_frequencies');
                    $(target).find("tr").remove();

                    for (var i = 0; i < data.step2.frequencies.length; i++)
                    {
                        var lower_freq      = data.step2.frequencies[i].lower_freq;
                        var upper_freq      = data.step2.frequencies[i].upper_freq;
                        var power           = data.step2.frequencies[i].power;
                        var tolerance       = data.step2.frequencies[i].tolerance;
                        var emmission_desig = data.step2.frequencies[i].emmission_desig;
                        var freq_type       = data.step2.frequencies[i].freq_type;

                        addRecord(target, lower_freq, upper_freq, power, tolerance, emmission_desig, freq_type);
                    }  // $('.ui.dropdown').dropdown();

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

    function set_equipment_type_checked(type)
    {
        var radio_options = $('#equipent_types_handle .ui.radio.checkbox');
        $.each(radio_options, function (i, object) {
            if ($(object).find("input").val() == type) {
                $(object).checkbox('check');
                console.log("checked: " + type);
            }
        });
    }

    function set_antenna_type_dropdown(type)
    {
        var antenna_options = $("#antenna_type_dropdown .menu .item");
        $.each(antenna_options, function (i, object) {

            if ($(object).text() == type)
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
            if ($(object).text() == type) {
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

    restore_step2();
});