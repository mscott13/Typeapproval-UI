$(document).ready(function () {

    function addRecord(target, lower_freq, upper_freq, power, freq_tol, emmision_desig, freq_type) {

        $('.ui.dropdown').dropdown();
        var html =
            '<tr id="record_2">' +
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
            '<input type="number" placeholder="power" style="width:100%" name="power" value='+power+'>' +
            '</div>' +
            '</td>' +

            '<td>' +
            '<div class="ui transparent input">' +
            '<input type="number" placeholder="tolerance" style="width:100%" name="tolerance" value=' + freq_tol + '>' +
            '</div>' +
            '</td>' +

            '<td>' +
            '<div class="ui transparent input">' +
            '<input type="text" placeholder="emmission desig..." style="width:100%" name="emmission_desig" value=' + emmision_desig+'>' +
            '</div>' +
            '</td>' +

            '<td>' +
            '<div class="ui fluid dropdown">' +
            '<div class="text"></div>' +
            '<i class="dropdown icon"></i>' +
            '<div class="menu">' +
            '<div class="active item">R</div>' +
            '<div class="item">T</div>' +
            '</div>' +
            '</div>' +
            '</td>' +

            ' </tr>';
        $(html).insertAfter(target);
        $('.ui.dropdown').dropdown();
    }

    function restore_step2() {
        $.ajax({
            type: "GET",
            url: "/retrieve/step-2",
            success: function (data) {
                if (data.data_present) {
                    $('input[name=equipment_type]').val(data.step2.equipment_type);
                    $("textarea[name=equipment_description]").val(data.step2.equipment_description);
                    $("input[name=product_identification]").val(data.step2.product_identification);
                    $("input[name=refNum]").val(data.step2.ref_num);
                    $("input[name=make]").val(data.step2.make);
                    $("input[name=software]").val(data.step2.software);
                    set_equipment_type_checked(data.step2.equipment_types);
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

    restore_step2();

});