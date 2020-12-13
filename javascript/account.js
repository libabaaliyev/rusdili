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

	user_data 	= 
	{
		"aim"		: "",
		"level" 	: "",
		"name"		: "",
		"username"	: "",
		"email"		: "",
		"password"	: "",
		"grade"		: "0",
		"learning" 	: "ru",
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
				else
					filterInput(name,username,email,password,'registry');
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
		
		if(!username || !password)
			callOther("general","notification","empty-input");
		else
			filterInput("-",username,"alibaba.aliyev@hotmail.com",password,'login');

		
	});


	detecting = false;
	function filterInput(name,username,email,password,act)
	{
		mailfilter 		= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		usernamefilter 	= /^[A-Za-z]\w{5,14}$/;
		passwordfilter	= /^[A-Za-z]\w{8,20}$/;

		$("input").attr("style","border: 1px solid #cecece;");
		if(username.match(usernamefilter))
		{
			if(email.match(mailfilter))
	        {
	        	if(password.match(passwordfilter))
	        	{
	        		if(username&&email&&password){
	        			
	        			loading.show();
	        			if(!detecting){
	        				detectUser(act);
	        				detecting = true;
	        			}

	        			
	        			user_data.username 	= username;
	        			user_data.password 	= password;

	        			if(navigator.onLine){ //burda network kodlari olacaq
	        				
	        				import_data = new FormData();
	        				if(act == "registry")
		        			{
		        				user_data.name 		= name;
								user_data.email 	= email;
								import_data.append("info","import-base");
		        			}
		        			else
		        			{
		        				import_data.append("info","update-base");
		        			}

	        				
	        				import_data.append("data",JSON.stringify(user_data));

	        				callOther("general","importBase",import_data,user_data);
	        			}
	        			else{
	        				if(act == "login")
		        			{
		        				user_data.name 		= "Unname";
								user_data.email 	= "-";
		        			}

	        				callOther("general","internet_error",user_data);
	        			}

	        		}
	        			
	        	}
	        	else{
	        		callOther("general","notification","password-validate");
	        		$("#password-registry").val("");
					$("#password-registry").attr("style","border: 1px solid #FF2A00;");
	        	}
	        }
	        else{

	        	callOther("general","notification","emailvalidate");

	        	$("#email-registry").val("");
				$("#email-registry").attr("style","border: 1px solid #FF2A00;");
	        	
	        }
		}
		else{
			callOther("general","notification","username-validate");
			$("#username-registry").val("");
			$("#username-registry").attr("style","border: 1px solid #FF2A00;");
		}
	}

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
				{
					window.location = "main.html";
				}
				
				

			},1000);

		}
	}

});