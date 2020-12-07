$(document).ready(function()
{
	loading 		= $(".loading-lesson");
	main 			= $(".lesson-main");
	lesson 			= $(".lesson");
	continue_lesson = $(".continue-lesson")
	lesson_success	= $(".lesson-success");
	success_body	= $(".success-body")
	success_gem		= $(".success-gem");
	adsense_tab 	= $(".adsense");
	continue_succes = $(".continue-success");
	answers 		= $(".question-answer");
	answer_tab 		= $(".answer");
	progressBar		= $(".progress-bar-active");

	rewardBtn		= $(".reward");
	skipAd 			= $(".no-thanks");
	close 			= $(".close-lesson")

	etalon 			= 10;
	current			= 1;


	setTimeout(function()
	{
		loading.hide();
		main.show();

	},3000);


	answers.click(function()
	{
		answers.removeClass("selected");
		$(this).addClass("selected");
		answer_question = $(this).html();

		control_asw(answer_question,"Hello")

	});

	continue_succes.click(function()
	{

		success_body.hide();
		success_gem.show();
	});

	rewardBtn.click(function()
	{
		console.log("reward");
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
		newQuestion();
	});

	function control_asw(answ,base)
	{
		answer_tab.removeClass("bg-true");
		answer_tab.removeClass("bg-false");

		if(answ == base)
		{
			answer_tab.addClass("bg-true");
			
		}
		else
		{
			answer_tab.addClass("bg-false");
			
		}
		answer_tab.fadeIn();

		

	}

	function newQuestion()
	{
		current++;
		percent = (current/etalon)*100;

		progressBar.css("width",percent+"%");

		if(percent >= 100)
			finish();

		console.log("yeni sual");

		answers.removeClass("selected");

		answer_tab.fadeOut();

	}

	function finish()
	{
		main.fadeOut();
		lesson_success.fadeIn();
	}
	
});