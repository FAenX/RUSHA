from library.notifications_handler import NotificationsHandler



class SendNotification(object):
    def __init__(self, payload, notification_type=None):
        self.notification_type = notification_type
      
        self.notifications_handler = NotificationsHandler(
            payload,
            notification_type=self.notification_type,

        )
    

    def send_notification(self, message=None):
        self.notifications_handler.send_notification(message=message)

   



  

    
    