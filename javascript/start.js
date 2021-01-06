$(document).ready(function()
{
	/*localStorage.clear();*/
	title = 
	{
		az : "Rus dili tədrisi",
		tr : "Rusça eğitim",
		ru : "Русское Oбразование",
		en : "Russian Education"
	}

	var appLanguage = [];
	
	const startFunc = 
	{
		jsonfiles: function(e)
		{	
			$.getJSON("json/notification.json", function(data){
				
				notificationData 			= data;
				localStorage.notifications 	= JSON.stringify(notificationData);
				
			});

			$.getJSON("json/appLanguage.json", function(data){
				
				$("#app-name").html(data[lang]['app-name']);
				localStorage.appLanguage 	= JSON.stringify(data);
				
			});

			$.getJSON("json/words.json", function(data){
				
				localStorage.words 	= JSON.stringify(data);
				
			});

			$.getJSON("json/sentence.json", function(data){
								
				localStorage.sentences 	= JSON.stringify(data);
				
			});

			$.getJSON("json/stories.json", function(data){				
				
				localStorage.stories 	= JSON.stringify(data);				
			});

			$.getJSON("json/achievements.json", function(data){				
				
				localStorage.achievements 	= JSON.stringify(data);				
			});


			

			setTimeout(function() {
				window.location = e+".html";

			},3000);
		},
		language: function()
		{
			const { value: language } = Swal.fire({
			  title: 'Dil seçin',
			  input: 'select',
			  backdrop: true,
			  allowOutsideClick: false,
			  allowEscapeKey: false,
			  inputOptions: {
			    
			      az: 'Azərbaycan dili',
			      tr: 'Türkçe',
			      en: 'English',
			      ru: 'Pусский'
			    
			  },
			  inputPlaceholder: 'Bir dil seçin',
			  showCancelButton: false,
			  inputValidator: (value) => {
			    return new Promise((resolve) => {
			      if (value) {
			      	localStorage.applang 	= JSON.stringify(value);
			      	lang 					= JSON.parse(localStorage.applang)
			      	Swal.close();
			      	this.jsonfiles("start");
			        
			      } else {

			        resolve('Birini seçməlisiniz.');
			      }
			    })
			  }
			});
			
		}
	}

	if(localStorage.getItem("user")===null)
	{
		startFunc.language();
			
		localStorage.plan 	 = JSON.stringify([]);
		localStorage.day_use = JSON.stringify([]);
		localStorage.buy_s 	 = JSON.stringify([]);
		localStorage.achieve = JSON.stringify({	"grade-master": 0,	"crown-master": 0,	"full-aim": 0, "unerror": 0, "friendly": 0, "knight": 0	, "week": true	, "month": true});
		localStorage.market  = JSON.stringify({"shield"	: 0,	"double" : 0});
		
	}
	else
	{
		lang 		= JSON.parse(localStorage.applang);
		appLanguage = JSON.parse(localStorage.appLanguage);		
		$("#app-name").html(appLanguage[lang]['app-name']);
		startFunc.jsonfiles("main"); 

		if(localStorage.getItem("plan") === null)
			localStorage.plan 	 = JSON.stringify([]);

		if(localStorage.getItem("day_use") === null)
			localStorage.day_use 	 = JSON.stringify([]);

		if(localStorage.getItem("buy_s") === null)
			localStorage.buy_s 	 = JSON.stringify([]);

		if(localStorage.getItem("achieve") === null)
			localStorage.achieve 	 = JSON.stringify({	"grade-master": 0,	"crown-master": 0,	"full-aim": 0, "unerror": 0, "friendly": 0, "knight": 0	, "week": true	, "month": true});

		if(localStorage.getItem("market") === null)
			localStorage.market 	 = JSON.stringify({"shield"	: 0,	"double" : 0});
	}	
	

});