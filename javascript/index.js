$(document).ready(function()
{
	body 			= $("body");
	darkness		= $(".darkness");
	
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

	limit 			= $("#limits");

	bodyHeight 		= $(window).height();
	windowWidth		= $(window).width();
	bodyWidth		= $("body").width();
	opening 		= false;

	//localStorages
	notifications 	= JSON.parse(localStorage.notifications);
	lang 			= JSON.parse(localStorage.applang);
	words 			= JSON.parse(localStorage.appLanguage);
	user 			= JSON.parse(localStorage.user);

	aim 			= user.aim;
	grade 			= user.grade;

	day_aim 		=
	{
		etalon  	: 50,
		getting 	: 0,
		time 		: 0
	}


	body.click(function()
	{
		if(opening){
			opening = false;
			lesson_info.fadeOut();
		}

	})

	callOther("general","language");
	callOther("general","start_page","index");

	aim_setting();
	create_level();
	lesson 	= $(".level-query li");

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
				if(windowWidth<1050)
				{
					f = (bodyWidth/2+40) - objectLeft;
					if(f>100)
						f = 20;
					else if(f>60 && f<100)
						f = 30;
					lesson_info_tab.css("left",f);
				}
				else
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

		aim = user.aim;

		aim_setting();
	});

	aim_save.click(function()
	{
		aim_tab.removeClass("slideInRight");
		aim_tab.removeClass("slideOutRight");
		aim_tab.addClass("slideOutRight");
		aim_tab.fadeOut(1000);
		user.aim = aim;
		localStorage.user = JSON.stringify(user);
		aim_setting();

	});

	aim_items.click(function()
	{
		aim = $(this).data("aim");
		aim_items.removeClass("active");
		$(this).addClass("active");
	});

	start_lesson.click(function()
	{
		window.location = "lessons.html";
	});


	function aim_setting()
	{		
		aim 	= user.aim;
		level 	= user.level;		
		$(".aim ul li").removeClass("active");
		$("#"+aim+"-x").addClass("active");

		if(aim == "easy")
		{
			if(level == "zero")
			{
				day_aim.etalon = 15;
			}
			else
			{
				day_aim.etalon = 30;
			}
		}
		else if(aim == "average")
		{
			if(level == "zero")
			{
				day_aim.etalon = 35;
			}
			else
			{
				day_aim.etalon = 50;
			}
		}
		else if(aim == "serious")
		{
			if(level == "zero")
			{
				day_aim.etalon = 45;
			}
			else
			{
				day_aim.etalon = 70;
			}
		}
		else if(aim == "crazy")
		{
			if(level == "zero")
			{
				day_aim.etalon = 60;
			}
			else
			{
				day_aim.etalon = 100;
			}
		}

		limit.html(day_aim.getting+"/"+day_aim.etalon);

	}

	function create_level()
	{
		for (var i = grade; i < (grade + 2); i++) {
			
			if(i == 0)
			{
				img_castle = `<img src="img/icons/castle-2.png">
								<label></label>`
			}
			else
			{
				img_castle = `<img src="img/icons/castle-4.png">
								<label>`+i+`</label>`
			}

			castle = `<div id="castles">
						<div class="castles">
							<header class="level">
								`+img_castle+`
							</header>
							<ul class="level-query" id="query`+i+`">								
							</ul>
						</div>
					  </div>`;


			$(castle).appendTo(".lessons");

			for (var k = 1; k < 6; k++) {
				
				castles = `<li>
								<div class="castle-border"></div>
								<div class="query-into">
									<i class="fas fa-shoe-prints fa-rotate-90"></i>
								</div>
								<div class="query-crown">
									<i class="txt-shadow fas fa-crown"></i> <span></span>
								</div>
								<div class="query-info">
									<h4><span class="step"><!-- Adım --></span> `+k+`</h4>
								</div>
							</li>`

				$(castles).appendTo("#query"+i);


			}


		}
	}


	function callOther(loc,func,funcData)
	{
		$.getScript("javascript/"+loc+".js",function(e)
		{
					
			window[func](funcData);				
		});

	}


});