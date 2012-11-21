$(document).ready(function() {

	left_arrow = $(".notification-wrapper .container").find("a").first()
	right_arrow = $(".notification-wrapper .container").find("a").last()

	function show_next(notice_list) {
		var visible_li = notice_list.children().filter(':visible')[0];
		
		next_length = $(visible_li).next('li').length
		previous_length = $(visible_li).first().length

		// determine who to show
		if ( next_length > 0 ) {
			next_visible_li = $(visible_li).next('li')
		} else if ( next_length == 0 && previous_length == 1 ) {
			next_visible_li = notice_list.children().first();
		}

		// show the next li element; and hide the current li element
		$(next_visible_li).css("display", "block");
		$(visible_li).css("display", "none");

		return $(next_visible_li);
	}

	// render arrow icons as needed
	$(".notification-wrapper .container").hover(
		function () {
			$(left_arrow).addClass("leftArrow");
			$(right_arrow).addClass("rightArrow");
		},
		function () {
			$(left_arrow).removeClass("leftArrow");
			$(right_arrow).removeClass("rightArrow");
		}
	);

	// notice manual rotation logic
	var notice_list = $("ul#notifications");
	$(left_arrow).click(function() {
		show_next(notice_list);
	});
	
	$(right_arrow).click(function() {
		show_next(notice_list);
	});

	// notice handling logic
	$("#notification-close").click(function() {
		visible_li = $("ul#notifications").children().filter(':visible')[0];
		// mark the notice object as read
		$.ajax({
			type: 'POST',
			url: '/notifications/mark/ajax/',
			data: { csrfmiddlewaretoken: csrf_token, notice_id: visible_li.id },
			success: function(data) {

				// once successful, we will  show either the next item or the first
				// and kill off the current notice from the dom
				if ( $(visible_li).next('li').length > 0 ) {
					$(visible_li).next('li').show();
				} else if ( $(visible_li).next('li').length == 0 && $(visible_li).first().length == 1 ) {
					next_visible_li = $(visible_li).first('li')[0];
					$(next_visible_li).show();
				}
				$(visible_li).remove();

				if ($("ul#notifications").children().length == 0) {
					// and there's no more li elements. remove everything.
					$(".notification-wrapper").remove();	
				}
			},
			dataType: 'json'
		});

	});
});
