$(document).ready(function(){
    /**
     * win 1 black, lose 0 red
     */
    var a = []; 
    var statistics = []; //[{wins: number ,loses:number}] 
    var $table;
    var $row;
    var coefficient = 1.5; // increase 50% defalt
    var starting = 1; //starting from 1 default
 
    newSheet(coefficient,starting);
    
    function newSheet(co,st){
        /** delete all previus html elemnts by id */
        $("#table-1").remove();
        $("#coefficient-input").remove();
        $("#starting-input").remove();
        $("#new-button").remove();
        starting = st; // set starting point
        coefficient = co; // set coefficient
        initArray(starting); // init array
        initStatisticsArray() // init stats
        renderTable();// render new table 
        renderSheetSettings();// render sheet setting pannel
    } 

    function renderSheetSettings(){

        // starting point input field
        var $input1 = $('<input>',{
            placeholder : 'starting',
            type: 'text',
            id: 'starting-input',
            class: 'form-control action col-1',
            value: starting
        });

        // coefficient input field
        var $input2 = $('<input>',{
            placeholder : 'coefficient',
            type: 'text',
            id: 'coefficient-input',
            class: 'form-control action col-1',
            value: coefficient
        });

        // new sheet button
        var $button = $('<button/>', {
            class: 'btn btn-success action',
            text: 'New sheet',
            id: 'new-button',
            click: function () { 
               var co  =$('#coefficient-input').val();
               var st  =$('#starting-input').val();
               newSheet( co ,st );
            }
        });

        $('#settings').append($input1);
        $('#settings').append($input2);
        $('#settings').append($button);
    }

    function initArray(num){
        a[0] = [num,num,num,num,num,num,num,num,num,num];
        for (let i = 1; i < 10; i++) {
            a[i] = [0,0,0,0,0,0,0,0,0,0];
        } 
    }
    
    function renderTable()
    {
        $table = $('<table>',{
            id: 'table-1'
        });
        $th_row = $('<tr>');
        for(i=0; i<10; i++){
            $row = $('<tr>');
            $table.append($row);
            for (j = 0; j < 10; j++) {
               renderCell(i,j);  
            }
        }
        $('#board').append($table);
    }

    // render cell
    function renderCell(i,j){
            // black win
            var $td = $('<td>');
            var $black = $('<button/>', {
                class: 'btn btn-dark',
                text: '',
                id: 'b_'+i+'_'+j,
                click: function () { 
                    if(i!=9){ // if not last row
                        $("#table-1").remove(); //remove current table
                        a[i+1][j] = starting; // init to starting point the bottom cell 
                        renderTable(); // create the table again
                        updateStatisticsTable(j,1); // add one win in colomn j
                    }
                }
            });

            // red - lose
            var $red = $('<button/>', {
                class: 'btn btn-danger',
                text: '',
                id: 'r_'+i+'_'+j,
                click: function () { 
                    if(i!=9){ // if last row
                        $("#table-1").remove(); //remove current table
                        a[i+1][j] =  (a[i][j] * coefficient).toFixed(2); // increase the bottom cell
                        renderTable(); // create the table again
                        updateStatisticsTable(j,0); // add one lose in colomn j
                    }
                }
            });
            var $value = $('<span>', {
                text : (a[i][j] * 1).toFixed(2),
                class: 'badge badge-secondary'
            });            
            $black.appendTo($td);
            $value.appendTo($td);            
            $red.appendTo($td);
            $td.appendTo($row);        
    }
    
    /**Stats logic */
    function initStatisticsArray(){
        for(let i = 0; i < 10; i++) { 
            statistics[i]={wins:0, loses:0 }    
        }
    }

    function updateStatisticsTable(col,result){
        if(result == 1){ //if win
            statistics[col].wins ++; 
        } 
        else if(result == 0) { // if lose
            statistics[col].loses ++;
        }
        renderStatistics();
    }

    function renderStatistics(){
        console.table(statistics);
    }    
}); 