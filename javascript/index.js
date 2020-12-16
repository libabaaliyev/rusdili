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
	reset_lesson 	= $(".reset-lesson")
	countLesson 	= $("#countLesson");
	limit 			= $("#limits");

	bodyHeight 		= $(window).height();
	windowWidth		= $(window).width();
	bodyWidth		= $("body").width();
	opening 		= false;
	selectStep 		= -1;
	selectGrade 	= -1;

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
		func_lesson_info("close");

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
		
		if(selectStep == $(this).data("step") && selectGrade == $(this).data("grade")){
			func_lesson_info("close");

		}
		else
		{
			selectGrade = $(this).data("grade");
			selectStep 	= $(this).data("step");
			y_lesson 	= $(this).offset().top;
			objectLeft 	= $(this).offset().left;

			if(plan.length > 0){
				isHave = search_plan(selectGrade,selectStep);
				if(isHave!= -1)
					currentExam = isHave.exam;
				else
					currentExam = 0;

			}
			else
				currentExam = 0;
			
			countLesson.html(currentExam+"/"+count_l);

			if(currentExam == count_l){
				skip_lesson.hide();
				start_lesson.data("mission","reset");
				start_lesson.html(words[lang]['reset']);
			}
			else
			{
				
				skip_lesson.show();
				start_lesson.data("mission","start");
				start_lesson.html(words[lang]['start']);
				
			}

			func_lesson_info("open",y_lesson,objectLeft);
			
		}
		e.stopPropagation();
		
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
		user.aim 			= aim;
		localStorage.user 	= JSON.stringify(user);		
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
		mission = $(this).data("mission");			
		goLesson(mission);
	});

	function func_lesson_info(category,posY,objLeft)
	{
		
		if(category == "open")
		{
			if(windowWidth>1050)
			{			
				objLeft 	= objLeft - ((windowWidth - bodyWidth)/2);
			}
			
			if(objLeft>(bodyWidth/2+40)){

				lesson_info_tab.css("left",(objLeft-140));
			}
			else
			{
				if(windowWidth<1050)
				{
					f = (bodyWidth/2+40) - objLeft;
					if(f>100)
						f = 20;
					else if(f>60 && f<100)
						f = 30;
					lesson_info_tab.css("left",f);
				}
				else
					lesson_info_tab.css("left",objLeft);
				
			}

			lesson_info.css(
			{
				"top": (posY-25)+"px"
			});

			l_a_top.css(
			{
				"left": (objLeft+25)+"px"

			});

			if((bodyHeight - posY) < 200)
				$("html, body").animate({ scrollTop: (posY-200) }, 1000);

			setTimeout(function()
			{
				if(!opening)
				{
					opening = true;
					lesson_info.fadeIn();
				}
			});
			

		}
		else
		{
				
			if(opening){
				opening = false;
				lesson_info.fadeOut();
				selectStep 	= -1;
				selectGrade = -1;
			}
		}
	}

	function goLesson(e)
	{

		if(e=="reset")
		{
			isHave 				= search_plan(selectGrade,selectStep);
			h 					= isHave.i;
			countExam 			= JSON.parse(plan[h]['exam']);
			user.crown 			= JSON.parse(user.crown) - countExam;
			plan[h]['exam'] 	= 0;
			localStorage.plan 	= JSON.stringify(plan);
			localStorage.user 	= JSON.stringify(user);


		}
		exam_data.grade 		= selectGrade;
		exam_data.step 			= selectStep;
		exam_data.category 		= 'step-by-step';
		localStorage.examing 	= JSON.stringify(exam_data);
		window.location = "lessons.html";
	}

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
				
				countCrown = '';
				crownCss = '';
				if(plan.length>0)
				{
					isHave = search_plan(i,k);

					if(isHave != -1){
						cStep = isHave.step;
						cExam = isHave.exam;
						if(cExam != 0){
							crownCss = 'gold'
							countCrown = cExam;
						}
					}					
					
				}
				else{
					
					cStep = -1;
					
				}

				if(k == cStep)
					activation = "bg-active"
				
				else
					activation = "bg-passive";



				castles = `<li class="`+activation+`" data-count="`+count_lesson+`" data-grade="`+i+`" data-step="`+k+`">
								<div class="castle-border"></div>
								<div class="query-into">
									<i class="fas fa-shoe-prints fa-rotate-90"></i>
								</div>
								<div class="query-crown">
									<i class="`+crownCss+` txt-shadow fas fa-crown"></i> <span>`+countCrown+`</span>
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
			if(plan[i]['grade'] == e && plan[i]['step'] == v){

				result = 
				{
					"i": i,
					"grade": e,
					"step": v,
					"exam": plan[i]['exam']
				}

				return result;
			}
			else
			{
				if(i == (plan.length - 1))
					return -1;
			}
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