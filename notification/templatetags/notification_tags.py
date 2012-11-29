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

        rendered_notices = ''

        try:
            notices = None
            user = context['request'].user
            if user.is_authenticated():
                notices = Notice.objects.notices_for(user=user, unseen=True, on_site=True)

            # Add in notices available in our context and pass the entire
            # context to our template
            context['notices'] = notices
            rendered_notices = render_to_string('notification/notifications_user.html', \
                                                context)
        except:
            pass

        return rendered_notices


def do_show_notifications(parser, token):
    return ShowNotifications()


register.tag('show_notifications', do_show_notifications)