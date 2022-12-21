from .application import Application
from .nginx_static_files_with_proxy_configuration import NginxStaticFilesWithProxyConfiguration
import logging
import os
from .application_types import static_files, api
from rushiwa_applications_api.models import Application as ApplicationModel

class NginxConf:
    def create_nginx_conf(self, **application):
        try:
            #  create ../nginx/sites-available/ folder if not exists
            sites_available_path = '../nginx/sites-available'
            if not os.path.exists(sites_available_path):
                os.makedirs(sites_available_path)


          
            application = Application(application)
            if application.framework in static_files:
                NginxStaticFilesWithProxyConfiguration(application)\
                .create_nginx_static_files_with_proxy_configuration()
                # ApplicationModel.objects.filter(id=application.id).update(nginx_conf=f'{sites_available_path}/{application.application_name}')
            elif application.framework in api:
                pass

            # queue nginx restart if not already queued
            
                   
            return 0
        except Exception as e:
            logging.getLogger().setLevel(logging.ERROR)
            logging.getLogger().error(e)
            raise e
