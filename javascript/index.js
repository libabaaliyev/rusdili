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
	open_lock_gem	= $("#open-lock-with-gem");
	practice 		= $(".practice");
	addHeart 		= $(".add-heart");

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
	gems 			= JSON.parse(user.gem);
	crown 			= JSON.parse(user.crown);
	heart 			= JSON.parse(user.heart);
	aim 			= user.aim;
	grade 			= user.grade;


	exam_data = {};

	body.click(function()
	{
		func_lesson_info("close");
	})

	callOther("general","language");
	callOther("general","aim_setting","index");
	callOther("general","start_page","index");
	create_level();
	lesson 	= $(".level-query-li");

	
	lesson.click(function(e)
	{
		//console.log("klik lesson");
		count_l 	= $(this).data("count");
		
		if(selectStep == $(this).data("step") && selectGrade == $(this).data("grade")){
			func_lesson_info("close");
			//console.log("close");
		}
		else
		{
			//console.log("open");
			selectGrade = JSON.parse($(this).data("grade"));
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

			limitCrown = crown_limit(selectGrade);


			if(crown >= limitCrown)
				func_lesson_info("open",y_lesson,objectLeft);
			else
				callOther("general","notification","lock-castle");
			
			
		}
		e.stopPropagation();
		
	});

	skip_lesson.click(function(e)
	{

		opening = false;
		darkness.show();

		skip_tab.removeClass("slideOutDown");
		skip_tab.removeClass("slideInUp");
		skip_tab.addClass("slideInUp");
		skip_tab.show();
		e.stopPropagation();
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
		save();	
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
		goLesson(mission,'step-by-step');
	});

	practice.click(function()
	{
		mission 			= 'test';
		user.heart 			= JSON.parse(user.heart) - 1;
		save();
		goLesson(mission,'practice');

	});

	open_lock_gem.click(function(e)
	{
		lock_gems = JSON.parse($(this).data("gem"));

		if(gems >= lock_gems)
		{
			gems 				-= lock_gems;
			user.gem 			= gems;
			save();		

			goLesson("start","open-lock");
		}
		else
			callOther("general","notification","notenoughCoin");

	});

	addHeart.click(function()
	{
		if(heart<5)
			heart++;
		user.heart = heart;
		save();
		ads('reward');
	})

	function save()
	{
		localStorage.plan 		= JSON.stringify(plan);
		localStorage.user 		= JSON.stringify(user);
		callOther("general","start_page","index");
	}

	function ads(e)
	{
		console.log(e);
	}

	function crown_limit(e)
	{
		if(e < 5)
			fk = 19*e;
		else if(e < 10)
			fk = 35 * e - 45;
		else
			fk = 43 * e - 172;

		return fk;
	}

	function func_lesson_info(category,posY,objLeft)
	{
		//console.log("func"+category);
		
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
				opening = true;
				lesson_info.fadeIn();
			});
			

		}
		else
		{
				opening = false;
				lesson_info.fadeOut();
				selectStep 	= -1;
				selectGrade = -1;
			
		}
	}

	function goLesson(e,category)
	{

		if(e=="reset")
		{
			isHave 				= search_plan(selectGrade,selectStep);
			h 					= isHave.i;
			countExam 			= JSON.parse(plan[h]['exam']);
			user.crown 			= crown - countExam;
			plan[h]['exam'] 	= 0;
			
			save();
		}

		exam_data.grade 		= selectGrade;
		exam_data.step 			= selectStep;
		exam_data.category 		= category;
		localStorage.examing 	= JSON.stringify(exam_data);
		window.location 		= "lessons.html";
	}

	function create_level()
	{
		if(grade == 0){
			f = 0;
			g = 5;
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

			if(i<5)
				k_max = 6;
			else if(i<10)
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
						cGrade= isHave.grade;
						cStep = isHave.step;
						cExam = isHave.exam;
						if(cExam != 0){
							crownCss = 'gold'
							countCrown = cExam;
						}
					}					
					
				}
				else{
					cGrade = -1;
					cStep  = -1;
					
				}

				if(k == cStep && i == cGrade)
					activation = "bg-active"
				
				else
					activation = "bg-passive";
				if(countCrown !=0){
					progress_percent = 100 * (JSON.parse(countCrown)/count_lesson);

					if(Math.round(progress_percent)>=33&&Math.round(progress_percent)<40)
						progress_percent = 30;
					else if(Math.round(progress_percent)>=66&&Math.round(progress_percent)<70)
						progress_percent = 60;

					
					progress_css = "progress-"+progress_percent;
				}
				else
					progress_css = 'progress-0';
				
				
				twice = '';
				if(k % 8 == 0)
					twice = "twice";

				limitCrown = crown_limit(i);

				if(crown < limitCrown)
					openingCss = 'bg-p';
				else
					openingCss = '';



				castles = `<li class="`+activation+` `+twice+` level-query-li" data-count="`+count_lesson+`" data-grade="`+i+`" data-step="`+k+`">
								<div class="castle-border `+progress_css+`"></div>
								<div class="query-into `+openingCss+`">
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