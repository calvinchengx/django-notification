$(document).ready(function() {
	$("#notification-close").click(function() {
		var visible_li = $("ul#notifications").children().filter(':visible')[0];
		console.log(visible_li.id);
		console.log(csrf_token);
		// mark the notice object as read
		$.ajax({
			type: 'POST',
			url: '/notifications/mark/ajax/',
			data: { csrfmiddlewaretoken: csrf_token, notice_id: visible_li.id },
			success: function(data) {
				// once successful, we will kill off the notice from the dom
				$(visible_li).remove();
			},
			dataType: 'json'
		});

	});
});
