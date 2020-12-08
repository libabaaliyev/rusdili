$(document).ready(function()
{
	get_start 	= $(".get-start-function");
	aim_items	= $(".aim ul li");
	level_items = $(".select-level-items ul li");
	login		= $("#login-start");
	login_end	= $("#login-end");
	login_page	= $("#login");
	close 		= $("#close-tab");
	start_value = 0;

	lang 		= JSON.parse(localStorage.applang);
	words 		= JSON.parse(localStorage.appLanguage);

	language();

	get_start.click(function()
	{
		$("#get-start-"+start_value).addClass("slideOutLeft");
		$("#get-start-"+start_value).fadeOut(100);
		start_value++;
		if(start_value<5){
			$("#get-start-"+start_value).addClass("slideInRight");
			$("#get-start-"+start_value).fadeIn();
		}
		else
		{
			window.location = "lessons.html#exam-get-start";
		}
	});

	aim_items.click(function()
	{
		aim_items.removeClass("active");
		$(this).addClass("active");
	})

	level_items.click(function()
	{
		level_items.removeClass("active");
		$(this).addClass("active");
	});

	login.click(function()
	{
		$("#get-start-"+start_value).removeClass("slideInRight");
		$("#get-start-"+start_value).addClass("slideOutLeft");
		$("#get-start-"+start_value).fadeOut(100);

		login_page.removeClass("slideOutLeft");
		login_page.addClass("slideInRight");
		login_page.fadeIn();

	});

	close.click(function()
	{
		login_page.removeClass("slideInRight");
		login_page.addClass("slideOutLeft");
		login_page.fadeOut(100);

		$("#get-start-"+start_value).removeClass("slideOutLeft");
		$("#get-start-"+start_value).addClass("slideInRight");
		$("#get-start-"+start_value).fadeIn();
	});


	function language()
	{
		
		$("#app-name").html(words[lang]['app-name']);
		$("#free-learn").html(words[lang]['free-learn']);
		$("#get-start").html(words[lang]['get-start']);
		$(".already-start").html(words[lang]['already-start']);
		$("#day-aim-title").html(words[lang]['day-aim-title']);
		$("#easy").html(words[lang]['easy']);
		$("#easy-time").html(words[lang]['easy-time']);
		$("#average").html(words[lang]['average']);
		$("#average-time").html(words[lang]['average-time']);
		$("#serious").html(words[lang]['serious']);
		$("#serious-time").html(words[lang]['serious-time']);

		$("#crazy").html(words[lang]['crazy']);
		$("#crazy-time").html(words[lang]['crazy-time']);
		$(".save").html(words[lang]['save']);
		$("#select-leve").html(words[lang]['select-leve']);
		$("#start-zero").html(words[lang]['start-zero']);
		$("#start-elementary").html(words[lang]['start-elementary']);
		$("#create-profile").html(words[lang]['create-profile']);
		$("#create-profile-txt").html(words[lang]['create-profile-txt']);
		$("#create-profile-btn").html(words[lang]['create-profile-btn']);
		$("#registration").html(words[lang]['registration']);
		$(".name").html(words[lang]['name']);
		$(".username").html(words[lang]['username']);
		$(".email").html(words[lang]['email']);
		$(".password").html(words[lang]['password']);

		$(".name-input").attr("placeholder",words[lang]['name-input']);
		$(".username-input").attr("placeholder",words[lang]['username-input']);
		$(".email-input").attr("placeholder",words[lang]['email-input']);
		$(".password-input").attr("placeholder",words[lang]['pass-input']);

		$("#privacy").html(words[lang]['privacy']);
		$(".login").html(words[lang]['login']);
	}


});