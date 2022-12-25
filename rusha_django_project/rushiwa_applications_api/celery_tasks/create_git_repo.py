import json
import subprocess
import os

import yaml
import logging


from .helpers.post_receive_templates import replace_template
from .helpers.application import Application

from rushiwa_applications_api.models import Application as ApplicationModel





class GitRepo:
    def create_git_repo(self, **application):

        
        try:            
            application = Application(application)
            
            git_dir_path = f"../git/{application.application_name}.git"
            project_path = f"../applications/{application.application_name}"
            tempdir = f"../tmp/{application.application_name}"
            subprocess.check_call(f'git init --bare --shared=all {git_dir_path}', shell=True)

    
            with open(f'{git_dir_path}/hooks/post-receive', 'w') as file:
                template = replace_template(tempdir, project_path, git_dir_path, application.application_port)
                file.write(template)
            
            subprocess.check_call(f'chmod +x {git_dir_path}/hooks/post-receive', shell=True)

            print("try to update git dir")
            ApplicationModel.objects.filter(id=application.id).update(local_git_repo=git_dir_path)

    
            
                

            return 0
        except Exception as e:
            logging.getLogger().setLevel(logging.ERROR)
            logging.getLogger().error(e)
            raise e
            