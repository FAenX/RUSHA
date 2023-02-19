import json

from .notifications_handler import NotificationsHandler, NotificationAudience, NotificationType
from .send_notification import SendNotification


class Application:
    CREATE_APPLICATION_API = 'create_application_API'
    CELERY_WORKER = 'celery_worker'

class CeleryWorkerSteps:
    SAVE_APPLICATION = 'save_application'
    CREATE_GIT_REPO = 'create_git_repo'
    CREATE_NGINX_CONF = 'create_nginx_conf'
    COMPLETED = 'completed'


    



class ErrorHandler:
    def __init__(self, application, payload) -> None:
        self.payload = payload
        self.application = application

        
        self.send_notification = SendNotification(payload, notification_type=NotificationType.ERROR)


    
        
    def handle_error(self, step=None, error=None):
        if self.application == Application.CREATE_APPLICATION_API:
            self.create_application_API()
        elif self.application == Application.CELERY_WORKER:
            self.celery_worker(step, error)

    
            
    def create_application_API(self, error):
        pass

    
    
    def celery_worker(self, step, error):

        # user notification
        self.send_notification.send_notification(
            message = {
            "type": self.send_notification.notification_type,
            "message": "Error while creating application",
            "step": step,
            },
            
        )

        raise Exception(error)
        
           
        
        
        
    