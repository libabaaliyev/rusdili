$(document).ready(function()
{	
	profile_photo 	= $(".profile-photo-img");
	close 			= $("#close-tab");
	profile 		= $(".profile-header");
	photo_panel 	= $(".photo-panel");
	clip 			= $(".clip");
	update 			= $(".save-update");
	updateImg		= $(".save-img");
 	hash 			= location.hash.substr(1);
	user 			= JSON.parse(localStorage.user);
	photo 			= user.photo;
	image_setting();
	photo_items 	= $(".photo-items"); 
	callOther("general","language");
	callOther("general","start_page","setting");

	if(hash)
		callOther("general","notification",hash);
	
	photo_items.click(function()
	{
		photo_items.removeClass("active");
		$(this).addClass("active");
		photo = $(this).data("photo");
	});

	updateImg.click(function()
	{
		user.photo = "p"+photo+".png";
		callOther("general","filterInput",user,'update');
	})

	close.click(function()
	{
		photo_panel.removeClass("slideOutRight");
		photo_panel.removeClass("slideInRight");
		photo_panel.addClass("slideOutRight");
		photo_panel.fadeOut(300);		
	});

	clip.click(function()
	{
		photo_panel.removeClass("slideOutRight");
		photo_panel.removeClass("slideInRight");
		photo_panel.addClass("slideInRight");
		photo_panel.fadeIn(100);
	});

	update.click(function()
	{
		id 				= user.id;
		name 			= name_input.val();
		username 		= username_input.val();
		email 			= email_input.val();
		password 		= password_input.val();
		language 		= language_input.children("option:selected").val();


		user.name 		= name;
		user.username 	= username;
		user.email 		= email;
		user.password 	= password;
		user.using_lang = JSON.stringify(language);

		localStorage.user = JSON.stringify(user);
		localStorage.applang = JSON.stringify(language);

		if(!name || !username|| !email|| !password)
			callOther("general","notification","empty-input");		
		else
			callOther("general","filterInput",user,'update');
	});

	function image_setting()
	{
		activeClass = '';
		for (var i = 1; i < 21; i++) 
		{		
			if(photo == "p"+i+".png")
				activeClass = 'active';		
			else
				activeClass = '';

			image = `<figure class="photo-items `+activeClass+`" data-photo="`+i+`">
				    	<img src="img/profiles/p`+i+`.png">
					</figure>`;

			$(image).appendTo(".photos");
		}
	}

	

	function callOther(loc,func,funcData,funcData_1)
	{
		$.getScript("javascript/"+loc+".js",function(e)
		{
			window[func](funcData,funcData_1);				
		});

	}

});