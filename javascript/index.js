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

	language();

	function language()
	{
		$("#crown-l").html(words[lang]['crown']);

		$("#crown-txt").html(words[lang]['crown-txt']);

		$(".day-aim-title").html(words[lang]['day-aim-title']);

		$("#update").html(words[lang]['update']);
		
		$("#health-info").html(words[lang]['health-all']); // can sistemi duzelende bu serte gore deyisecek
		
		$("#health-txt").html(words[lang]['health-txt']);
		
		$("#a-health").html(words[lang]['a-health']);
		
		$(".get-practice").html(words[lang]['get-practice']);
		
		$(".get-health").html(words[lang]['get-health']);
		
		$(".plus").html(words[lang]['plus']);
		
		$(".unlimited").html(words[lang]['unlimited']);
		
		$(".get-plus").html(words[lang]['get-plus']);
		
		
		$(".level-step").html(words[lang]['zero-level']); //level sistemi duzelende bu da sertle deyisecek

		$("#contact-us").html(words[lang]['contact-us']);

		$("#invite").html(words[lang]['invite']);

		$("#rate").html(words[lang]['rate']);

		$(".settings").html(words[lang]['settings']);


		$(".step").html(words[lang]['step']);

		$(".level-txt").html(words[lang]['level']);

		$(".start-lesson").html(words[lang]['start']);

		$(".skip-level-txt").html(words[lang]['skip-level-txt']);

		$(".skip-level-span").html(words[lang]['skip-level-span']);

		$(".use-gem").html(words[lang]['use-gem']);

		$(".unlimited-test").html(words[lang]['unlimited-test']);

		$(".no-thanks-l").html(words[lang]['no-thanks']);

		$("#easy").html(words[lang]['easy']);
		
		$("#easy-time").html(words[lang]['easy-time']);
		
		$("#average").html(words[lang]['average']);
		
		$("#average-time").html(words[lang]['average-time']);
		
		$("#serious").html(words[lang]['serious']);
		
		$("#serious-time").html(words[lang]['serious-time']);

		$("#crazy").html(words[lang]['crazy']);
		
		$("#crazy-time").html(words[lang]['crazy-time']);

		$(".save").html(words[lang]['save']);
		
		$("#profile-title").html(words[lang]['profile']);

		$("#finish-lig").html(words[lang]['finish-lig']);

		$("#shop").html(words[lang]['shop']);

		$(".app-name").html(words[lang]['app-name']);

		$("#get-plus-shop").html(words[lang]['get-plus-shop']);

		$(".upgrade").html(words[lang]['upgrade']);

		$("#get-shielt-title").html(words[lang]['get-shielt-title']);

		$("#get-shielt-txt").html(words[lang]['get-shielt-txt']);

		$("#health-update").html(words[lang]['health-update']);

		$("#health-update-txt").html(words[lang]['health-update-txt']);

		$("#get-ads").html(words[lang]['get-ads']);


		$("#double-skill-title").html(words[lang]['double-skill-title']);

		$("#double-skill-txt").html(words[lang]['double-skill-txt']);

		$("#unlimited-health").html(words[lang]['unlimited-health']);

		$("#buy-plus").html(words[lang]['buy-plus']);

		$(".name").html(words[lang]['name']);

		$(".username").html(words[lang]['username']);

		$(".email").html(words[lang]['email']);

		$(".password").html(words[lang]['password']);

		$(".name-input").attr("placeholder",words[lang]['name-input']);

		$(".username-input").attr("placeholder",words[lang]['username-input']);

		$(".email-input").attr("placeholder",words[lang]['email-input']);

		$(".password-input").attr("placeholder",words[lang]['pass-input']);

		$("#privacy").html(words[lang]['privacy']);


		$(".continue").html(words[lang]['continue']); 

		$(".lesson-completed").html(words[lang]['lesson-completed']);

		$("#combo").html(words[lang]['combo']);

		$("#double-skill-ads").html(words[lang]['double-skill-ads']);

		$(".reward").html(words[lang]['double-reward']);

		$("#ads-txt").html(words[lang]['ads-txt']);

		$("#buy-plus-txt").html(words[lang]['buy-plus-txt']);

		$("#select-picture").html(words[lang]['select-picture']);


	}


});