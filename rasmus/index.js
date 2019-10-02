
const button = document.getElementById('button');
const input = document.getElementById('input');
const output = document.getElementById('output');
button.addEventListener('click', function(){
    const rows = input.value.split('\n');
    const newRows = [];

    rows.forEach(row => {
        const cols = row.split('\t');
        cols.forEach((col)=>{
            newRows.push(col);
        })
        newRows.push('')
    });

    output.value = newRows.join('\n');
})