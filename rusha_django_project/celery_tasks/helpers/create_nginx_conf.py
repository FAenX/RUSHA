import json
from .nginx.create_default_html import CreateDefaultLandingPage
from .application import Application
from .nginx.nginx_static_files_with_proxy_configuration import NginxStaticFilesWithProxyConfiguration
import logging
import os
from .enums.application_types import static_files, api
from applications.models import Application as ApplicationModel
import redis
from django_redis import get_redis_connection


class NginxConf:
    def create_nginx_conf(self, application, user_id):
       
        connection = get_redis_connection("default")
        try:
            #  create ../nginx/sites-available/ folder if not exists
            sites_available_path = '../nginx/sites-available'
            if not os.path.exists(sites_available_path):
                os.makedirs(sites_available_path)
            application = Application(application)
            if application.framework in static_files:
                NginxStaticFilesWithProxyConfiguration(application)\
                .create_nginx_static_files_with_proxy_configuration()
                print(static_files)
                CreateDefaultLandingPage(application).create_nginx_static_files_with_proxy_configuration()
            elif application.framework in api:
                pass

           
            connection.set('nginx_restart_queue', 1 )

            connection.lpush(f'{user_id}_notification_queue', json.dumps({
                'message': f'Nginx configuration created successfully',
                'type': 'success',
                "activeStep": 3,
                "failedStep": 5
            }))
            

            return 0
        except Exception as e:
            logging.getLogger().setLevel(logging.ERROR)
            logging.getLogger().error(e)
           
            connection.lpush(f'{user_id}_notification_queue', json.dumps({
                'message': f'Application could not be created',
                'type': 'error',
                'failedStep': 2
            }))
            raise e
