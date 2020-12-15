$(document).ready(function()
{
	loading_lesson	= $(".loading-lesson");
	loading_next	= $(".loading");
	main 			= $(".lesson-main");
	lesson 			= $(".lesson");
	continue_lesson = $(".continue-lesson")
	lesson_success	= $(".lesson-success");
	success_body	= $(".success-body")
	success_gem		= $(".success-gem");
	adsense_tab 	= $(".adsense");
	continue_succes = $(".continue-success");
	result 			= $("#answer-result");
	
	answer_tab 		= $(".answer");
	progressBar		= $("#progress-exam");
	progressAim		= $("#progress-aim");
	question_categ 	= $("#question_txt");
	question_txt 	= $("#question");


	rewardBtn		= $(".reward");
	skipAd 			= $(".no-thanks");
	close 			= $(".close-lesson")
	
	etalon 			= 3;
	current			= 1;
	correct_count 	= 0;	
	hash 			= location.hash.substr(1);

	user 			= JSON.parse(localStorage.user); 
	lang 			= JSON.parse(localStorage.applang); 
	transl 			= JSON.parse(localStorage.appLanguage);
	words 			= JSON.parse(localStorage.words);
	sentences 		= JSON.parse(localStorage.sentences);
	day_aim 		= JSON.parse(localStorage.day_aim);
	plan 			= JSON.parse(localStorage.plan);

	etalon_aim 		= JSON.parse(day_aim.etalon);
	getting_aim		= JSON.parse(day_aim.getting);
	

	userLevel		= user.level;

	callOther("general","start_page","index");

	var rus_latin 	= 
	{
		"Ф":"F","ф":"f","Ы":"I","ы":"ı","В":"V","в":"v","А":"A","а":"a","П":"P","п":"p","Р":"R","р":"r",
		"О":"O","о":"o","Л":"L","л":"l","Д":"D","д":"d","Ж":"J","ж":"j","Э":"E","э":"e","Я":"Ya",
		"я":"ya","Ч":"Ç","ч":"ç","С":"S","с":"s","М":"M","м":"m","И":"İ","и":"i","Т":"T","т":"t",
		"Ь":":","ь":":","Б":"B","б":"b","Ю":"Yu","ю":"yu","Й":"Y","й":"y","Ц":"Ts","ц":"ts","У":"U","у":"u",
		"К":"K","к":"k","Е":"Ye","е":"e","Н":"N","н":"N","Г":"Q","г":"q","Ш":"Sh","ш":"sh","Щ":"Ssh","щ":"ssh","З":"Z",
		"з":"z","Х":"Kh","х":"kh","Ъ":":","ъ":":"
	};

	
	

	setTimeout(function()
	{
		loading_lesson.hide();
		start(hash);
		main.show();

	},3000);

	callOther("general","language");

	$(document).on('click', '.question-answer', function()
	{
		correcting = $(this).data("answer");
		$(".question-answer").removeClass("selected");
		$(this).addClass("selected");
		answer_question = $(this).html();

		$(".question-answer").removeClass("question-answer");

		if(correcting)
			correct_count+=1;

		control_asw(correcting);

	});
	

	continue_succes.click(function()
	{
		success_body.hide();
		if(getting_aim >= etalon_aim)		
			success_gem.show();
		else
			adsense_tab.show();
	});

	rewardBtn.click(function()
	{
		
		setTimeout(function()
		{
			window.location = "main.html";
		},2000);
	});

	skipAd.click(function()
	{
		lesson_success.hide();
		success_gem.hide();
		adsense_tab.show();
	});

	close.click(function()
	{
		window.location = "main.html";
	});

	continue_lesson.click(function()
	{
		next();
	});


	function start(command)
	{
		if(command){
			if(command == "exam-get-start")
			{

				//if(userLevel == "zero")
					question("exam-start","trns","translate",100);

			}
		}			
		else if(localStorage.getItem("examing"))
		{
			exam_data 	= JSON.parse(localStorage.examing);
			grade 		= exam_data.grade;
			step 		= exam_data.step;
			category 	= exam_data.category;

			question("step-by-step","trns","translate",100);
		}
		else
		{
			window.location = "main.html";
		}
			
		
	}


	function question(exam,cat,comm,q)
	{
		que = random_number(1,JSON.parse(q));
		question_categ.html(transl[lang][comm]);
		
		if(exam == "exam-start")
		{

			question_t 			= words[lang][que][cat];
			question_general 	= words[lang][que];
			question_txt.html(question_t);
			
			if(cat == "orgn")
				category = "trns";
			else
				category = "orgn";

			answers_all(question_general,category,comm);

		}
		else if(exam == "step-by-step") //burani duzeldecem
		{
			question_t 			= words[lang][que][cat];
			question_general 	= words[lang][que];
			question_txt.html(question_t);
			
			if(cat == "orgn")
				category = "trns";
			else
				category = "orgn";

			answers_all(question_general,category,comm);
		}
	}

	function answers_all(q,cat,command)
	{
		$("#answers").html("");

		qq = random_number(1,4);

		for (var i = 1; i < 5; i++) {
			
			que = random_number(1,words[lang].length);
			
			if(command == "translate")
			{
				answ_txt 		= words[lang][que][cat];
				correct_answ 	= q[cat];			
			}

			if(i == qq)
				answ_html = `<span class="form-button text-dark question-answer" data-answer="true">`+correct_answ+`</span>`;
			else
				answ_html = `<span class="form-button text-dark question-answer" data-answer="false">`+answ_txt+`</span>`;

			$(answ_html).appendTo("#answers");

		}
	}

	function convert_latin(word)
	{

		str_array = word.split('');

        for(var i=0; i < str_array.length; i++) {
            str_array[i] = rus_latin[ str_array[i] ] || str_array[i];
        }

        str = str_array.join('');
	    
	 	return str;
	}

	
	function control_asw(answ)
	{
		answer_tab.removeClass("bg-true");
		answer_tab.removeClass("bg-false");
		answer_tab.addClass("bg-"+answ);

		if(!answ){
			heart-=1;
			user.heart = heart;
			localStorage.user = JSON.stringify(user);
			callOther("general","start_page","index");
		}
		result.html(transl[lang][answ+"-answer"]);
		answer_tab.fadeIn();
	}

	function next()
	{
		current++;
		percent = (current/etalon)*100;

		progressBar.css("width",percent+"%");

		if(percent >= 100)
			finish();

		
		$(".question-answer").removeClass("selected");

		answer_tab.fadeOut();

		/*if(hash == "exam-get-start")
		{*/
			if(userLevel == "zero"){
				
				max = grade*10+100;
				
			}
			else
			{
				max = max = grade*10+200;

			}
		/*}*/

		if(words.length<max)
			max = words.length;

		if(current%2 == 0){
					
			question("exam-start","trns","translate",max);
		}
		else{

			question("exam-start","orgn","translate",max);
		}

	}


	function finish()
	{
		if(hash == "exam-get-start")
		{
			loading_next.show();

			if(correct_count>5)
			{
				if(correct_count>8){

					if(correct_count == 10)
						callOther("general","notification","exam-finish","excellent");
					
					else
						callOther("general","notification","exam-finish","very-good");

				}
				else
					callOther("general","notification","exam-finish","good");
			}
			else
			{
				if(correct_count<3)
				{
					if(correct_count<1)
						callOther("general","notification","exam-finish","so-bad");
					
					else
						callOther("general","notification","exam-finish","bad");					
				}
				else
					callOther("general","notification","exam-finish","low-good");				
			}
			

			setTimeout(function()
			{

				loading_next.hide();
				window.location = "main.html";

			},1500);

		}
		else
		{
			getting_aim 			+= 13;
			day_aim.getting 		= getting_aim;
			localStorage.day_aim 	= JSON.stringify(day_aim);
			percent 				= (getting_aim/etalon_aim)*100;
		
			if(plan.length == 0){
				
				plan_step = 
				{
					grade: grade,
					step : step,
					exam : 1
				}
				
				plan.push(plan_step);

				localStorage.plan = JSON.stringify(plan);

			}
			else{

				k = search_plan(grade,step);
				
				if(k == -1)
				{
					plan_step = 
					{
						grade: grade,
						step : step,
						exam : 1
					}
					
					plan.push(plan_step);
				}
				else					
					plan[k]['exam'] = JSON.parse(plan[k]['exam'])+1;

				
				localStorage.plan = JSON.stringify(plan);
				
			}




			progressAim.css("width",percent+"%");
			main.fadeOut();
			lesson_success.fadeIn();
		}
		
	}

	function search_plan(e,v)
	{
		for (var i = 0; i < plan.length; i++) {
			
			if(plan[i]['grade'] == e && plan[i]['step'] == v)
				return i;
			else{
				if(i == (plan.length - 1))
				{
					k = -1;
					return k;
				}

			}

		}
		
	}

	function callOther(loc,func,funcData,funcData_1)
	{

		$.getScript("javascript/"+loc+".js",function(e)
		{
			window[func](funcData,funcData_1);				
		});

	}

	function random_number(min,max)
	{
		return Math.floor(Math.random()*(max-min+1)+min);
	}


});