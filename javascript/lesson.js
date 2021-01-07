$(document).ready(function()
{
	loading_lesson	= $(".loading-lesson");
	loading_next	= $(".loading");
	main 			= $(".lesson-main");
	learning		= $(".lesson-learn");
	lesson_card		= $(".learning-card");
	ready			= $(".yes-ready");
	get_start 		= $(".get-start");
	orginal			= $(".orgn");
	translating 	= $(".trns");
	transkript 		= $(".trnsk");
	knowing			= $(".know");
	lesson 			= $(".lesson");
	play_txt 		= $(".play-text");
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
	
	etalon 			= 2; //default 20
	cQuestions 		= 10;
	current			= 1;
	bonus_gem 		= 20;
	correct_count 	= 0;	
	queque 			= 0;
	queLater 		= 0;
	question_data 	= [];
	later 			= [];
	qx 				= 0;
	question_que 	= 0;

	hash 			= location.hash.substr(1);
	date  			= new Date();	
	currentYear		= date.getFullYear();
	currentMonth 	= date.getMonth()+1;
	currentDay 		= date.getDate();

	currentDate		= currentDay + "." + currentMonth + "." + currentYear;

	day_use			= JSON.parse(localStorage.day_use);
	achieveData		= JSON.parse(localStorage.achieve);
	skills 			= JSON.parse(localStorage.market);
	user 			= JSON.parse(localStorage.user);
	crown 			= JSON.parse(user.crown);
	lang 			= JSON.parse(localStorage.applang); 
	transl 			= JSON.parse(localStorage.appLanguage);
	words 			= JSON.parse(localStorage.words);
	sentences 		= JSON.parse(localStorage.sentences);
	day_aim 		= JSON.parse(localStorage.day_aim);
	plan 			= JSON.parse(localStorage.plan);
	etalon_aim 		= JSON.parse(day_aim.etalon);
	getting_aim		= JSON.parse(day_aim.getting);
	unerror			= true;
	userLevel		= user.level;	
	rus_latin 		= 
	{
		"Ф":"F","ф":"f","Ы":"I","ы":"ı","В":"V","в":"v","А":"A","а":"a","П":"P","п":"p","Р":"R","р":"r",
		"О":"O","о":"o","Л":"L","л":"l","Д":"D","д":"d","Ж":"J","ж":"j","Э":"E","э":"e","Я":"Ya",
		"я":"ya","Ч":"Ç","ч":"ç","Чт":"Ş","чт":"ş","С":"S","с":"s","М":"M","м":"m","И":"İ","и":"i","Т":"T","т":"t",
		"Ь":":","ь":":","Б":"B","б":"b","Ю":"Yu","ю":"yu","Й":"Y","й":"y","Ц":"Ts","ц":"ts","У":"U","у":"u",
		"К":"K","к":"k","Е":"Ye","е":"e","ё":"yo","Н":"N","н":"N","Г":"Q","г":"q","Ш":"Sh","ш":"sh","Щ":"Ssh","щ":"ssh","З":"Z",
		"з":"z","Х":"Kh","х":"kh","Ъ":":","ъ":":"
	};

	s_category 		= 
	[	
		"application",	"science",	"order",	"date",	"own",	"travel",	"health",	"shopping",	"eating",	"camp",	"time",	"walking",	"meeting",	"documents",	"working",	"education",	"shelter",	"compensation"
	]	
	
	callOther("general","start_page","index","lesson");
	callOther("general","language");
	TimeShield();

	setTimeout(function()
	{
		loading_lesson.hide();
		if(hash){
			learning.hide()
			start(hash);
		}
		else if(localStorage.getItem("examing"))
		{
			exam_data 	= JSON.parse(localStorage.examing);
			category_e 	= exam_data.category;
			if(category_e == 'step-by-step' || category_e == 'sentences')
				learning.show();
			else if(category_e == 'open-lock' || category_e == 'practice')
				start();
		}

	},200);

	ready.click(function()
	{
		loading_next.show();
		setTimeout(function()
		{
			loading_next.hide();
			get_start.hide();
			start(hash);

		},100);
	});

	play_txt.click(function()
	{
		
		play_cat = $(this).data("value");

		if(play_cat == 'lesson')
			nWord = $(".orgn").html();
			
		else
			nWord = question_txt.html();

		callOther("general","sounding",nWord);
	});
	
	knowing.click(function()
	{

		action = $(this).data("action");
		if(action == 'later')
		{
			if(queque<10){
				later.push((q-1));
				queque++;
				word_learn(first_value,second_value);

			}
			else{

				if(qx>=later.length)
				{

					callOther("general","notification","go-test");
					learning.hide();
					main.show();
					question_data = shuffle(question_data);
					question(category_e,"trns","translate",maxQue);
				}
				else{
					word_learn(later[qx],second_value);
					qx++;
				}
				
			}


		}
		else
		{
			if(queque >= cQuestions)
			{
				if(later.length > 0)
				{					
					if(qx>=later.length)
					{
						callOther("general","notification","go-test");
						learning.hide();
						main.show();
						question_data = shuffle(question_data);
						question('step-by-step',"trns","translate",maxQue);
					}
					else
					{						
						word_learn(later[qx],second_value);
						qx++;
					}					
				}
				else{
					callOther("general","notification","go-test");
					learning.hide();
					main.show();
					question_data = shuffle(question_data);
					question('step-by-step',"trns","translate",maxQue);
				}
			}
			else{
				queque++;
				word_learn(first_value,second_value);
			}
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
		/*if(checkConnection() == "none" || version == "pro")
			window.location = "main.html";	
		else{*/
			if(getting_aim >= etalon_aim)		
				success_gem.show();
			else
				adsense_tab.show();			
		/*}*/
		
	});

	rewardBtn.click(function()
	{
		callOther("general","ads","reward",bonus_gem);
		//reklam funksiyasindan save verecik
		save();
	});

	skipAd.click(function()
	{
		lesson_success.hide();
		success_gem.hide();
		/*if(checkConnection() == "none")
			window.location = "main.html";	
		else*/
			adsense_tab.show();
	});

	close.click(function()
	{		
		/*if(checkConnection() == "none")
			window.location = "main.html#internet-error";
		else*/
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
				second_value 	= 'word';
				category_e 		= 'exam-start';
				if(userLevel == "zero"){
					first_value 	= 'easy';				
					question("exam-start","trns","translate",100);
				}
				else{
					first_value 	= 'normal';			
					question("exam-start","trns","translate",(words[lang].length - 1));
				}

				main.show();

			}
		}			
		else if(localStorage.getItem("examing"))
		{

			lesson_setting(category_e);

			if(category_e == "step-by-step")
			{
				minQue 		= selectQue("min",grade,step,exam);
				maxQue 		= selectQue("max",grade,step,exam);
				q 	   		= minQue				
				word_learn(first_value,second_value);
				

			}
			else if(category_e == "sentences")
			{
				learn_sentences = JSON.parse(localStorage.learn_sentences);	
				minQue 			= learn_sentences[sentence_category];
				maxQue 			= minQue + cQuestions;
				q 	   			= minQue;

				word_learn(first_value,second_value);
			}
			else if(category_e == "open-lock")
			{				
				if (step == 1)
					exam_c = 3;
				else
					exam_c  = step + 1;

				if(exam_c > 5)
					exam_c = 4;


				if(second_value == "word")
				{
					minQue 		= selectQue("min",grade,step,exam);
					maxQue 		= selectQue("max",grade,step,exam_c);
				}
				else
				{
					minQue = 0;
					maxQue = sentences[lang][sentence_category].length - 1;
				}

				
				q 	   		= minQue;
				main.show();
				question(category_e,"trns","translate",maxQue);

			}
			else if(category_e == "practice")
			{
				if(grade<5)
					step = 6;
				else if(grade<10)
					step = 9;
				else
					step = 12;


				if (step == 1)
					exam_c = 3;
				else
					exam_c  = step + 1;

				if(exam_c > 5)
					exam_c = 4;

				if(second_value == "word")
				{
					minQue 		= selectQue("min",grade,1,1);
					maxQue 		= selectQue("max",grade,step,exam_c);
				}
				else
				{
					minQue = 0;
					maxQue = sentences[lang][sentence_category].length - 1;
				}
				
				q 	   		= minQue;
				main.show();

				question(category_e,"trns","translate",maxQue);
			}
			
		}
		else
		{
			window.location = "main.html";
		}
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

	function lesson_setting(e)
	{
		exam_data 	= JSON.parse(localStorage.examing);
		grade 		= JSON.parse(exam_data.grade);
		step 		= JSON.parse(exam_data.step);

		if(grade == -1)
			grade = JSON.parse(user.grade);

		category_e 	= exam_data.category;			
		exam_i 		= search_plan(grade,step);
		(exam_i == -1) ? exam = 0 : exam = plan[exam_i]['exam'];

		if(e == "sentences")
		{
			first_value 		= 'normal';
			second_value 		= 'sentence';
			sentence_category 	= exam_data.category_1;

		}
		else
		{
			if (grade < 5)
			{
				first_value 	= 'easy';
				second_value 	= 'word';					
			}
			else if(grade >=5 && grade < 15)
			{
				first_value 		= 'normal';
				if(grade % 5 == 0){
					x 					= random_number(0,(s_category.length - 1));
					sentence_category 	= s_category[x];				
					second_value 		= 'sentence';
				}
				else{
					second_value 	= 'word';
				}
			}
			else
			{
				first_value 		= 'normal';
								x 	= random_number(0,(s_category.length - 1));
				sentence_category 	= s_category[x];				
				second_value 		= 'sentence';
			}
		}
	}

	function save()
	{
		base = new FormData();
		base.append("info","update-datas");
		base.append("data",JSON.stringify(user));
		base.append("plan",JSON.stringify(plan));
		base.append("achieve",JSON.stringify(achieveData));
		base.append("skills",JSON.stringify(skills));
		callOther("general","importBase",base,user,"update");

		$.post("process.php",
        {
            info: "import-scoreboard",
            data: JSON.stringify(day_aim),
            id: user.id,
            lang: 'ru'     
        },
        function(data)
        {
        	obj = JSON.parse(data);
        	result = obj.result;       	
        	
        });

		if(category_e == "sentences"){
			learn_sentences.sentence_category 	= maxQue;
			localStorage.learn_sentences 		= JSON.stringify(learn_sentences);
		}


        localStorage.removeItem("examing");
	}
	
	function word_learn(e,v)
	{
		
		if(e == 'normal'){
			
			if(v == 'word'){

				if(maxQue >= words[lang].length){
					q = random_number(0,(words[lang].length-1));
					preparation(v)
				}
				else
				{
					preparation(v)
					q += 1;
					if(q >= maxQue)
						q = maxQue;
				}

				
			}
			else if(v == 'sentence'){

				if(maxQue >= sentences[lang][sentence_category].length){
					q = random_number(0,(sentences[lang][sentence_category].length-1));
					preparation(v)	
				}
				else
				{
					preparation(v)
					q += 1;
					if(q >= maxQue)
						q = maxQue;
				}
				
			}
			
		}
		else if(e == 'easy'){

			preparation(v)
			q += 1;
			if(q>=maxQue)
				q = maxQue;
		}
		else{
			q =	e;
			preparation(v)
		}

	}

	function preparation(v)
	{

		if(v == 'word')
		{
			newWord_orgn  	= words[lang][q]['orgn']; 
			newWord_trns  	= words[lang][q]['trns'];
		}
		else
		{
			
			newWord_orgn  	= regulation(sentences[lang][sentence_category][q]['orgn']); 
			newWord_trns  	= sentences[lang][sentence_category][q]['trns'];
		}
		newWord_trnsk 	= convert_latin(newWord_orgn);			
		

		if(question_data.indexOf(q) == -1)
			question_data.push(q);
		
		callOther("general","sounding",newWord_orgn);

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
			que 	= random_number(0,JSON.parse(q));
			etalon 	= 11;
		}
		else if(exam == "step-by-step" || exam == "sentences") 
		{
				
			que 			= question_data[question_que];
			question_que++;

			if(question_que == question_data.length)
				question_que = 0;

			etalon 			= 2 * cQuestions + 1;
			
		}
		else if(exam == "open-lock" || exam == "practice")
			que = random_number(JSON.parse(minQue),JSON.parse(maxQue));


		if(second_value == 'word')
		{
			question_t 			= words[lang][que][cat];
			question_general 	= words[lang][que];
		}
		else
		{

			if(cat == 'orgn')
				question_t 			= regulation(sentences[lang][sentence_category][que][cat]);
			
			else
				question_t 			= sentences[lang][sentence_category][que][cat];
			

			question_general 	= sentences[lang][sentence_category][que];
		}
		
		question_txt.html(question_t);
		
		if(comm == "complete"){

			$("#complete-txt").remove();
			new_tab = `<span id='complete-txt'>_ _ _ _ _</span>`;
			$(new_tab).appendTo(".questions .card-left");
			question_txt.hide();
			
			/*question_txt.html("?");*/
		}
		else
		{
			$("#complete-txt").remove();
			question_txt.show();
		}
		
		if(cat == "orgn"){
			$("#sound").show();
			category = "trns";
			callOther("general","sounding",question_t);
		}
		else{
			$("#sound").hide();
			category = "orgn";
		}

		answers_all(question_general,category,comm);
	}

	function answers_all(q,cat,command)
	{
		$("#answers").html("");

		qq = random_number(1,4);
		iMax = 5;

		for (var i = 1; i < iMax; i++) {
			
			if(second_value == 'word')
				que = random_number(0,(words[lang].length - 1));
			else
				que = random_number(0,(sentences[lang][sentence_category].length-1));
			
			if(second_value == 'word'){
				answ_txt 		= words[lang][que][cat];
				correct_answ 	= q[cat];
			}
			else
			{
				if(cat == 'orgn')
				{
					answ_txt 		= regulation(sentences[lang][sentence_category][que][cat]);
					correct_answ 	= regulation(q[cat]);	
				}
				else
				{
					answ_txt 		= sentences[lang][sentence_category][que][cat];
					correct_answ 	= q[cat];
				}
			}						
		
			if(i == qq){
				answ_html = `<span class="form-button text-dark question-answer" data-answer="true">`+correct_answ+`</span>`;
				$(answ_html).appendTo("#answers");
			}
			else if(answ_txt!=correct_answ){
				answ_html = `<span class="form-button text-dark question-answer" data-answer="false">`+answ_txt+`</span>`;
				$(answ_html).appendTo("#answers");
			}
			else if(answ_txt == correct_answ){
				i--;
				alert("eyni")
			}

			

		}
	}

	function convert_latin(word)
	{
		word = word.toLowerCase();
		str_array = word.split('');
        for(var i=0; i < str_array.length; i++) {
        	if(i == 0){
        		if(str_array[i] == "е")
        			str_array[i] = 'ye';
        	}
        	else{
        		if(str_array[i] == "г" && str_array[i-1] == "е")
        			str_array[i] = 'yev';
        		else
		            str_array[i] = rus_latin[ str_array[i] ] || str_array[i];
        	}
        }

        str = str_array.join('');
	    
	 	return "["+str+"]";
	}

	function regulation(s)
	{
		regularFind = s.indexOf("(");

			
		if(regularFind == -1)
		{
			return s;
		}
		else
		{
			return s.substr(0, regularFind);
			
		}
	}
	
	function control_asw(answ)
	{
		answer_tab.removeClass("bg-true");
		answer_tab.removeClass("bg-false");
		answer_tab.addClass("bg-"+answ);

		if(!answ){

			if(skills['shield'] == 0)
				unerror = false;
			else
			{
				localStorage.market = JSON.stringify(skills);
				callOther("general","notification","shield-protected");
			}

			if(!hash)
			{
				if(heart>0){

					if(user.version == "simple")
					{
						heart-=1;			
						user.heart = heart;
						localStorage.user = JSON.stringify(user);
					}
					
				}
				else
				{
					localStorage.isPage = 'shopping';
					setTimeout(function()
					{
						window.location 	= "main.html#notenoughHeart";
					},500)
					
				}
			}
		}
		callOther("general","start_page","index","lesson");
		result.html(transl[lang][answ+"-answer"]);
		answer_tab.fadeIn();
	}

	function next()
	{
		if(hash)
			current++;
		else
			if(correcting)
				current++;
		percent = (current/etalon)*100;

		progressBar.css("width",percent+"%");

		if(percent >= 100)
			finish();
		else
		{
			$(".question-answer").removeClass("selected");
			answer_tab.fadeOut();
			
			if(hash == "exam-get-start")
			{
				if(userLevel == "zero")
					max = grade*10+100;				
				else
					max = grade*10+200;

				if(words.length<max)
					max = words[lang].length - 1;
			}
			else
				max = words[lang].length - 1;			

			if(current %2 == 0)
			{
				if(current %3 == 0)
					question(category_e,"orgn","translate",max);
				else
					question(category_e,"orgn","complete",max);				
			}
			else
				question(category_e,"trns","translate",max);
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

					if(correct_count == 10){
						grade 	= 5;												
						status 	= "excellent";
					}
					
					else{
						grade 	= 4;
						status 	= "very-good";
					}

				}
				else{
					grade 	= 3;
					status 	= "good";
				}
			}
			else
			{
				if(correct_count<3)
				{
					if(correct_count<1){
						grade 	= 0;
						status = "so-bad";
					}
					
					else{
						grade 	= 1;
						status 	= "bad";					
					}
				}
				else{
					grade 	= 2;
					status 	= "low-good";				
				}
			}
			crown 				= grade*19;
			user.grade 			= grade;
			user.crown 			= crown;
			localStorage.user 	= JSON.stringify(user);

			setTimeout(function()
			{

				loading_next.hide();
				window.location = "main.html#exam-"+status;

			},3500);

		}
		else
		{
			grade = JSON.parse(exam_data.grade);
			step  = JSON.parse(exam_data.step);
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
				achieveData['full-aim'] = getting_aim;
				addCrown 				= 1;

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

				user.crown 					= JSON.parse(user.crown) + addCrown;
				achieveData['crown-master'] = JSON.parse(achieveData['crown-master']) + addCrown;

				
			}
			else
			{
				$(".level-bonus").html("+0");
				$(".combo-bonus").html("+0");
			}

			controling_day 				= control_day(currentDay,currentMonth,currentYear);

			if(!controling_day){

				addDate 				= {'year': currentYear,	'month': currentMonth,	'day': currentDay};

				day_use.push(addDate);

				localStorage.day_use 	= JSON.stringify(day_use);
			}

			if(unerror)
				achieveData['unerror'] = JSON.parse(achieveData['unerror']) + 1;

			user.gem				= JSON.parse(user.gem) + bonus_gem;
			localStorage.day_aim 	= JSON.stringify(day_aim);
			localStorage.plan 		= JSON.stringify(plan);
			localStorage.user 		= JSON.stringify(user);
			localStorage.achieve	= JSON.stringify(achieveData);

			percent 				= (getting_aim/etalon_aim)*100;
			progressAim.css("width",percent+"%");
			main.fadeOut();
			lesson_success.fadeIn();
		}
	}

	function control_day(d,m,y)
	{
		if (day_use.length>0)
		{
			for (var i = 0; i < day_use.length; i++) {
				
				if(day_use[i]['year'] == y && day_use[i]['month'] == m && day_use[i]['day'] == d){

					return true;
					break;
				}
				else{
					if(i == (day_use.length - 1))
						return false;

				}

			}
		}
		else
			return false;
	}

	function search_plan(e,v)
	{
		if(plan.length>0)
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
		else
			return -1;
	}

	function selectQue(e,g,s,ex)
	{
		
		xMin = cQuestions * (g*16 + (s-1)*3 + ex);
		xMax = xMin + cQuestions;
		
		if(xMax > words[lang].length){
			xMax = words[lang].length - 1;
			xMin = words[lang].length - 20;
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

	function TimeShield()
	{
		if(skills['shield'] != 0)
		{

			var countDownDate = new Date(skills['shield']).getTime();

			var x = setInterval(function()
			{

			  var now = new Date().getTime();
			  var distance = countDownDate - now;
			    
			  // Time calculations for days, hours, minutes and seconds
			  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
			    
			  	if (distance < 0) {
				    clearInterval(x);
				    returnValue = 0;
				    skills['shield'] = 0;
				    localStorage.market = JSON.stringify(skills);
				}



			}, 1000);
		}
	}

	function shuffle(array) {
	  array.sort(() => Math.random() - 0.5);
	  return array;
	}

	function checkConnection()
	{
	    var networkState = navigator.connection.type;

	    var states = {};
	    states[Connection.UNKNOWN]  = 'Unknown connection';
	    states[Connection.ETHERNET] = 'Ethernet connection';
	    states[Connection.WIFI]     = 'WiFi connection';
	    states[Connection.CELL_2G]  = 'Cell 2G connection';
	    states[Connection.CELL_3G]  = 'Cell 3G connection';
	    states[Connection.CELL_4G]  = 'Cell 4G connection';
	    states[Connection.CELL]     = 'Cell generic connection';
	    states[Connection.NONE]     = 'none';
	    return states[networkState];	    
	}


});