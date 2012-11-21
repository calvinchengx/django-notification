$(document).ready(function() {
	$("#notification-close").click(function() {
		var visible_li = $("ul#notifications").children().filter(':visible')[0];
		// mark the notice object as read
		$.ajax({
			type: 'POST',
			url: '/notifications/mark/ajax/',
			data: { csrfmiddlewaretoken: csrf_token, notice_id: visible_li.id },
			success: function(data) {
				// once successful, we will kill off the notice from the dom
				$(visible_li).remove();
				if ($("ul#notifications").children().length == 0) {
					// there's no more li elements. remove everything.
					$("ul#notifications").parent().remove();	
				}
			},
			dataType: 'json'
		});

	});
});
