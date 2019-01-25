$(document).ready(function(){
    var a = [];
    var $table;
    var $row;
    var times = 2.25;
    initArray();
    renderTable();
    createResetButton();
    createHideButton();
    createShowButton();
    createPercentageInput();

    function createPercentageInput(){
        var $input = $('<input>',{
            type: 'text',
            id: 'times-input',
            class: 'form-control action col-1',
            value: times
        });
        var $button = $('<button/>', {
            class: 'btn btn-success action',
            text: 'Change',
            id: 'change-button',
            click: function () { 
                $("#table-1").remove();
                initArray();
                renderTable();
                times = $('#times-input').val();
            }
        });
        $('#controls').append($input);
        $('#controls').append($button);

    }

    function createResetButton(){
        var $button = $('<button/>', {
            class: 'btn btn-secondary action',
            text: 'Reset',
            id: 'reset-button',
            click: function () { 
                $("#table-1").remove();
                initArray();
                renderTable();
                times = 2.25;
                $("#times-input").remove();
                $("#change-button").remove();
                createPercentageInput();

            }
        });
        $('#controls').append($button);
    }
    function createHideButton(){
        var $button = $('<button/>', {
            class: 'btn btn-secondary action',
            text: 'Hide buttons',
            id: 'hide-button',
            click: function () { 
                $("#table-1").remove();
                renderNoButtonsTable();
            }
        });
        $('#controls').append($button);
    }
    function createShowButton(){
        var $button = $('<button/>', {
            class: 'btn btn-secondary action',
            text: 'Show buttons',
            id: 'show-button',
            click: function () { 
                $("#table-1").remove();
                renderTable();
            }
        });
        $('#controls').append($button);
    }
    function initArray(){
        a[0] = [1,1,1,1,1,1,1,1,1,1]; 
        a[1] = [0,0,0,0,0,0,0,0,0,0];
        a[2] = [0,0,0,0,0,0,0,0,0,0];
        a[3] = [0,0,0,0,0,0,0,0,0,0];
        a[4] = [0,0,0,0,0,0,0,0,0,0];
        a[5] = [0,0,0,0,0,0,0,0,0,0];
        a[6] = [0,0,0,0,0,0,0,0,0,0];
        a[7] = [0,0,0,0,0,0,0,0,0,0];
        a[8] = [0,0,0,0,0,0,0,0,0,0];
        a[9] = [0,0,0,0,0,0,0,0,0,0];
    }
    function renderNoButtonsTable()
    {
        $table = $('<table>',{
            id: 'table-1'
        });
        for(i=0; i<10; i++){
            $row = $('<tr>');
            $table.append($row);
            for (j = 0; j < 10; j++) {
                var $td = $('<td>');
                
                var $value = $('<span>', {
                    text : (a[i][j] * 1).toFixed(2),
                    class: 'badge badge-light'
                } );            
                $value.appendTo($td);
                $td.appendTo($row);  
            }
        }
        $('#board').append($table);
    }
    function renderTable()
    {
        $table = $('<table>',{
            id: 'table-1'
        });
        for(i=0; i<10; i++){
            $row = $('<tr>');
            $table.append($row);
            for (j = 0; j < 10; j++) {
               renderCell(i,j);  
            }
        }
        $('#board').append($table);
    }
    function renderCell(i,j){
        if(i==9){
            var $td = $('<td>');
            var $black = $('<button/>', {
                class: 'btn btn-dark',
                text: '',
                id: 'b_'+i+'_'+j
            }).prop("disabled", true);
            var $red = $('<button/>', {
                class: 'btn btn-danger',
                text: '',
                id: 'r_'+i+'_'+j
            }).prop("disabled", true);
            var $value = $('<span>', {
                text : (a[i][j] * 1).toFixed(2),
                class: 'badge badge-secondary'
            } );            
            $black.appendTo($td);
            $value.appendTo($td);
            $red.appendTo($td);
            $td.appendTo($row);
        } else {
            var $td = $('<td>');
            var $black = $('<button/>', {
                class: 'btn btn-dark',
                text: '',
                id: 'b_'+i+'_'+j,
                click: function () { 
                    $("#table-1").remove();
                    a[i+1][j] = 1;
                    renderTable();
                }
            });
            var $red = $('<button/>', {
                class: 'btn btn-danger',
                text: '',
                id: 'r_'+i+'_'+j,
                click: function () { 
                    $("#table-1").remove();
                    a[i+1][j] =  (a[i][j] * times).toFixed(2);
                    renderTable();
                }
            });
            var $value = $('<span>', {
                text : (a[i][j] * 1).toFixed(2),
                class: 'badge badge-secondary'
            } );            
            $black.appendTo($td);
            $value.appendTo($td);            
            $red.appendTo($td);
            $td.appendTo($row);
        }
    }
}); 