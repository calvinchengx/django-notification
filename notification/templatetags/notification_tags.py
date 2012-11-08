from django import template
from django.template.loader import render_to_string
from notification.models import Notice
register = template.Library()


class ShowNotifications(template.Node):
    """
    Given a user object in the template, return notifications which are on_site=True for
    this user
    """

    def render(self, context):
        user = context['request'].user
        notices = None
        if user:
            notices = Notice.objects.notices_for(user, on_site=True)

        rendered_notices = render_to_string('notification/notifications_user.html', \
                                            {'notices': notices})
        return rendered_notices


def do_show_notifications(parser, token):
    return ShowNotifications()


register.tag('show_notifications', do_show_notifications)
