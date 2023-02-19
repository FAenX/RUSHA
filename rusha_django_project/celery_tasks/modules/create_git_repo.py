import subprocess
from library.error_handler import ErrorHandler, CeleryWorkerSteps, Application as ApplicationEnum



from library.git_templates.templates import react_post_receive_template
from library.application import Application
from library.enums.application_types import static_files

from applications.models import Application as ApplicationModel
from library.notifications_handler import  NotificationType
from library.send_notification import SendNotification
from applications.serializers import ApplicationSerializer
from library.redis_connection import RedisConnection






class GitRepo:
    def __init__(self, application):
        print(application)
        self.payload = application
        
        
        self.notification_sender = SendNotification(
            self.payload,
            notification_type=NotificationType.SUCCESS

        )
        self.redis_connection = RedisConnection()

        
       
        
    def create_git_repo(self):  
        try:          
            application = Application(self.payload)

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
                template = post_receive_template(tempdir, project_path, git_dir_path, application.application_port)
                file.write(template)
            
            subprocess.check_call(f'chmod +x {git_dir_path}/hooks/*', shell=True)
            ApplicationModel.objects.filter(id=application.id).update(local_git_repo=git_link)
            user_id = self.payload['user_id']
            self.redis_connection.insert_key_value_pair(f"{user_id}_home_page_cache_data_updated", str(True))

            
            
            self.notification_sender.send_notification(
                message={
                    "type": self.notification_sender.notification_type,
                    "message": "Application git repository created successfully",
                    "step": CeleryWorkerSteps.CREATE_GIT_REPO,
                }
            )
            
            
                

            return 0
        except Exception as e:
            error_handler = ErrorHandler(ApplicationEnum.CELERY_WORKER, self.payload)
            error_handler.handle_error(step=CeleryWorkerSteps.CREATE_GIT_REPO, error=e)
            

        