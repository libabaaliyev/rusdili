$(document).ready(function()
{
	body 			= $("body");
	darkness		= $(".darkness");
	navbar 			= $(".navbar");
	menu 			= $("#menu li");
	bar 			= $(".bar");
	barItems 		= $(".bar-item");

	menu_opening 	= false;
	var menu_value 	= "menu";

	//localStorages
	notifications 	= JSON.parse(localStorage.notifications);
	lang 			= JSON.parse(localStorage.applang);

	if(localStorage.getItem("levels") === null){
		notification('level-select','question');		
	}

	menu.click(function()
	{
		if(menu_value == $(this).data("value") && menu_opening == true)
			menuFunction.menuToggle(menu_opening,"all");
		else
		{
			menu_value = $(this).data("value");		
			menuFunction.menuToggle(menu_opening,menu_value);
		}
	});

	darkness.click(function()
	{	
		
		if(menu_opening)
			menuFunction.menuToggle(menu_opening,"all");
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
			menuFunction.menuToggle(menu_opening = false,"menu");
		
		else if(z<-100)
			menuFunction.menuToggle(menu_opening = true,"all");

	});

	var menuFunction = 
	{
		menuToggle: function(opening,value)
		{
			barItems.hide();
			navbar.fadeOut();
			
			if(value == "all")
			{
				darkness.hide();				
				bar.hide();
				if(value != 'menu')
					$("#"+value).fadeOut();	
				
				menu_opening = false;
			}
			else
			{
				if(value == "menu"){
					
					bar.hide();
					navbar.fadeIn();
				}
				else{
					bar.fadeIn();
					$("#"+value).show();
				}

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
			  title				: notifications[lang][event]['message'],
			  icon				: notifications[lang][event]['info'],
			  input 			: 'radio',
			  inputOptions 		: inputOptions,
			  backdrop			: true,
			  allowOutsideClick	: false,
			  allowEscapeKey	: false,
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
			  backdrop				: true,
			  allowOutsideClick		: false,
			  allowEscapeKey		: false,
			  confirmButtonText 	: notifications[lang]['confirmText']
			 
			});
		}	
		
	}

});