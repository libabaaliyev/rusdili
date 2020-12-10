$(document).ready(function()
{	
	image_setting();	
	photo_items = $(".photo-items");
	close 		= $("#close-tab");
	profile 	= $(".profile-header");
	photo_panel = $(".photo-panel");
	clip 		= $(".clip");

		
	photo_items.click(function()
	{
		photo_items.removeClass("active");
		$(this).addClass("active");
	});

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

	function image_setting()
	{
		active = 2;
		activeClass = '';
		for (var i = 1; i < 21; i++) 
		{
		
			if(active == i)
				activeClass = 'active';		
			else
				activeClass = '';

			image = `<figure class="photo-items `+activeClass+`" data-photo="`+i+`">
				    	<img src="img/profiles/p`+i+`.png">
					</figure>`;

			$(image).appendTo(".photos");
		}
	}

});