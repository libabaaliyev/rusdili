$(document).ready(function()
{
	body 			= $("body");
	darkness		= $(".darkness");
	lesson 			= $(".level-query li");
	lesson_info 	= $(".lesson-info-x");
	lesson_info_tab	= $(".lesson-info");
	l_a_top			= $(".arrow-top");
	skip_lesson		= $(".skip-lesson");
	skip_tab 		= $(".lock-lesson");
	not_skip 		= $(".darkness, .not-skip-lesson");
	update_aim		= $(".update-aim");
	aim_tab			= $(".day-aim");
	aim_items 		= $(".aim ul li");
	aim_save 		= $(".aim-save")
	close 			= $(".close-tabs");
	start_lesson 	= $(".start-lesson");

	bodyHeight 		= $(window).height();
	windowWidth		= $(window).width();
	bodyWidth		= $("body").width();
	opening 		= false;


	//localStorages
	notifications 	= JSON.parse(localStorage.notifications);
	lang 			= JSON.parse(localStorage.applang);
	words 			= JSON.parse(localStorage.appLanguage);

	body.click(function()
	{
		if(opening){
			opening = false;
			lesson_info.fadeOut();
		}

	})

	callOther("general","language");
	callOther("general","start_page","index");

	lesson.click(function(e)
	{
		if(!opening)
		{
			x = e.pageX;
			y = e.pageY;
			
			
			y_lesson 	= $(this).offset().top;

			if(windowWidth<1050)
			{
				
				objectLeft 	= $(this).offset().left;
				
			}
			else
			{
				objectLeft 	= $(this).offset().left - ((windowWidth - bodyWidth)/2);
			}
			
			if(objectLeft>(bodyWidth/2+40)){

				lesson_info_tab.css("left",(objectLeft-140));
			}

			else
			{
				lesson_info_tab.css("left",objectLeft);
			}

			lesson_info.css(
			{
				"top": (y_lesson-25)+"px"
			});

			l_a_top.css(
			{
				"left": (objectLeft+25)+"px"

			});

			

			if((bodyHeight - y_lesson) < 200)
				$("html, body").animate({ scrollTop: (y_lesson-200) }, 1000);
			
			
			
			setTimeout(function(){ 
				if(!opening){
					opening = true;
					lesson_info.fadeIn();
				}
				
				
			},100);
		}
		else
		{
			lesson_info.fadeOut();
		}
	});

	skip_lesson.click(function()
	{
		opening = false;
		darkness.show();

		skip_tab.removeClass("slideOutDown");
		skip_tab.removeClass("slideInUp");
		skip_tab.addClass("slideInUp");
		skip_tab.show();
	});

	not_skip.click(function()
	{
		setTimeout(function(){ 
			opening = true;			

		},100);
	});

	update_aim.click(function()
	{
		aim_tab.removeClass("slideOutRight");
		aim_tab.removeClass("slideInRight");
		aim_tab.addClass("slideInRight");
		aim_tab.show();

	});
	close.click(function()
	{
		aim_tab.removeClass("slideInRight");
		aim_tab.removeClass("slideOutRight");
		aim_tab.addClass("slideOutRight");
		aim_tab.fadeOut(1000);
		
	});

	aim_save.click(function()
	{
		aim_tab.removeClass("slideInRight");
		aim_tab.removeClass("slideOutRight");
		aim_tab.addClass("slideOutRight");
		aim_tab.fadeOut(1000);
	});

	aim_items.click(function()
	{
		aim_items.removeClass("active");
		$(this).addClass("active");
	});

	start_lesson.click(function()
	{
		window.location = "lessons.html";
	});

	function callOther(loc,func,funcData)
	{
		$.getScript("javascript/"+loc+".js",function(e)
		{
					
			window[func](funcData);				
		});

	}

});