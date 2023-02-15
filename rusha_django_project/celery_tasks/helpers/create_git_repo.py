import json
import subprocess
import os
from applications.serializers import ApplicationSerializer
from django_redis import get_redis_connection

import yaml
import logging


from .git_templates.templates import react_post_receive_template
from .application import Application
from .enums.application_types import static_files, api

from applications.models import Application as ApplicationModel





class GitRepo:
    def create_git_repo(self, application, user_id):
        connection = get_redis_connection("default")
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

    
          
            connection.lpush(f'{user_id}_notification_queue', json.dumps({
                'message': f'successfully created git repo',
                'type': 'success',
                "activeStep": 2,
                "failedStep": 5
            }))
          
            
                

            return 0
        except Exception as e:
            logging.getLogger().setLevel(logging.ERROR)
            logging.getLogger().error(e)
             # write to a redis notification queue
            
            
            connection.lpush(f'{user_id}_notification_queue', json.dumps({
                'message': f'Application could not be created',
                'type': 'error',
                'failedStep': 2
            }))
            raise e
            