$(document).ready(function()
{
	title = 
	{
		az : "Rus dili tədrisi",
		tr : "Rusça eğitim",
		ru : "Русское Oбразование",
		en : "Russian Education"
	}
	
	const startFunc = 
	{
		jsonfiles: function(e)
		{
			$(".main-name h4").html(title[lang]);
			
			$.getJSON("json/notification.json", function(data){
				
				notificationData 			= data;
				localStorage.notifications 	= JSON.stringify(notificationData);
				
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
			})

			
		}
	}

	if(localStorage.getItem("applang")===null)
		startFunc.language();
	else{
		lang = JSON.parse(localStorage.applang);
		startFunc.jsonfiles("main");
	}
	

});