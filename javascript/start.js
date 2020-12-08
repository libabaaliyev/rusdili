$(document).ready(function()
{
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

	if(localStorage.getItem("applang")===null)
		startFunc.language();
	else{
		lang 		= JSON.parse(localStorage.applang);
		appLanguage = JSON.parse(localStorage.appLanguage);
		
		$("#app-name").html(appLanguage[lang]['app-name']);
		startFunc.jsonfiles("main");
	}
	

});