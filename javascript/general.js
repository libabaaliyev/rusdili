loading				= $(".loading");
profile_photo 		= $(".profile-photo-img");
name_input 			= $(".name-input");
username_input 		= $(".username-input");
email_input 		= $(".email-input");
password_input 		= $(".password-input");
count_crown_html 	= $(".count-crown");
count_heart_html 	= $(".count-heart");
limit 				= $("#limits");


notifications 		= JSON.parse(localStorage.notifications);
lang 				= JSON.parse(localStorage.applang);
appLanguage			= JSON.parse(localStorage.appLanguage);

date  		= new Date();
fullDate 	= date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear();

function notification(event,event_1)
{
	if(event_1)
		messageTxt = notifications[lang][event]['message']+appLanguage[lang][event_1];
	else
		messageTxt = notifications[lang][event]['message'];


	Swal.fire({
	  position				: 'center',
	  icon					: notifications[lang][event]['info'],
	  title					: messageTxt,
	  showConfirmButton 	: true,
	  backdrop				: true,
	  allowOutsideClick		: false,
	  allowEscapeKey		: false,
	  heightAuto			: true,
	  confirmButtonText 	: notifications[lang]['confirmText']
	 
	});
	
}

function filterInput(user_data,act)
{
	mailfilter 		= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	usernamefilter 	= /^[A-Za-z]\w{5,14}$/;
	passwordfilter	= /^[A-Za-z]\w{8,20}$/;

	username 	= user_data.username;
	email 		= user_data.email;
	password 	= user_data.password;

	$("input").attr("style","border: 1px solid #cecece;");
	if(username.match(usernamefilter))
	{
		if(email.match(mailfilter))
        {
        	if(password.match(passwordfilter))
        	{
        		if(username&&email&&password){
        			
        			loading.show();	        			
        			user_data.username 	= username;
        			user_data.password 	= password;

        			if(navigator.onLine)//burda network kodlari olacaq
        			{ 
        				
        				import_data = new FormData();
        				if(act == "import")
	        			{
	        				user_data.name 		= name;
							user_data.email 	= email;
							
	        			}
	        			
	        			import_data.append("info",act+"-base");
        				
        				import_data.append("data",JSON.stringify(user_data));

        				importBase(import_data,user_data,act);
        			}
        			else
        			{
        				if(act == "login")
	        			{
	        				user_data.name 		= "Unname";
							user_data.email 	= "-";
	        			}
        				internet_error(user_data,act);
        			}

        		}
        			
        	}
        	else{
        		notification("password-validate");
        		$("#password-registry").val("");
				$("#password-registry").attr("style","border: 1px solid #FF2A00;");
        	}
        }
        else{

        	notification("emailvalidate");

        	$("#email-registry").val("");
			$("#email-registry").attr("style","border: 1px solid #FF2A00;");
        	
        }
	}
	else
	{
		notification("username-validate");
		$("#username-registry").val("");
		$("#username-registry").attr("style","border: 1px solid #FF2A00;");
	}
}

function importBase(base,userData,act)
{
	$.ajax({
		url: "process.php",
		type: 'post',
		data: base,
		contentType: false,
	    processData: false,
	    success: function(data,status)
	    {console.log(data)

	    	loading.hide();
	    	if(status == "success")
	    	{
	    		dataLogin 	= JSON.parse(data);
		    	result 		= dataLogin['result'];
		    	planX 		= dataLogin['plan'];
		    			    	
		    	if(result!="plan-add")
		    		notification(result);

		    	if(result == "registryOk" || result == "yesUser" || result == "updateOk")
		    	{
		    		user 					= dataLogin['user'];
		    		localStorage.user 		= JSON.stringify(user);
		    		localStorage.connection = "registr-ok";
		    		aim_setting();

		    		if(act == "update")
		    			start_page();
		    		else if(act == "login"){

		    			plan = dataLogin['plan'];
		    	
		    			if(plan)
		    				localStorage.plan = JSON.stringify(plan);
		    		}
		    	}
		    	else if(result == 'plan-add')
		    	{

		    		result_x 	= dataLogin['user-result'];
		    		result_u	= result_x['result'];
		    		
	    			if(result_u != "existUsername" && result_u != "existEmail" && result_u != "emailvalidate")
	    			{
	    				    				
	    				setTimeout(function(){

	    					window.location = "main.html";

	    				},100);
	    				
	    			}
	    			else
	    			{


	    				setTimeout(function(){

	    					window.location = "setting.html#"+result_u;

	    				},100);
	    			}
		    	}

	    	}
	    	else
	    		internet_error(userData,act);		    	
	    }

	});
}

function internet_error(data,act)
{
	loading.hide();	    
	notification("internet-error");
	if(act !="login"){
		if(act =="update")
			start_page();
		
		localStorage.user 	= JSON.stringify(data);

		localStorage.connection = "internet-error";
	}

}

function start_page(page,page_1)
{
	user = JSON.parse(localStorage.user);

	if(page == "setting")
	{
		name_input.val(user.name);
		username_input.val(user.username);
		email_input.val(user.email);
		password_input.val(user.password);

		photo_panel.removeClass("slideOutRight");
		photo_panel.removeClass("slideInRight");
		photo_panel.addClass("slideOutRight");
		photo_panel.fadeOut(300);
	}
	else if(page == "index")
	{

		heart 	= JSON.parse(user.heart);			
		crown 	= JSON.parse(user.crown);
		grade 	= JSON.parse(user.grade);
		gem 	= JSON.parse(user.gem);

		if(crown>0)
			count_crown_html.html(crown);
		
		if(heart>0)
			count_heart_html.html(heart);

		$(".gem-count").html(gem);

		
		set_day_aim(page_1);

	}
	
	profile_photo.attr("src","img/profiles/"+user.photo);
	$(".nameProfile").html(user.name);
		
}

function set_day_aim(page)
{
	if(localStorage.getItem("day_aim") && page != "lesson"){


		limit.html(day_aim.getting+"/"+day_aim.etalon);
		percent = (JSON.parse(day_aim.getting)/JSON.parse(day_aim.etalon))*100;
		$("#progress-aim").css("width",percent+"%");

		if(percent>=100 && !day_aim.showing){
			notification("full-aim");
			day_aim.showing = true;
			localStorage.day_aim = JSON.stringify(day_aim);
		}

	}
}

function aim_setting(page)
{ 
	if(localStorage.getItem("day_aim") === null)
	{
		day_aim 		=
		{
			etalon  	: 0,
			getting 	: 0,
			time 		: fullDate,
			showing		: false
		}
	}
	else
	{		
		day_aim = JSON.parse(localStorage.day_aim);
		if(day_aim.time != fullDate)
		{
			day_aim.getting 	= 0;
			day_aim.time 		= fullDate;
			user.heart 			= 5;
			localStorage.user 	= JSON.stringify(user);

			set_day_aim("index");
		}

	}

	aim 	= user.aim;
	level 	= user.level;
	console.log(aim)		
	$(".aim ul li").removeClass("active");
	$("#"+aim+"-x").addClass("active");

	if(aim == "easy")
	{
		if(level == "zero")
		{
			day_aim.etalon = 180; //min 4 ders max 8 ders
		}
		else
		{
			day_aim.etalon = 320; //min 8 ders max 12 ders
		}
	}
	else if(aim == "average")
	{
		if(level == "zero")
		{
			day_aim.etalon = 300; //min 6 ders max 12 ders
		}
		else
		{
			day_aim.etalon = 500; //min 10 ders max 16 ders
		}
	}
	else if(aim == "serious")
	{
		if(level == "zero")
		{
			day_aim.etalon = 350; //min 10 ders max 15 ders
		}
		else
		{
			day_aim.etalon = 650; //min 14 ders max 23 ders
		}
	}
	else if(aim == "crazy")
	{
		if(level == "zero")
		{
			day_aim.etalon = 500; //min 12 ders max 20 ders
		}
		else
		{
			day_aim.etalon = 800; //min 20 ders max 33 ders
		}
	}

	localStorage.day_aim = JSON.stringify(day_aim);

	set_day_aim();

	if(page == "index")
		limit.html(day_aim.getting+"/"+day_aim.etalon);

}

function language()
{
	if(localStorage.getItem("user")){
		user = JSON.parse(localStorage.user);
		stlevel = user.level+'-level';
		if(JSON.parse(user.heart) == 5)
			heart_info = appLanguage[lang]['health-all'];
		else
			heart_info = appLanguage[lang]['health-lost'];

	}
	else{
		stlevel = 'zero-level';
		heart_info = '';
	}

	$("#app-name").html(appLanguage[lang]['app-name']);
	$("#free-learn").html(appLanguage[lang]['free-learn']);
	$("#get-start").html(appLanguage[lang]['get-start']);
	$(".already-start").html(appLanguage[lang]['already-start']);
	$("#day-aim-title").html(appLanguage[lang]['day-aim-title']);
	$("#easy").html(appLanguage[lang]['easy']);
	$("#easy-time").html(appLanguage[lang]['easy-time']);
	$("#average").html(appLanguage[lang]['average']);
	$("#average-time").html(appLanguage[lang]['average-time']);
	$("#serious").html(appLanguage[lang]['serious']);
	$("#serious-time").html(appLanguage[lang]['serious-time']);

	$("#exam-time").html(appLanguage[lang]['exam-time']);
	$("#exam-span").html(appLanguage[lang]['exam-span']);
	$("#go-exam").html(appLanguage[lang]['go-exam']);
	

	$("#crazy").html(appLanguage[lang]['crazy']);
	$("#crazy-time").html(appLanguage[lang]['crazy-time']);

	$(".save").html(appLanguage[lang]['save']);
	$("#select-level").html(appLanguage[lang]['select-level']);
	$("#start-zero").html(appLanguage[lang]['start-zero']);
	$("#start-elementary").html(appLanguage[lang]['start-elementary']);
	$("#create-profile").html(appLanguage[lang]['create-profile']);
	$("#create-profile-txt").html(appLanguage[lang]['create-profile-txt']);
	$("#create-profile-btn").html(appLanguage[lang]['create-profile-btn']);
	$("#registration").html(appLanguage[lang]['registration']);
	$(".name").html(appLanguage[lang]['name']);
	$(".username").html(appLanguage[lang]['username']);
	$(".email").html(appLanguage[lang]['email']);
	$(".password").html(appLanguage[lang]['password']);

	$(".name-input").attr("placeholder",appLanguage[lang]['name-input']);
	$(".username-input").attr("placeholder",appLanguage[lang]['username-input']);
	$(".email-input").attr("placeholder",appLanguage[lang]['email-input']);
	$(".password-input").attr("placeholder",appLanguage[lang]['pass-input']);

	$("#privacy").html(appLanguage[lang]['privacy']);
	$(".login").html(appLanguage[lang]['login']);



	$("#crown-l").html(appLanguage[lang]['crown']);

	$("#crown-txt").html(appLanguage[lang]['crown-txt']);

	$(".day-aim-title").html(appLanguage[lang]['day-aim-title']);

	$("#update").html(appLanguage[lang]['update']);
	
	$("#health-info").html(heart_info); // can sistemi duzelende bu serte gore deyisecek
	
	$("#health-txt").html(appLanguage[lang]['health-txt']);
	
	$("#a-health").html(appLanguage[lang]['a-health']);
	
	$(".get-practice").html(appLanguage[lang]['get-practice']);
	
	$(".get-health").html(appLanguage[lang]['get-health']);
	
	$(".plus").html(appLanguage[lang]['plus']);
	
	$(".unlimited").html(appLanguage[lang]['unlimited']);
	
	$(".get-plus").html(appLanguage[lang]['get-plus']);
	

	$(".level-step").html(appLanguage[lang][stlevel]); //level sistemi duzelende bu da sertle deyisecek


	$("#contact-us").html(appLanguage[lang]['contact-us']);

	$("#invite").html(appLanguage[lang]['invite']);

	$("#rate").html(appLanguage[lang]['rate']);

	$(".settings").html(appLanguage[lang]['settings']);


	$(".step").html(appLanguage[lang]['step']);

	$(".level-txt").html(appLanguage[lang]['level']);

	$(".start-lesson").html(appLanguage[lang]['start']);

	//$(".reset-lesson").html(appLanguage[lang]['reset']);

	$(".skip-level-txt").html(appLanguage[lang]['skip-level-txt']);

	$(".skip-level-span").html(appLanguage[lang]['skip-level-span']);

	$(".use-gem").html(appLanguage[lang]['use-gem']);

	$(".unlimited-test").html(appLanguage[lang]['unlimited-test']);

	$(".no-thanks-l").html(appLanguage[lang]['no-thanks']);


	
	$("#profile-title").html(appLanguage[lang]['profile']);

	$("#finish-lig").html(appLanguage[lang]['finish-lig']);

	$("#shop").html(appLanguage[lang]['shop']);

	$(".app-name").html(appLanguage[lang]['app-name']);

	$("#get-plus-shop").html(appLanguage[lang]['get-plus-shop']);

	$(".upgrade").html(appLanguage[lang]['upgrade']);

	$("#get-shielt-title").html(appLanguage[lang]['get-shielt-title']);

	$("#get-shielt-txt").html(appLanguage[lang]['get-shielt-txt']);

	$("#health-update").html(appLanguage[lang]['health-update']);

	$("#health-update-txt").html(appLanguage[lang]['health-update-txt']);

	$(".get-ads span").html(appLanguage[lang]['get-ads']);


	$("#double-skill-title").html(appLanguage[lang]['double-skill-title']);

	$("#double-skill-txt").html(appLanguage[lang]['double-skill-txt']);

	$("#unlimited-health").html(appLanguage[lang]['unlimited-health']);

	$("#buy-plus").html(appLanguage[lang]['buy-plus']);




	$(".continue").html(appLanguage[lang]['continue']); 

	$(".lesson-completed").html(appLanguage[lang]['lesson-completed']);

	$("#combo").html(appLanguage[lang]['combo']);

	$("#double-skill-ads").html(appLanguage[lang]['double-skill-ads']);

	$(".reward").html(appLanguage[lang]['double-reward']);

	$("#ads-txt").html(appLanguage[lang]['ads-txt']);

	$("#buy-plus-txt").html(appLanguage[lang]['buy-plus-txt']);

	$("#select-picture").html(appLanguage[lang]['select-picture']);


}

