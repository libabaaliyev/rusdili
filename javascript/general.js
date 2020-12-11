//localStorages
	notifications 	= JSON.parse(localStorage.notifications);
	lang 			= JSON.parse(localStorage.applang);
	words 			= JSON.parse(localStorage.appLanguage);

	

	function notification(event)
	{
		Swal.fire({
		  position				: 'center',
		  icon					: notifications[lang][event]['info'],
		  title					: notifications[lang][event]['message'],
		  showConfirmButton 	: true,
		  backdrop				: true,
		  allowOutsideClick		: false,
		  allowEscapeKey		: false,
		  heightAuto			: true,
		  confirmButtonText 	: notifications[lang]['confirmText']
		 
		});
		
	}

	function importBase(base,userData)
	{
		$.ajax({
			url: "process.php",
			type: 'post',
			data: base,
			contentType: false,
		    processData: false,
		    success: function(data,status)
		    {
		    	if(status == "success")
		    	{
		    		dataLogin 	= JSON.parse(data);
			    	result 		= dataLogin['result'];
			    	localStorage.connection = "registr-ok";

			    	notification(result);

			    	if(result == "registryOk")
			    	{
			    		user = dataLogin['user'];
			    		localStorage.user = JSON.stringify(user);
			    	}
		    	}
		    	else
		    	{
		    		notification("internet-error");
		    		userData.id 		= "not-registr";
		    		userData.photo 		= "p1.png";
		    		userData.league 	= "starter";
		    		localStorage.user 	= JSON.stringify(userData);

		    		localStorage.connection = "internet-error";


		    	}
		    	
		    	
		    }

		});
	}

	function language()
	{
		$("#crown-l").html(words[lang]['crown']);

		$("#crown-txt").html(words[lang]['crown-txt']);

		$(".day-aim-title").html(words[lang]['day-aim-title']);

		$("#update").html(words[lang]['update']);
		
		$("#health-info").html(words[lang]['health-all']); // can sistemi duzelende bu serte gore deyisecek
		
		$("#health-txt").html(words[lang]['health-txt']);
		
		$("#a-health").html(words[lang]['a-health']);
		
		$(".get-practice").html(words[lang]['get-practice']);
		
		$(".get-health").html(words[lang]['get-health']);
		
		$(".plus").html(words[lang]['plus']);
		
		$(".unlimited").html(words[lang]['unlimited']);
		
		$(".get-plus").html(words[lang]['get-plus']);
		
		
		$(".level-step").html(words[lang]['zero-level']); //level sistemi duzelende bu da sertle deyisecek

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

		$("#easy").html(words[lang]['easy']);
		
		$("#easy-time").html(words[lang]['easy-time']);
		
		$("#average").html(words[lang]['average']);
		
		$("#average-time").html(words[lang]['average-time']);
		
		$("#serious").html(words[lang]['serious']);
		
		$("#serious-time").html(words[lang]['serious-time']);

		$("#crazy").html(words[lang]['crazy']);
		
		$("#crazy-time").html(words[lang]['crazy-time']);

		$(".save").html(words[lang]['save']);
		
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

		$(".name").html(words[lang]['name']);

		$(".username").html(words[lang]['username']);

		$(".email").html(words[lang]['email']);

		$(".password").html(words[lang]['password']);

		$(".name-input").attr("placeholder",words[lang]['name-input']);

		$(".username-input").attr("placeholder",words[lang]['username-input']);

		$(".email-input").attr("placeholder",words[lang]['email-input']);

		$(".password-input").attr("placeholder",words[lang]['pass-input']);

		$("#privacy").html(words[lang]['privacy']);


		$(".continue").html(words[lang]['continue']); 

		$(".lesson-completed").html(words[lang]['lesson-completed']);

		$("#combo").html(words[lang]['combo']);

		$("#double-skill-ads").html(words[lang]['double-skill-ads']);

		$(".reward").html(words[lang]['double-reward']);

		$("#ads-txt").html(words[lang]['ads-txt']);

		$("#buy-plus-txt").html(words[lang]['buy-plus-txt']);

		$("#select-picture").html(words[lang]['select-picture']);


	}
