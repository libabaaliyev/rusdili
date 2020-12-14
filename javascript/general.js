loading			= $(".loading");
profile_photo 	= $(".profile-photo-img");
name_input 		= $(".name-input");
username_input 	= $(".username-input");
email_input 	= $(".email-input");
password_input 	= $(".password-input");

count_crown_html = $(".count-crown");
count_heart_html = $(".count-heart");

//localStorages

	notifications 	= JSON.parse(localStorage.notifications);
	lang 			= JSON.parse(localStorage.applang);
	words 			= JSON.parse(localStorage.appLanguage);

	

	function notification(event,event_1)
	{
		if(event_1)
			messageTxt = notifications[lang][event]['message']+words[lang][event_1];
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
			    	localStorage.connection = "registr-ok";
			    	
			    	notification(result);

			    	if(result == "registryOk" || result == "yesUser" || result == "updateOk")
			    	{
			    		user = dataLogin['user'];
			    		localStorage.user = JSON.stringify(user);
			    		if(act == "update")
			    			start_page();
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
	
	function start_page(page)
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
			


			if(crown>0)
				count_crown_html.html(crown)
			
			if(heart>0)
				count_heart_html.html(heart);
		}
		
		profile_photo.attr("src","img/profiles/"+user.photo);
		$(".nameProfile").html(user.name);
		
	}

	function language()
	{
		if(localStorage.getItem("user")){
			user = JSON.parse(localStorage.user);
			stlevel = user.level+'-level';
			if(JSON.parse(user.heart) == 5)
				heart_info = words[lang]['health-all'];
			else
				heart_info = words[lang]['health-lost'];

		}
		else{
			stlevel = 'zero-level';
			heart_info = '';
		}

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

		$("#exam-time").html(words[lang]['exam-time']);
		$("#exam-span").html(words[lang]['exam-span']);
		$("#go-exam").html(words[lang]['go-exam']);
		

		$("#crazy").html(words[lang]['crazy']);
		$("#crazy-time").html(words[lang]['crazy-time']);

		$(".save").html(words[lang]['save']);
		$("#select-level").html(words[lang]['select-level']);
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



		$("#crown-l").html(words[lang]['crown']);

		$("#crown-txt").html(words[lang]['crown-txt']);

		$(".day-aim-title").html(words[lang]['day-aim-title']);

		$("#update").html(words[lang]['update']);
		
		$("#health-info").html(heart_info); // can sistemi duzelende bu serte gore deyisecek
		
		$("#health-txt").html(words[lang]['health-txt']);
		
		$("#a-health").html(words[lang]['a-health']);
		
		$(".get-practice").html(words[lang]['get-practice']);
		
		$(".get-health").html(words[lang]['get-health']);
		
		$(".plus").html(words[lang]['plus']);
		
		$(".unlimited").html(words[lang]['unlimited']);
		
		$(".get-plus").html(words[lang]['get-plus']);
		

		$(".level-step").html(words[lang][stlevel]); //level sistemi duzelende bu da sertle deyisecek


		$("#contact-us").html(words[lang]['contact-us']);

		$("#invite").html(words[lang]['invite']);

		$("#rate").html(words[lang]['rate']);

		$(".settings").html(words[lang]['settings']);


		$(".step").html(words[lang]['step']);

		$(".level-txt").html(words[lang]['level']);

		$(".start-lesson").html(words[lang]['start']);

		$(".skip-level-txt").html(words[lang]['skip-level-txt']);

		$(".skip-level-span").html(words[lang]['skip-level-span']);

		$(".use-gem").html(words[lang]['use-gem']);

		$(".unlimited-test").html(words[lang]['unlimited-test']);

		$(".no-thanks-l").html(words[lang]['no-thanks']);


		
		$("#profile-title").html(words[lang]['profile']);

		$("#finish-lig").html(words[lang]['finish-lig']);

		$("#shop").html(words[lang]['shop']);

		$(".app-name").html(words[lang]['app-name']);

		$("#get-plus-shop").html(words[lang]['get-plus-shop']);

		$(".upgrade").html(words[lang]['upgrade']);

		$("#get-shielt-title").html(words[lang]['get-shielt-title']);

		$("#get-shielt-txt").html(words[lang]['get-shielt-txt']);

		$("#health-update").html(words[lang]['health-update']);

		$("#health-update-txt").html(words[lang]['health-update-txt']);

		$("#get-ads").html(words[lang]['get-ads']);


		$("#double-skill-title").html(words[lang]['double-skill-title']);

		$("#double-skill-txt").html(words[lang]['double-skill-txt']);

		$("#unlimited-health").html(words[lang]['unlimited-health']);

		$("#buy-plus").html(words[lang]['buy-plus']);




		$(".continue").html(words[lang]['continue']); 

		$(".lesson-completed").html(words[lang]['lesson-completed']);

		$("#combo").html(words[lang]['combo']);

		$("#double-skill-ads").html(words[lang]['double-skill-ads']);

		$(".reward").html(words[lang]['double-reward']);

		$("#ads-txt").html(words[lang]['ads-txt']);

		$("#buy-plus-txt").html(words[lang]['buy-plus-txt']);

		$("#select-picture").html(words[lang]['select-picture']);


	}

