loading				= $(".loading");
profile_photo 		= $(".profile-photo-img");
name_input 			= $(".name-input");
username_input 		= $(".username-input");
email_input 		= $(".email-input");
password_input 		= $(".password-input");
count_crown_html 	= $(".count-crown");
count_heart_html 	= $(".count-heart");
language_input 		= $(".language-input");
limit 				= $("#limits");


notifications 		= JSON.parse(localStorage.notifications);
lang 				= JSON.parse(localStorage.applang);
appLanguage			= JSON.parse(localStorage.appLanguage);
appWords 			= appLanguage[lang];


date  		= new Date();
fullDate 	= date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
/*day_aim 	= [];*/
function notification(event,event_1)
{

	if(event_1)
		messageTxt = notifications[lang][event]['message']+appWords[event_1];
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

function ads(e)
{
	if(checkConnection() == 'none')
		notification("internet-error");
	else
	{
		if(e == 'reward')
		{
			alert(e)
		}
		else if(e == "interstitial")
		{
			alert(e);
		}
	}		
}

function pro_edition()
{
	if(checkConnection() == 'none')
		notification("internet-error");
	else
	{
		//pro isleri
		user.version = "pro";
		localStorage.user = user;
		start_page("index"); 
		
	}
}

function checkConnection()
{
    var networkState 			= navigator.connection.type;
    var states 					= {};
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

        			if(/*checkConnection() != 'none'*/navigator.onLine)//burda network kodlari olacaq
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
	    {

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

		    		if(act == "update"){
		    			start_page();
		    			language();
		    		}
		    		else if(act == "login"){

		    			learning = dataLogin['plan'];
		    			plan = JSON.parse(learning['plan']);
		    			achieve = JSON.parse(learning['achieve']);
		    			skill = JSON.parse(learning['skills']);
		    	
		    			if(plan)
		    				localStorage.plan = JSON.stringify(plan);

		    			if(achieve)
		    				localStorage.achieve = JSON.stringify(achieve);

		    			if(skill)
		    				localStorage.market = JSON.stringify(skill);
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
	    },
	    error: function()
	    {
	    	internet_error(userData,act);
	    }


	});
}

function scoreboard()
{
	if(user.id == "not-registr")
	{
		base = new FormData();
		base.append("info","update-datas");
		base.append("data",JSON.stringify(user));
		importBase(base,user,"import");
		
		scoreboard();
	}		
	else
	{
		$.post("process.php",
	    {
	        info: "score-board",
	        id: user.id,
	        data: JSON.stringify(day_aim),
	        lang: 'ru'     
	    },
	    function(data,status)
	    {
	    	if(status == "success"){
	    		$("#users li").remove();
		    	obj 	= JSON.parse(data);
		    	result 	= obj.result;

		    	if(result.length == 0){
		    		$(".side-gif").hide();
		    		$(".empty-table").show();
		    	}
		    	else
		    	{
		    		$(".empty-table").hide();
		    		$(".side-gif").show();

		    		for (var i = 0; i < result.length; i++)
		    		{
		    			que 	= i + 1;
		    			users 	= result[i];

		    			if(users.id == user.id)
		    				active = "active";
		    			else
		    				active = "";


		    			user_li = `<li class="` + active + `">
									<span>` + que + `.</span>
									<figure>
										<img src="img/profiles/` + users.photo + `">
									</figure>
									
									<h4>` + users.name + `</h4>
									<span>` + users.getting + ` `+appWords['point']+`</span>
								</li>`


						$(user_li).appendTo("#users");

		    		}

		    	}
	    	}
	    	else
	    		notification("errorsomething");
	    });
	}
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

		$("#"+lang).attr("selected","selected");

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

		$(".gem-count").html(gem);

		if(crown>0)
			count_crown_html.html(crown);

		if(user.version == "simple")
		{
			$(".heart-tab").show();
			if(heart>=0)
				count_heart_html.html(heart);		
		}
		else
		{
			count_heart_html.html("&#8734;");
			$(".heart-tab").remove();
			$(".gem-tab").show();

			$(".shopping-plus").hide();

		}

		
		
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

			achieveData['week'] 	= true;
			localStorage.achieve 	= JSON.stringify(achieveData);

			set_day_aim("index");
		}

	}

	aim 	= user.aim;
	level 	= user.level;
		
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
			day_aim.etalon = 280; //min 8 ders max 12 ders
		}
	}
	else if(aim == "average")
	{
		if(level == "zero")
		{
			day_aim.etalon = 280; //min 6 ders max 12 ders
		}
		else
		{
			day_aim.etalon = 360; //min 10 ders max 16 ders
		}
	}
	else if(aim == "serious")
	{
		if(level == "zero")
		{
			day_aim.etalon = 360; //min 10 ders max 15 ders
		}
		else
		{
			day_aim.etalon = 500; //min 14 ders max 23 ders
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
			day_aim.etalon = 700; //min 20 ders max 33 ders
		}
	}

	localStorage.day_aim = JSON.stringify(day_aim);

	set_day_aim();

	if(page == "index")
		limit.html(day_aim.getting+"/"+day_aim.etalon);

}

function random_number(min,max)
{
	return Math.floor(Math.random()*(max-min+1)+min);
}

function sounding(e)
{
	xM = random_number(0,10);
	if(xM % 2 == 0)
		person = 'Russian Female';
	else
		person = 'Russian Male';
	
	responsiveVoice.speak(e, person);
}

function language()
{
	if(localStorage.getItem("user")){
		user = JSON.parse(localStorage.user);
		stlevel = user.level+'-level';
		if(JSON.parse(user.heart) == 5)
			heart_info = appWords['health-all'];
		else
			heart_info = appWords['health-lost'];

	}
	else{
		stlevel = 'zero-level';
		heart_info = '';
	}

	$("#app-name").html(appWords['app-name']);
	$("#free-learn").html(appWords['free-learn']);
	$("#get-start").html(appWords['get-start']);
	$(".already-start").html(appWords['already-start']);
	$("#day-aim-title").html(appWords['day-aim-title']);
	$("#easy").html(appWords['easy']);
	$("#easy-time").html(appWords['easy-time']);
	$("#average").html(appWords['average']);
	$("#average-time").html(appWords['average-time']);
	$("#serious").html(appWords['serious']);
	$("#serious-time").html(appWords['serious-time']);

	$("#exam-time").html(appWords['exam-time']);
	$("#exam-span").html(appWords['exam-span']);
	$("#go-exam").html(appWords['go-exam']);
	

	$("#crazy").html(appWords['crazy']);
	$("#crazy-time").html(appWords['crazy-time']);

	$(".save").html(appWords['save']);
	$("#select-level").html(appWords['select-level']);
	$("#start-zero").html(appWords['start-zero']);
	$("#start-elementary").html(appWords['start-elementary']);
	$("#create-profile").html(appWords['create-profile']);
	$("#create-profile-txt").html(appWords['create-profile-txt']);
	$("#create-profile-btn").html(appWords['create-profile-btn']);
	$("#registration").html(appWords['registration']);
	$(".name").html(appWords['name']);
	$(".username").html(appWords['username']);
	$(".email").html(appWords['email']);
	$(".password").html(appWords['password']);
	$(".language").html(appWords['language']);

	$(".name-input").attr("placeholder",appWords['name-input']);
	$(".username-input").attr("placeholder",appWords['username-input']);
	$(".email-input").attr("placeholder",appWords['email-input']);
	$(".password-input").attr("placeholder",appWords['pass-input']);

	$("#privacy").html(appWords['privacy']);
	$(".login").html(appWords['login']);



	$("#crown-l").html(appWords['crown']);

	$("#crown-txt").html(appWords['crown-txt']);

	$(".day-aim-title").html(appWords['day-aim-title']);

	$("#update").html(appWords['update']);
	
	$("#health-info").html(heart_info); // can sistemi duzelende bu serte gore deyisecek
	
	$("#heart-txt").html(appWords['heart-txt']);
	
	$("#a-health").html(appWords['a-health']);
	
	$(".get-practice").html(appWords['get-practice']);
	
	$(".get-health").html(appWords['get-health']);
	
	$(".plus").html(appWords['plus']);
	
	$(".unlimited").html(appWords['unlimited']);
	
	$(".get-plus").html(appWords['get-plus']);
	

	$(".level-step").html(appWords[stlevel]); 


	$("#contact-us").html(appWords['contact-us']);

	$("#invite").html(appWords['invite']);

	$("#rate").html(appWords['rate']);

	$(".settings").html(appWords['settings']);


	$(".step").html(appWords['step']);

	$(".level-txt").html(appWords['level']);

	$(".start-lesson").html(appWords['start']);



	$(".skip-level-txt").html(appWords['skip-level-txt']);

	$(".skip-level-span").html(appWords['skip-level-span']);

	$(".use-gem").html(appWords['use-gem']);

	$(".unlimited-test").html(appWords['unlimited-test']);

	$(".no-thanks-l").html(appWords['no-thanks']);


	
	$("#profile-title").html(appWords['profile']);

	$("#finish-lig").html(appWords['finish-lig']);

	$("#score-head").html(appWords['score-head']);

	$("#sentences-title").html(appWords['sentences-title']);

	$("#shop").html(appWords['shop']);

	$(".app-name").html(appWords['app-name']);

	$("#get-plus-shop").html(appWords['get-plus-shop']);

	$(".upgrade").html(appWords['upgrade']);

	$("#get-shielt-title").html(appWords['get-shielt-title']);

	$("#get-shielt-txt").html(appWords['get-shielt-txt']);

	$("#health-update").html(appWords['health-update']);

	$("#health-update-txt").html(appWords['health-update-txt']);

	$(".get-ads span").html(appWords['get-ads']);


	$("#double-skill-title").html(appWords['double-skill-title']);

	$("#double-skill-txt").html(appWords['double-skill-txt']);

	$("#unlimited-health").html(appWords['unlimited-health']);

	$("#buy-plus").html(appWords['buy-plus']);


	$("#ready-question").html(appWords['ready']);

	$(".yes-ready").html(appWords['yes-ready']);

	$(".no-ready").html(appWords['later']);

	$("#know").html(appWords['know']);

	$(".continue").html(appWords['continue']); 

	$(".lesson-completed").html(appWords['lesson-completed']);

	$("#combo").html(appWords['combo']);

	$("#double-skill-ads").html(appWords['double-skill-ads']);

	$(".reward").html(appWords['double-reward']);

	$("#ads-txt").html(appWords['ads-txt']);

	$("#buy-plus-txt").html(appWords['buy-plus-txt']);

	$("#select-picture").html(appWords['select-picture']);
}