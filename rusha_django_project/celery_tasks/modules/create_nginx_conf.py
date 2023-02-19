from library.nginx.create_default_html import CreateDefaultLandingPage
from library.application import Application
from library.nginx.nginx_static_files_with_proxy_configuration import NginxStaticFilesWithProxyConfiguration
import os
from library.enums.application_types import static_files, api

from library.notifications_handler import  NotificationType
from library.error_handler import ErrorHandler, Application as ApplicationEnum, CeleryWorkerSteps
from library.redis_connection import RedisConnection
from library.send_notification import SendNotification
from applications.serializers import ApplicationSerializer



class NginxConf:
    def __init__(self, application):
        self.payload = application
        
        self.notification_sender = SendNotification(
            self.payload,
            notification_type=NotificationType.SUCCESS

        )
        self.redis_connection = RedisConnection()
    
    def create_nginx_conf(self):
        try:
            #  create ../nginx/sites-available/ folder if not exists
            sites_available_path = '../nginx/sites-available'
            if not os.path.exists(sites_available_path):
                os.makedirs(sites_available_path)
            application = Application(self.payload)
            if application.framework in static_files:
                NginxStaticFilesWithProxyConfiguration(application)\
                .create_nginx_static_files_with_proxy_configuration()
                print(static_files)
                CreateDefaultLandingPage(application).create_nginx_static_files_with_proxy_configuration()
            elif application.framework in api:
                pass

            
            self.redis_connection.insert_key_value_pair('nginx_restart_queue', 1)

            self.notification_sender.send_notification(
                message = {
                "type": self.notification_sender.notification_type,
                "message": "Application nginx configuration created successfully",
                "step": CeleryWorkerSteps.CREATE_NGINX_CONF,
                }
            )


            

            return 0
        except Exception as error:
            error_handler = ErrorHandler(ApplicationEnum.CELERY_WORKER, self.payload)
            error_handler.handle_error(step=CeleryWorkerSteps.CREATE_NGINX_CONF, error=error)
            
        
