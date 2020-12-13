$(document).ready(function()
{
	loading 		= $(".loading-lesson");
	loading_1 		= $(".loading");
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
	progressBar		= $(".progress-bar-active");
	question_categ 	= $("#question_txt");
	question_txt 	= $("#question");


	rewardBtn		= $(".reward");
	skipAd 			= $(".no-thanks");
	close 			= $(".close-lesson")
	
	etalon 			= 10;
	current			= 1;
	correct_count 	= 0;
	
	hash 			= location.hash.substr(1);
	user 			= JSON.parse(localStorage.user); 
	lang 			= JSON.parse(localStorage.applang); 
	transl 			= JSON.parse(localStorage.appLanguage);
	words 			= JSON.parse(localStorage.words);
	sentences 		= JSON.parse(localStorage.sentences);
	userLevel		= user.level;

	var rus_latin 	= 
	{
		"Ф":"F","ф":"f","Ы":"I","ы":"ı","В":"V","в":"v","А":"A","а":"a","П":"P","п":"p","Р":"R","р":"r",
		"О":"O","о":"o","Л":"L","л":"l","Д":"D","д":"d","Ж":"J","ж":"j","Э":"E","э":"e","Я":"Ya",
		"я":"ya","Ч":"Ç","ч":"ç","С":"S","с":"s","М":"M","м":"m","И":"İ","и":"i","Т":"T","т":"t",
		"Ь":":","ь":":","Б":"B","б":"b","Ю":"Yu","ю":"yu","Й":"Y","й":"y","Ц":"Ts","ц":"ts","У":"U","у":"u",
		"К":"K","к":"k","Е":"Ye","е":"e","Н":"N","н":"N","Г":"Q","г":"q","Ш":"Sh","ш":"sh","Щ":"Ssh","щ":"ssh","З":"Z",
		"з":"z","Х":"Kh","х":"kh","Ъ":":","ъ":":"
	};

	start(hash);

	setTimeout(function()
	{
		loading.hide();
		main.show();

	},3000);


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
		success_gem.show();
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
		if(command == "exam-get-start")
		{
			if(userLevel == "zero")
				question("exam-start","trns","translate",100);

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

		

		result.html(transl[lang][answ+"-answer"]);

		answer_tab.fadeIn();
		console.log(correct_count);

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

		if(hash == "exam-get-start")
		{
			if(userLevel == "zero"){
				if(current%2 == 0){
					
					question("exam-start","trns","translate",100);
				}
				else{

					question("exam-start","orgn","translate",100);
				}
			}
		}

	}

	function finish()
	{
		if(hash == "exam-get-start")
		{
			loading_1.show();

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
					{
						callOther("general","notification","exam-finish","so-bad");
					}
					else
					{
						callOther("general","notification","exam-finish","bad");
					}
				}
				else
				{
					callOther("general","notification","exam-finish","low-good");
				}
			}
			

			setTimeout(function()
			{

				loading_1.hide();
				window.location = "main.html";

			},1500);

		}
		else
		{
			main.fadeOut();
			lesson_success.fadeIn();
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