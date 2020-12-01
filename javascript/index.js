$(document).ready(function()
{
	body 			= $("body");
	darkness		= $(".darkness");
	menu 			= $(".navbar");
	navbar 			= $(".main-header i");
	menu_opening 	= false;


	//localStorages
	notifications 	= JSON.parse(localStorage.notifications);
	lang 			= JSON.parse(localStorage.applang);

	if(localStorage.getItem("level") === null){
		notification('level-select','question');		
	}

	navbar.click(function()
	{
		menuFunction.menuToggle();
	});

	darkness.click(function()
	{	
		if(menu_opening)
			menuFunction.menuToggle();
	});

	body[0].addEventListener('touchstart',function(e)
	{		
		x1 = e.changedTouches[0].pageX;

	});

	body[0].addEventListener('touchend',function(e)
	{
		x2 = e.changedTouches[0].pageX;
		var z = (x2 - x1);
		if(z > 100)
			menuFunction.menuToggle(menu_opening = false);
		
		else if(z<-100)
			menuFunction.menuToggle(menu_opening = true);

	});

	var menuFunction = 
	{
		menuToggle: function()
		{
			if(menu_opening){
				darkness.hide();
				menu.fadeOut();				
				menu_opening = false;
			}
			else{
				menu.fadeIn();
				darkness.show();
				setTimeout(function()
				{
					menu_opening = true;
				},500)
				
			}
		}

	}


	function notification(event,process)
	{
		if(process == "question")
		{
			const inputOptions = new Promise((resolve) => {
			  
			    resolve(notifications[lang]['levels'])
			  
			})

			const { code: value } = Swal.fire(
			{
			  title			: notifications[lang][event]['message'],
			  icon			: notifications[lang][event]['info'],
			  input 		: 'radio',
			  inputOptions 	: inputOptions,
			  
			  inputValidator: (value) => {

			    if (!value) {
			      return notifications[lang]['choose-something']['message']
			    }
			    else{
			    	localStorage.levels = value;
			    	Swal.close();			    	
			    }

			  }
			})
		}
		else
		{
			Swal.fire({
			  position				: 'center',
			  icon					: notifications[lang][event]['info'],
			  title					: notifications[lang][event]['message'],
			  showConfirmButton 	: true,
			  confirmButtonText 	: notifications[lang]['confirmText']
			 
			});
		}	
		
	}

});