$(document).ready(function()
{
	body 			= $("body");
	darkness		= $(".darkness");
	lesson 			= $(".level-query li");
	lesson_info 	= $(".lesson-info");
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
	opening 		= false;

	body.click(function()
	{
		if(opening){
			opening = false;
			lesson_info.fadeOut();
		}

	})


	lesson.click(function(e)
	{
		if(!opening)
		{
			x = e.pageX;
			y = e.pageY;

			y_lesson 	= $(this).offset().top;
			bodyHeight 	= $(window).height();
			
			
			lesson_info.css(
			{
				"top": y_lesson+50+"px"
			});

			if(x>150&& x<200)
			{
				x = 135;
			}
			else if(x>200&&x<270)
				x = 190;
			else
				x = 40;

			l_a_top.css(
			{
				"left": x+"px"

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

	//localStorages
	notifications 	= JSON.parse(localStorage.notifications);
	lang 			= JSON.parse(localStorage.applang);

	if(localStorage.getItem("levels") === null){
		notification('level-select','question');		
	}

	function callOther(loc,func,funcData)
	{
		$.getScript("javascript/"+loc+".js",function(e)
		{
					
			window[func](funcData);				
		});

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