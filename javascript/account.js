$(document).ready(function()
{  
	get_start 	= $(".get-start-function");
	aim_items	= $(".aim ul li");
	level_items = $(".select-level-items ul li");
	login		= $("#login-start");
	login_end	= $("#login-end");
	login_page	= $("#login");
	close 		= $("#close-tab");
	loading		= $(".loading");
	
	start_value = 0;
	source		= new EventSource("loginsocket.php");

	lang 		= JSON.parse(localStorage.applang);
	words 		= JSON.parse(localStorage.appLanguage);
	detecting 	= false;

	user_data 	= 
	{
		"id"		: "not-registr",
		"photo"		: "p1.png",
		"aim"		: "",
		"level" 	: "",
		"name"		: "",
		"username"	: "",
		"email"		: "",
		"password"	: "",
		"grade"		: 0,
		"learning" 	: "ru",
		"league" 	: "starter",
		"heart"		: 5,
		"crown" 	: 0,
		"use_lang"	: JSON.stringify(lang)

	}
	
	action = 'start';

	callOther("general","language","index");

	get_start.click(function()
	{
		if(action !="create-profile-start")
		{
			
			$("#get-start-"+start_value).addClass("slideOutLeft");
			$("#get-start-"+start_value).fadeOut(100);
			
			
			add_datas(action);
			action = $(this).data("action");
		}
		else
		{
			if(start_value<5)
			{
				name 		= $("#name-registry").val();
				username 	= $("#username-registry").val();
				email 		= $("#email-registry").val();
				password 	= $("#password-registry").val();
				
				if(!name || !username|| !email|| !password)
					callOther("general","notification","empty-input");
				else{

					
        			if(!detecting){
        				detectUser('registry');
        				detecting = true;
        			}
        			user_data.username 	= username;
	        		user_data.password 	= password;
					user_data.name 		= name;
					user_data.email 	= email;

					callOther("general","filterInput",user_data,'import');
					
				}
			}
			else
			{
				window.location = "lessons.html#exam-get-start";
			}
		}
		
	});

	aim_items.click(function()
	{
		aim_items.removeClass("active active-aim");
		$(this).addClass("active active-aim");
	})

	level_items.click(function()
	{
		level_items.removeClass("active active-level");
		$(this).addClass("active active-level");
	});

	login.click(function()
	{
		
		if(!detecting){
			detectUser('login');
			detecting = true;
		}
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

	login_end.click(function()
	{

		username 	= $("#login-username").val();
		password 	= $("#login-password").val();

		login_data = 
		{
			"username"	: username,
			"password"	: password,
			"email"		: "aliyev@alibaba.com"
		}
		
		if(!username || !password)
			callOther("general","notification","empty-input");
		else
			callOther("general","filterInput",login_data,'login');
		
		
	});

	function add_datas(event)
	{

		if(event == "aim")
		{
			aim = $(".active-aim").data("aim");
			user_data.aim = aim;
		}
		else if(event == "level")
		{
			level = $(".active-level").data("level");
			user_data.level = level;
		}
		
		
		start_value++;

		
		if(start_value<6){
			$("#get-start-"+start_value).addClass("slideInRight");
			$("#get-start-"+start_value).fadeIn();
			loading.hide();
		}
		
	}


	function callOther(loc,func,funcData,funcData_1)
	{

		$.getScript("javascript/"+loc+".js",function(e)
		{
			window[func](funcData,funcData_1);				
		});

	}
	
	function detectUser(a)
	{
		
		if(localStorage.getItem("user") === null)
		{
			setTimeout(function(){ detectUser(a)},1000);
		}
		else
		{
			setTimeout(function()
			{
				if(a == "registry")
				{
					$("#get-start-"+start_value).addClass("slideOutLeft");
					$("#get-start-"+start_value).fadeOut(100);
					start_value = 4;
					add_datas("profile-done");
				}
				else
					window.location = "main.html";
				
				
				

			},1000);

		}
	}

});