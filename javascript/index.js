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
	invite 			= $("#invite");
	gemCount		= $(".gem-count");

	bodyHeight 		= $(window).height();
	windowWidth		= $(window).width();
	bodyWidth		= $("body").width();
	opening 		= false;
	selectStep 		= -1;
	selectGrade 	= -1;

	//localStorages
	notifications 	= JSON.parse(localStorage.notifications);
	day_aim 		= JSON.parse(localStorage.day_aim);
	day_use 		= JSON.parse(localStorage.day_use);
	achieveData		= JSON.parse(localStorage.achieve);
	achievements 	= JSON.parse(localStorage.achievements);
	lang 			= JSON.parse(localStorage.applang);
	words 			= JSON.parse(localStorage.appLanguage);
	user 			= JSON.parse(localStorage.user);
	plan 			= JSON.parse(localStorage.plan);
	gems 			= JSON.parse(user.gem);
	crown 			= JSON.parse(user.crown);
	heart 			= JSON.parse(user.heart);
	aim 			= user.aim;
	grade 			= JSON.parse(user.grade);
	achieve_tag 	= ["grade-master","crown-master","unerror","friendly","week","full-aim","month","knight"];

	date  			= new Date();
	currentYear		= date.getFullYear();
	currentMonth 	= date.getMonth()+1;
	currentDay 		= date.getDate();

	currentDate		= currentDay + "." + currentMonth + "." + currentYear;


	exam_data = {};

	body.click(function()
	{
		func_lesson_info("close");
	});

	callOther("general","language");
	callOther("general","aim_setting","index");
	callOther("general","start_page","index");
	grade_control();
	create_level();
	create_achievement();

	lesson 	= $(".level-query-li");
	hash 	= location.hash.substr(1);

	if(hash){
		if(heart == 0)
			callOther("general","notification",hash);
		else
			if(hash != 'notenoughHeart')
				callOther("general","notification",hash);
	}

	invite.click(function()
	{		
		achieveData['friendly'] = JSON.parse(achieveData['friendly']) + 1;
		save();
	});

	$(document).on('click', '.collect-gems', function()
	{
		count_add_gems 		= $(this).data("add");
		tag 				= $(this).data("tag");
		achieveData[tag] 	= 0;


		addGems(count_add_gems)
		save();
		create_achievement();
	});
	
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
	});

	

	function save()
	{
		localStorage.achieve 	= JSON.stringify(achieveData);
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
		if(e < 6)
			fk = 19*e;
		else if(e < 11)
			fk = 31 * e - 60;
		else
			fk = 43 * e - 180;

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
				
		f = grade;
		g = grade+7;	

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

			
			k_max = count_step(i);


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

				twice = '';
				if(k % 8 == 0)
					twice = "twice";

				count_lesson = count_l(k);
				crownData 	 = find_crown(i,k,count_lesson);
				countCrown 	 = crownData.count_crown;
				crownCss 	 = crownData.crown_css;
				activation	 = crownData.activation;
				progress_css = crownData.progress_css;			
				limitCrown 	 = crownData.limit_crown;	
				openingCss 	 = crownData.opening_css;


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
	
	
	function create_achievement()
	{
		$("#achievements li").remove();
		for (var i = 0; i < achieve_tag.length; i++) {
			
			tag 		= achieve_tag[i];
			standart 	= achievements[lang][tag]['limit'];
			rewardAch 	= achievements[lang][tag]['reward'];
			nameAch		= achievements[lang][tag]['name']; 
			descAch 	= achievements[lang][tag]['desc'];	
			ex_current 	= 0;
			percent 	= 0;
			
			
			if(tag == 'crown-master')
			{
				standart 	= crown_limit((grade + 1)) - crown_limit((grade));
				ex_current 	= achieveData[tag];
			}			
			else if(tag == 'week')
			{
				if(achieveData[tag] == true)
					ex_current = day_count(7);
			}
			else if(tag == 'full-aim')
			{
				standart 	= JSON.parse(day_aim.etalon);
				ex_current 	= achieveData[tag];
			}
			else if(tag == 'month')
			{									
				if(achieveData[tag] == true)
					ex_current = day_count(30);				
			}			
			else
			{
				ex_current = achieveData[tag];
			}

			if(ex_current!=0)
				percent 	= (ex_current/standart)*100;

			progress_btn = `<span>`+ex_current+`/`+standart+`</span>
							<div class="progress-bar">
								<div class="progress-bar-active" style="width: `+percent+`%">									
								</div>
							</div>`

			btn 	= `<label class="form-button btn-pr collect-gems" data-tag="` + tag + `" data-add="` + rewardAch + `"><i class="fas fa-gem fa-beat"></i></label>`;

			if(percent >= 100)
				progress_btn = btn;

			achieve = `<li>
							<section class="archive">
								<figure class="archive-img bg-`+i+`">
									<img src="img/achievement/`+tag+`.png">
								</figure>
								<div class="archive-data">									
										<div class="info-head">
											<h4 class="text-left">` + nameAch + `</h4>											
										</div>
										<div class="info-head">
											<span class="weight-normal f-s-12 light-f">` + descAch + `</span>
										</div>
										<div class="info-body">`+progress_btn+`</div>
								</div>
							</section>
						</li>`

			$(achieve).appendTo("#achievements");
		}

	}

	function day_count(c)
	{
		x = 1;
		if(day_use.length > 0)
		{
			for (var f = 0; f < c; f++)
			{
				day_x 		= JSON.parse(currentDay) - f;
				controlDay 	= day_control(currentYear,currentMonth,day_x);
				
				if(controlDay!=-1)
					x++;

			}
		}

		return x
	}

	function day_control(y,m,d)
	{
		for (var i = 0; i < day_use.length; i++) {
			if(day_use[i]['year'] == y && day_use[i]['month'] == m && day_use[i]['day'] == d){
		
				return i;
				break;
			}
			else{
				if(i == (day_use.length - 1))
					return -1;

			}
		}
	}

	function count_step(i)
	{
		if(i<5)
			x = 6;
		else if(i<10)
			x = 9;
		else
			x = 12;

		return x;
	}

	function count_l(k)
	{
		if (k == 1)
			x = 3;
		else
			x  = k + 1;

		if(x > 5)
			x = 4;

		return x;
	}

	function find_crown(i,k,count_lesson)
	{
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

		
		if(i == grade)
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



		limitCrown = crown_limit(i);

		if(crown < limitCrown)
			openingCss = 'bg-p';
		else
			openingCss = '';

		return {
					'crown_css'		: crownCss,
					'count_crown'	: countCrown,
					'activation'	: activation,
					'progress_css'	: progress_css,
					'limit_crown'	: limitCrown,
					'opening_css'	: openingCss

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

	
	function grade_control()
	{
		g1 			= 0;
		count_exam 	= 0;
		g2 			= count_step(grade) - 1;

		for (var i = 0; i < plan.length; i++) {
			if(plan[i]['grade'] == grade){
				count_exam += JSON.parse(plan[i]['exam']);
				g1++;
			}
		}

		if(g1 == g2)
		{

			if(count_exam == 19 && g2 == 5 || count_exam == 31 && g2 == 8 || count_exam == 43 && g2 == 11){
				callOther("general","notification","full-grade");
				grade++;
				achieveData['grade-master'] = JSON.parse(achieveData['grade-master']) + 1;
				achieveData['knight'] = JSON.parse(achieveData['knight']) + 1;
				user.grade = grade;
				save();
			}
		}
	}

	e1 = 0;
	function addGems(e)
	{
		
		setTimeout(function()
		{
			e1++;
			user.gem = JSON.parse(user.gem) + 1;
			gemCount.html(user.gem);
			if(e1 != e)
				addGems(e);
			else{
				e1=0;
				save();
			}

		},(150/(e1+1)));
	}

	function random_number(min,max)
	{
		return Math.floor(Math.random()*(max-min+1)+min);
	}

	function callOther(loc,func,funcData,funcData_1)
	{
		$.getScript("javascript/"+loc+".js",function(e)
		{					
			window[func](funcData,funcData_1);				
		});
	}


});