import json



from .redis_connection import RedisConnection

class NotificationType:
    INFO = 'info'
    SUCCESS = 'success'
    ERROR = 'error'

class NotificationAudience:
    ADMIN = 'admin'
    USER = 'user'





class NotificationsHandler(object):
    def __init__(self, payload, notification_type=NotificationType.INFO, audience=["user", "admin"]):
        self.payload = payload
        self.redis_connection = RedisConnection()
        self.user_id = self.payload['user_id']
        self.audience = audience
        self.notification_type = notification_type
        self.user_notification_queue = f'{self.user_id}_notification_queue'
        self.admin_notification_queue = 'admin_notification_queue'

    def send_notification(self, message=None):
        for audience in self.audience:
            if audience == NotificationAudience.ADMIN:
                self.redis_connection.insert_list(
                    self.admin_notification_queue, 
                    json.dumps({
                        "payload": self.payload,
                        "message": message,
                    })
                    )
            elif audience == NotificationAudience.USER:
                self.redis_connection.insert_list(
                    self.user_notification_queue, 
                    json.dumps({
                        "message": message,
                    })
                   )


    


    
    
        

        