$(document).ready(function()
{
	body 			= $("body");
	backFade		= $(".darkness");
	menu 			= $(".navbar");
	navbar 			= $(".main-header i");
	menu_opening 	= false;



	navbar.click(function()
	{
		menuFunction.menuToggle();
	});

	body.click(function()
	{
		if(menu_opening)
			menuFunction.menuToggle();
	});

	body[0].addEventListener('touchstart',function(e)
	{
		
		pagex = e.changedTouches[0].pageX;
		page_y = e.changedTouches[0].pageY;
	
	});

	body[0].addEventListener('touchend',function(e)
	{
		
	});

	var menuFunction = 
	{
		menuToggle: function()
		{
			if(menu_opening){
				body.removeClass("darkness");
				menu.fadeOut();				
				menu_opening = false;
			}
			else{
				menu.fadeIn();
				body.addClass("darkness");
				setTimeout(function()
				{
					menu_opening = true;
				},500)
				
			}
		} 
	}

});