$(document).ready(function()
{
	$.getJSON("json/stories.json", function(data){

		
			console.log(data['stories'].length)
			//console.log("tr: "+data['tr'].length)
			
			
		});


});