# create nginx static files wirh external proxy configuration    

import os
import logging
from jinja2 import Environment, FileSystemLoader



class CreateDefaultLandingPage:
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
            # render jinja template
            path = os.path.dirname(os.path.abspath(__file__))
            env = Environment(loader=FileSystemLoader(f'{path}/templates'))
            template = env.get_template('default.html')
            output_from_parsed_template = template.render(application=self.application)
            print(output_from_parsed_template)

            if not os.path.exists(f'../static/{self.application_name}'):
                os.makedirs(f'../static/{self.application_name}')
                with open(f'../static/{self.application_name}/index.html', 'w') as f:
                    f.write(output_from_parsed_template) 

            


            

        except Exception as e:
            logging.getLogger().setLevel(logging.ERROR)
            logging.getLogger().error(e)
            raise e
        