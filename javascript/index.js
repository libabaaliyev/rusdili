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
	countLesson 	= $("#countLesson");

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
	plan 			= JSON.parse(localStorage.plan);

	aim 			= user.aim;
	grade 			= user.grade;
	

	exam_data = {};

	body.click(function()
	{
		if(opening){
			opening = false;
			lesson_info.fadeOut();
		}

	})

	callOther("general","language");
	callOther("general","start_page","index");

	if(localStorage.getItem("day_aim"))
		day_aim = JSON.parse(localStorage.day_aim);
	else
	{
		
		callOther("general","aim_setting","index");
	}

	create_level();
	lesson 	= $(".level-query li");


	lesson.click(function(e)
	{
		count_l 	= $(this).data("count");
		selectGrade = $(this).data("grade");
		selectStep 	= $(this).data("step");

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
			
			
			countLesson.html("0/"+count_l);
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

		callOther("general","aim_setting","index");
	});

	aim_save.click(function()
	{
		aim_tab.removeClass("slideInRight");
		aim_tab.removeClass("slideOutRight");
		aim_tab.addClass("slideOutRight");
		aim_tab.fadeOut(1000);
		user.aim = aim;
		localStorage.user = JSON.stringify(user);
		
		callOther("general","aim_setting","index");

	});

	aim_items.click(function()
	{
		aim = $(this).data("aim");
		aim_items.removeClass("active");
		$(this).addClass("active");
	});

	start_lesson.click(function()
	{
		exam_data.grade 	= selectGrade;
		exam_data.step 		= selectStep;
		exam_data.category 	= 'step-by-step';

		localStorage.examing = JSON.stringify(exam_data);
		window.location = "lessons.html";

	});

	function create_level()
	{
		if(grade == 0){
			f = 0;
			g = 4;
		}
		else
		{
			f = grade-1;
			g = grade+3;
		}


		for (var i = f; i < g; i++) {
			
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

			if(grade<5)
				k_max = 6;
			else if(grade<10)
				k_max = 9;
			else
				k_max = 12;


			castle = `<div id="castles" class="">
						<div class="castles">
							<header class="level">
								`+img_castle+`
							</header>
							<ul class="level-query" id="query`+i+`">								
							</ul>
						</div>
					  </div>`;


			$(castle).appendTo(".lessons");


			for (var k = 1; k < k_max; k++)
			{

				if (k == 1)
					count_lesson = 3;
				else
					count_lesson  = k+1

				if(count_lesson >5)
					count_lesson = 4;
				

				if(plan.length>0)
				{
					isHave = search_plan(i,k);
					
				}
				else{
					
					isHave = -1;
				}

				

				

				if(k== (isHave+1))
					activation = "bg-active"
				
				else
					activation = "bg-passive";

				castles = `<li class="`+activation+`" data-count="`+count_lesson+`" data-grade="`+i+`" data-step="`+k+`">
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

	
	function search_plan(e,v)
	{

		for (var i = 0; i < plan.length; i++) {
			
			if(plan[i]['grade'] == e && plan[i]['step'] == v)
				return i;
		}
		
	}


	function random_number(min,max)
	{
		return Math.floor(Math.random()*(max-min+1)+min);
	}

	function callOther(loc,func,funcData)
	{
		$.getScript("javascript/"+loc+".js",function(e)
		{
					
			window[func](funcData);				
		});

	}


});