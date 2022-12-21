# create nginx static files wirh external proxy configuration    

import os
import logging


env = 'local'


class NginxStaticFilesWithProxyConfiguration:
    def __init__(self, application):
        self.application = application
        self.application_name = application.application_name
        self.framework = application.framework
        self.id = application.id
        self.application_port = application.application_port
        self.domain_name = application.domain_name
        self.application_path = application.application_path
        self.proxy_host_name_and_or_port = application.proxy_host_name_and_or_port
    
    def create_nginx_static_files_with_proxy_configuration(self):
        
        try:

            template = f'''
server {{
    listen 80;
    server_name {self.domain_name};
    location / {{
        proxy_pass {self.proxy_host_name_and_or_port}$uri;
    }}
}}
            '''
            
            # create /etc/nginx/sites-available/application_name.conf
            with open(f'../nginx/nginx.conf.d/auto-{self.application_name}.conf', 'w') as f:
                f.write(template)
           
            # queue a restart if needed
            if env == 'local':
                pass
            else:
                os.system("docker exec rusha_nginx nginx -s reload")
            

            

        except Exception as e:
            logging.getLogger().setLevel(logging.ERROR)
            logging.getLogger().error(e)
            raise e
        