$(document).ready(function()
{
	loading_lesson	= $(".loading-lesson");
	loading_next	= $(".loading");
	main 			= $(".lesson-main");
	learning		= $(".lesson-learn");
	orginal			= $(".orgn");
	translating 	= $(".trns");
	transkript 		= $(".trnsk");
	knowing			= $(".know");
	

	lesson 			= $(".lesson");
	continue_lesson = $(".continue-lesson");
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
	close 			= $(".close-lesson");
	
	etalon 			= 3;
	current			= 1;
	correct_count 	= 0;	
	queque 			= 0;
	queLater 		= 0;
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

	callOther("general","start_page","index","lesson");
	callOther("general","language");

	var rus_latin 	= 
	{
		"Ф":"F","ф":"f","Ы":"I","ы":"ı","В":"V","в":"v","А":"A","а":"a","П":"P","п":"p","Р":"R","р":"r",
		"О":"O","о":"o","Л":"L","л":"l","Д":"D","д":"d","Ж":"J","ж":"j","Э":"E","э":"e","Я":"Ya",
		"я":"ya","Ч":"Ç","ч":"ç","Чт":"Ş","чт":"ş","С":"S","с":"s","М":"M","м":"m","И":"İ","и":"i","Т":"T","т":"t",
		"Ь":":","ь":":","Б":"B","б":"b","Ю":"Yu","ю":"yu","Й":"Y","й":"y","Ц":"Ts","ц":"ts","У":"U","у":"u",
		"К":"K","к":"k","Е":"Ye","е":"e","ё":"yo","Н":"N","н":"N","Г":"Q","г":"q","Ш":"Sh","ш":"sh","Щ":"Ssh","щ":"ssh","З":"Z",
		"з":"z","Х":"Kh","х":"kh","Ъ":":","ъ":":"
	};

	
	

	setTimeout(function()
	{
		loading_lesson.hide();
		start(hash);
		/*learning.show();*/


	},10);

	later = [];
	qx = 0;
	knowing.click(function()
	{
		action = $(this).data("action");
		
		if(action == "later")
			later.push((queque));

		if(queque >= maxQue){
			if(qx<later.length){
				
				queLater = later[qx];
				learning_func(later);
				qx++;
			}
			else{
				learning.hide();
				main.show();
				question('step-by-step',"trns","translate",maxQue);
			}
		}
		else{
			queque++;
			learning_func();
		}
	});

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
		//reklam funksiyasindan save verecik
		save();
	});

	skipAd.click(function()
	{
		lesson_success.hide();
		success_gem.hide();
		adsense_tab.show();
	});

	close.click(function()
	{			
		save();
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

				if(userLevel == "zero")
					question("exam-start","trns","translate",100);
				else
					question("exam-start","trns","translate",words[lang].length);

				main.show();

			}
		}			
		else if(localStorage.getItem("examing"))
		{
			exam_data 	= JSON.parse(localStorage.examing);
			grade 		= JSON.parse(exam_data.grade);
			step 		= JSON.parse(exam_data.step);
			exam_i 		= search_plan(grade,step);
			(exam_i == -1) ? exam = 0 : exam = plan[exam_i]['exam'];			
			category_e 	= exam_data.category;


			minQue = selectQue("min",grade,step,exam);
			maxQue = selectQue("max",grade,step,exam);


			if(category_e == "step-by-step")
			{
				queque = minQue;
				console.log(minQue+"-"+maxQue)
				learning.show();
				learning_func();
			}
			else
			{
				maxQue = 100;
				minQue = 0;
				main.show();
				question(category_e,"trns","translate",maxQue);
			}
			
		}
		else
		{
			window.location = "main.html";
		}
	}

	function save()
	{

		base = new FormData();
		base.append("info","update-datas");
		base.append("data",JSON.stringify(user));
		base.append("plan",JSON.stringify(plan));
		callOther("general","importBase",base,user,"update");
	}

	function learning_func(e)
	{
		if(grade < 15)
		{
			word_learn(e);
		}
	}

	
	function word_learn(e)
	{
		if(e)
			q = queLater;
		else
			q = queque;
		newWord_orgn  = words[lang][q]['orgn']; 
		newWord_trns  = words[lang][q]['trns'];
		newWord_trnsk =	convert_latin(newWord_orgn);
		
		orginal.html(newWord_orgn);
		translating.html(newWord_trns);
		transkript.html(newWord_trnsk);
	}

	function question(exam,cat,comm,q)
	{
		
		question_categ.html(transl[lang][comm]);
		
		//buralari duzeldecem
		if(exam == "exam-start")
		{
			que = random_number(0,JSON.parse(q));
		}
		else if(exam == "step-by-step") 
		{
			

			que = random_number(minQue,JSON.parse(q));
			etalon = 20;
		}
		else if(exam == "open-lock")
		{
			que = random_number(0,JSON.parse(q));
			etalon = 5;			
			
		}
		else if(exam == "practice")
		{
			que = random_number(0,JSON.parse(q));
			etalon *=2;
		}


		question_t 			= words[lang][que][cat];
		question_general 	= words[lang][que];
		question_txt.html(question_t);
		
		if(cat == "orgn")
			category = "trns";
		else
			category = "orgn";

		answers_all(question_general,category,comm);

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
	    
	 	return "["+str+"]";
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
			callOther("general","start_page","index","lesson");
		}
		result.html(transl[lang][answ+"-answer"]);
		answer_tab.fadeIn();
	}

	function next()
	{
		if(correcting)
			current++;
		percent = (current/etalon)*100;

		progressBar.css("width",percent+"%");

		if(percent >= 100)
			finish();

		
		$(".question-answer").removeClass("selected");

		answer_tab.fadeOut();

		if(hash)
		{
			if(hash == "exam-get-start")
			{
				if(userLevel == "zero"){
					
					max = grade*10+100;
					
				}
				else
				{
					max = grade*10+200;

				}

				if(words.length<max)
					max = words[lang].length;
			}
			else
				max = words[lang].length;
			

			if(current%2 == 0){					
				question("exam-start","trns","translate",max);
			}
			else{

				question("exam-start","orgn","translate",max);
			}
		}
		else
		{
			question(category_e,"trns","translate",maxQue);
		}
	}

	function finish()
	{
		grade 		= JSON.parse(exam_data.grade);
		step 		= JSON.parse(exam_data.step);

		
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
			bonus = JSON.parse(grade)*2+18 + JSON.parse(step);
			combo = JSON.parse(grade)*2+10;

			if(bonus > 50)
				bonus = 50;

			if(combo > 20)
				combo = 20;

			if(category_e == "step-by-step" || category_e == "open-lock"){


				getting_aim 			+= (bonus+combo);
				$(".level-bonus").html("+" + bonus);
				$(".combo-bonus").html("+" + combo);
				
				day_aim.getting 		= getting_aim;
				addCrown = 1;

				if(category_e == 'open-lock')
				{
					if (step == 1)
						examCount = 3;
					else
						examCount  = step+1;


					if(examCount >5)
						examCount = 4;

				}
				else if(category_e == 'step-by-step')
					examCount = 1;


					if(plan.length == 0)
					{
						plan_step = 
						{
							grade: grade,
							step : step,
							exam : examCount
						}
						
						addCrown = examCount;

						plan.push(plan_step);
						localStorage.plan = JSON.stringify(plan);

					}
					else
					{	
						k = search_plan(grade,step);
						if(k == -1)
						{
							
							plan_step = 
							{
								grade: grade,
								step : step,
								exam : examCount
							}
							addCrown = examCount;

							plan.push(plan_step);
						}
						else
						{
							addCrown = examCount;
							
							if(category_e == "open-lock")
								plan[k]['exam'] = examCount;
							else if(category_e == "step-by-step")
								plan[k]['exam'] = plan[k]['exam'] + examCount;
						}
						
						
					}

				console.log(addCrown);
				user.crown 	= JSON.parse(user.crown)+addCrown;

				
			}
			else
			{
				$(".level-bonus").html("+0");
				$(".combo-bonus").html("+0");
			}

			user.gem				= JSON.parse(user.gem) + (bonus+combo);
			localStorage.day_aim 	= JSON.stringify(day_aim);
			localStorage.plan 		= JSON.stringify(plan);
			localStorage.user 		= JSON.stringify(user);
			percent 				= (getting_aim/etalon_aim)*100;
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

	function selectQue(e,g,s,ex)
	{
		
		xMin = g*190 + (s-1)*30 + ex*10;
		xMax = xMin+10;
		
		if(xMax > words[lang].length){
			xMax = words[lang].length;
			xMin = 0;
		}

		
		if(e=="min")
			return xMin;
		else
			return xMax;

	}

	function callOther(loc,func,funcData,funcData_1,funcData_2)
	{

		$.getScript("javascript/"+loc+".js",function(e)
		{
			window[func](funcData,funcData_1,funcData_2);				
		});
	}

	function random_number(min,max)
	{
		return Math.floor(Math.random()*(max-min+1)+min);
	}


});