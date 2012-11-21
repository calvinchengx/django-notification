$(document).ready(function() {
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
