import subprocess
from library.error_handler import ErrorHandler



from library.git_templates.templates import react_post_receive_template
from library.application import Application
from library.enums.application_types import static_files

from applications.models import Application as ApplicationModel
from library.notifications_handler import  NotificationType
from library.send_notification import SendNotification
from applications.serializers import ApplicationSerializer






class GitRepo:
    def __init__(self, application):
        print(application)
        self.payload = application
        
        
        self.notification_sender = SendNotification(
            self.payload,
            notification_type=NotificationType.SUCCESS

        )

        
       
        
    def create_git_repo(self):           
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


        
        self.notification_sender.send_notification(
            message={
                "type": self.notification_sender.notification_type,
                "message": "Application git repository created successfully"
            }
        )
        
        
            

        return 0
    