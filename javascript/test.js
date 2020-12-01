$(document).ready(function()
{
	$.getJSON("json/words.json", function(data){
		

			for (var i = 0; i < data['tr'].length; i++) {
				
				x = `<span>`+data['tr'][i]['translate']+`</span><br>`;
				
				$(x).appendTo("#test");
			}
			
			
		});


});