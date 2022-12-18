import json
import subprocess
import os

import yaml
import logging
from .queries import get_pending_applications, update_application_status, update_git_dir
from .post_receive_templates import replace_template
from .application import Application

HOME = "/code"

class GitRepo:
    def create_git_repo(self):
        try:
            pending_applications = get_pending_applications()
            for app in pending_applications:
                application = Application(app)
               
                git_dir_path = f"../git/{application.application_name}.git"
                project_path = f"../applications/{application.application_name}"
                tempdir = f"../tmp/{application.application_name}"
                subprocess.check_call(f'git init --bare --shared=all {git_dir_path}', shell=True)

        
                with open(f'{git_dir_path}/hooks/post-receive', 'w') as file:
                    template = replace_template(tempdir, project_path, git_dir_path, application.application_port)
                    file.write(template)
                
                subprocess.check_call(f'chmod +x {git_dir_path}/hooks/post-receive', shell=True)

                update_git_dir(application.application_id, git_dir_path)
                # update_application_status(application.application_id, 'git_repo_created')
                

            return 0
        except Exception as e:
            logging.getLogger().setLevel(logging.ERROR)
            logging.getLogger().error(e)
            raise e
            