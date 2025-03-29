=substitute("/* copy me and paste in the k2 console */ $('#container .row:nth-child(2) table').after(
    $('<button/>', {
        text: 'Copy Stats',
        class: 'btn btn-info',
        click: function () {
            const data = $('#container .row:nth-child(2) table tbody tr')\.map(function () {
                const name = $(this).find('td:first-child').text();
                const score = $(this).find('td:last-child').text();
                return ['" & text(N3, "yyyy-mm-dd") & "', name, score.replace('%', '')].join('\t')
            }).get().join('\n');
            navigator.clipboard.writeText(data).then(function () {
                console.log('Copied results to the clipboard!');
            });
        }
    })
); " 
    & "$(""#start-datepicker"").val(""" & text(N2, "mm/dd/yyy") & """); $(""#end-datepicker"").val(""" & text(N3, "mm/dd/yyy") & """); $(""#person-submit"").click();" & textjoin(" ", true, $I$5: $I), char(10), " ")


/* copy me and paste in the k2 console */
$('#container .row:nth-child(2) table').after($('<button/>', { 
    text: 'Copy Stats', 
    class: 'btn btn-info', 
    click: function () { 
        const data = $('#container .row:nth-child(2) table tbody tr').map(function () { 
            const name = $(this).find('td:first-child').text(); 
            const score = $(this).find('td:last-child').text(); 
            return ['2023-11-06', name, score.replace('%', '')].join('\t') }
        ).get().join('\n'); 
            navigator.clipboard.writeText(data).then(function () { 
                console.log('Copied results to the clipboard!'); }); 
            } })); 
            $("#start-datepicker").val("09/25/2023"); $("#end-datepicker").val("11/06/2023"); $("#person-submit").click(); 
            fetch_person("mgranderath", "Malte Granderath");