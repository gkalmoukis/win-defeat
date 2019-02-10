$(document).ready(function(){
    /**
     * win 1 black, lose 0 red
     */
    var a = [];
    var $table;
    var $row;
    var coefficient = 1.5; // increase 50% defalt
    var starting = 1; //starting from 1 default
    var bets=0; //total bets counter
    var wins = 0; // total wins counter
    var loses = 0; // total loses counter
    
    var winra = 0; // winning percentage
    var losera =0; // losing percentage

    initArray(starting); 
    renderTable();
    initTotalStats();
    renderSheetSettings();
    
    /**
     * settings functionality
     * 
     */
    function newSheet(co,st){
        // delete previus html elemnts by id
        $("#table-1").remove();
        $("#coefficient-input").remove();
        $("#starting-input").remove();
        $("#new-button").remove();
        //set starting point
        starting = st;
        // init array
        initArray(starting);
        // set coefficient
        coefficient = co;
        // init stats
        initTotalStats();
        // render new table
        renderTable();
        // render new coefficient input
        renderSheetSettings();
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
                        stats(j,1);  
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
                        stats(j,0); 
                    }
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


    
    function renderTextSpan(hid,hclass,prefix,val,postfix){
        var $span;
        return $span = ('<span />',{
            id : hid,
            text : prefix+' '+val+' '+postfix,
            class : hclass
        });
    }
    
    // stats functionality
    function initTotalStats()
    {
        
        bets=0; // init 
        wins = 0;
        loses = 0;
        winra = 0;
        losera =0; 
        // first render stat spans
        var $bet = renderTextSpan("tb","","",bets,"");
        var $win = $('<span/>',{
            id: 'w',
            text: wins   
        });
        var $lose = $('<span/>',{
            id: 'l',
            text: loses   
        });
        var $winra = $('<span/>',{
            id: 'wr',
            text: winra +' %'
        });
        var $losera = $('<span/>',{
            id: 'lr',
            text: losera + ' %'
        });
        // display total bets counter - removes the old appent the new
        $('#tb').remove();
        $('#bets').append($bet);
        // display wins 
        $('#w').remove();
        $('#wins').append($win);
        // display loses
        $('#l').remove();
        $('#loses').append($lose);
        // display win ratio
        $('#wr').remove();
        $('#winning-ratio').append($winra);
         // displaye lose ratio
         $('#lr').remove();
         $('#losing-ratio').append($losera);
    }


    function stats(col, result) {    
        bets ++; //add one to total bets counter 
        
        if (result == 1) {
            wins ++ //add one to wins counter
        } else if(result==0 ) {
            loses++; // loses            
        }
                
        winra = ((wins/bets) * 100).toFixed(2); // winning percentage = wins / bets 
        losera = ((loses/bets) * 100).toFixed(2);  // losing percentage = loses / bets  
        
        // render new spans
        var $bet = $('<span/>',{
            id: 'tb',
            text: bets   
        });
        var $win = $('<span/>',{
            id: 'w',
            text: wins   
        });
        var $lose = $('<span/>',{
            id: 'l',
            text: loses   
        });
        var $winra = $('<span/>',{
            id: 'wr',
            text: winra +' %'
        });
        var $losera = $('<span/>',{
            id: 'lr',
            text: losera + ' %'
        });
        // display total bets counter - removes the old appent the new
        $('#tb').remove();
        $('#bets').append($bet);
        // display wins 
        $('#w').remove();
        $('#wins').append($win);
        // display loses
        $('#l').remove();
        $('#loses').append($lose);
        // display win ratio
        $('#wr').remove();
        $('#winning-ratio').append($winra);
         // displaye lose ratio
         $('#lr').remove();
         $('#losing-ratio').append($losera);
    }
}); 