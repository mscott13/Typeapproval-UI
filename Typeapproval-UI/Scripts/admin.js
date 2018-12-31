$(document).ready(function () {

    var unassigned_action = '';
    var ongoing_action = '';

    $('#ongoing_action_dropdown').dropdown({
        onChange: function (value, text, $selectedItem) {
            if (value === 'reassign_engineer') {
                ongoing_action = 'reassign_engineer';
                $('#reassign_engineer_select').toggleClass("display_invisible");
            }
            else if (value === 'move_unassigned')
            {
                ongoing_action = 'move_unassigned';
                $('#reassign_engineer_select').addClass("display_invisible");
            }
        }
    });

    $('#unassigned_action_dropdown').dropdown({
        onChange: function (value, text, $selectedItem) {
            if (value === 'assign_engineer') {
                unassigned_action = 'reassign_engineer';
                $('#assign_engineer_select').toggleClass("display_invisible");
            }
            else if (value === 'delete') {
                unassigned_action = 'move_unassigned';
                $('#assign_engineer_select').addClass("display_invisible");
            }
        }
    });

    $('#reassign_engineer_select').dropdown();
    $('#assign_engineer_select').dropdown();

    $('#btn_ongoing_apply').click(function () {
        var check_tasks = $('#tbl_ongoing .check_task:checked');
    });

    $('#btn_unassigned_apply').click(function () {
        var check_tasks = $('#tbl_unassigned .check_task:checked');
    });
});