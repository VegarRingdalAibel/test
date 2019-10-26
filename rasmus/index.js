
var button = document.getElementById('button');
var input = document.getElementById('input');
var output = document.getElementById('output');
button.addEventListener('click', function(){
    var rows = input.value.split('\n');
    var newRows = [];

    rows.forEach(function(row)  {
        var cols = row.split('\t');
        cols.forEach(function(col){
            newRows.push(col);
        })
        newRows.push('')
    });

    output.value = newRows.join('\n');
})