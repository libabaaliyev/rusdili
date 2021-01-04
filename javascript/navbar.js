$(document).ready(function()
{
	body 			= $("body");
	darkness		= $(".darkness");
	navbar 			= $(".navbar");
	menu 			= $("#menu li");
	bar 			= $(".bar");
	barItems 		= $(".bar-item");
	footerItems 	= $(".footer ul li");
	lesson_info 	= $(".lesson-info");
	skip_tab 		= $(".lock-lesson");
	not_skip 		= $(".not-skip-lesson");

	isPage 			= "main";	
	menu_value 		= "menu";
	menu_opening 	= false;

	

	if(localStorage.getItem("isPage")===null)
		localStorage.isPage = isPage;
	else{
		isPage = localStorage.isPage;

		if(isPage == "score"){
			if(navigator.onLine)
				callOther("general","scoreboard","score");
			else
				callOther("general","notification","internet-error");
		}
	}


	$("#"+isPage).addClass("in active");
	$("#f-"+isPage).addClass("active");

	menu.click(function()
	{
		if(menu_value == $(this).data("value") && menu_opening == true)
			menuToggle(menu_opening,"all");
		else
		{
			menu_value = $(this).data("value");	
			if(menu_value != "diamond")	
				menuToggle(menu_opening,menu_value);
			else
				menuToggle(menu_opening,"all");
		}
	});

	darkness.click(function()
	{	
		allClose();
	});

	not_skip.click(function()
	{
		allClose();
	})

	footerItems.click(function()
	{
		isPage = $(this).data("tab");
		localStorage.isPage = isPage;

		if(isPage == "score"){
			if(navigator.onLine)
				callOther("general","scoreboard","score");
			else
				callOther("general","notification","internet-error");
		}
		

		allClose();
	});

	body[0].addEventListener('touchstart',function(e)
	{		
		x1 = e.changedTouches[0].pageX;		
	});

	body[0].addEventListener('touchend',function(e)
	{
		x2 = e.changedTouches[0].pageX;
		var z = (x2 - x1);
		if(isPage == "main")
		{		
			if(z > 100)
				menuToggle(menu_opening = false,"menu");
			
			else if(z<-100)
				menuToggle(menu_opening = true,"all");
		}
	});


	function menuToggle(opening,value)
	{
		barItems.hide();
		navbar.fadeOut();
		lesson_info.hide();
		skip_tab.hide();
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

	function allClose()
	{

		setTimeout(function(){

			skip_tab.removeClass("slideOutDown");
			skip_tab.removeClass("slideInUp");
			skip_tab.addClass("slideOutDown");

			skip_tab.fadeOut(500);
			if(menu_opening)
				menuToggle(menu_opening,"all");
			else
				darkness.hide();
		},200);
	}

	function callOther(loc,func,funcData,funcData_1)
	{

		$.getScript("javascript/"+loc+".js",function(e)
		{
			window[func](funcData,funcData_1);				
		});

	}

});