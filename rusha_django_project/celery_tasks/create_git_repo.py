import json
import subprocess
import os

import yaml
import logging


from .git.templates import react_post_receive_template
from .application import Application
from .enums.application_types import static_files, api

from rushiwa.models import Application as ApplicationModel





class GitRepo:
    def create_git_repo(self, **application):

        print(static_files)

        
        try:            
            application = Application(application)

            if application.framework.lower() == "react":
                post_receive_template = react_post_receive_template
            else:
                pass

            
            git_dir_path = f"/git/{application.application_name}.git"
            project_path = f"/applications/{application.application_name}"

            if application.framework in static_files:
                project_path = f"/static/{application.application_name}"

            
            tempdir = f"/tmp/{application.application_name}"
            subprocess.check_call(f'git init --bare --shared=all {git_dir_path}', shell=True)

            root_domain = application.domain_name.split('.')[1]

            git_link = f'git@{root_domain}:/git/{application.application_name}.git'

    
            with open(f'{git_dir_path}/hooks/post-receive', 'w') as file:
                template = react_post_receive_template(tempdir, project_path, git_dir_path, application.application_port)
                file.write(template)
            
            subprocess.check_call(f'chmod +x {git_dir_path}/hooks/*', shell=True)
            ApplicationModel.objects.filter(id=application.id).update(local_git_repo=git_link)

    
            
                

            return 0
        except Exception as e:
            logging.getLogger().setLevel(logging.ERROR)
            logging.getLogger().error(e)
            raise e
            