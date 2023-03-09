import json
from applications.serializers import ApplicationSerializer
from library.notifications_handler import NotificationType
from library.redis_connection import RedisConnection
from content_api.serializers import ApplicationProjectSerializer
from library.send_notification import SendNotification




from library.generate_application_path import generate_application_path
from library.generate_application_port import generate_application_port
from library.generate_domain_name import generate_domain_name
from library.get_host_name import get_hostname
from library.error_handler import ErrorHandler, CeleryWorkerSteps, Application as ApplicationEnum
from django.db import connection





class CreateApplication:
    def __init__(self, payload):
        self.payload = payload
        self.user_id = self.payload['user_id']
        self.notification_sender = SendNotification(
            self.payload,
            notification_type=NotificationType.SUCCESS

        )
        self.redis_connection = RedisConnection()

    def create_application(self):
        try:
            application_name = self.payload['applicationName']
            project_id = self.payload['projectId']
            application_path = generate_application_path(application_name)
            application_port = generate_application_port()
            domain_name = generate_domain_name(application_name)

            application = {}

            application["framework"] = self.payload["framework"]
            application['application_name'] = application_name
            application['application_path'] = application_path
            application['application_port'] = application_port
            application['domain_name'] = domain_name
            application['proxy_host_name_and_or_port'] = f'{get_hostname()}:{application_port}'
            application['project'] = project_id

            app_serializer = ApplicationSerializer(data=application)

            if app_serializer.is_valid():
                app_serializer.save()

                rows = []
                with connection.cursor() as cursor:
                    cursor.execute("""
                    SELECT row_to_json(t)
                    FROM (
                    SELECT * FROM projects_project 
                    JOIN applications_application ON projects_project.id = applications_application.project_id
                    WHERE projects_project.user_id = 'a6397cf3-7315-46bc-a095-f6322bf7d6af'
                    ORDER BY applications_application.date_created DESC
                    ) t;
                    """, [project_id])


                    rows = cursor.fetchall()



                serializer = ApplicationProjectSerializer([i[0] for i in rows], many=True)
                serializer_data = serializer.data

                
                key = f"{self.user_id}_home_page_cache_data"

                self.redis_connection.insert_key_value_pair(key, json.dumps(serializer_data))

                self.notification_sender.send_notification(message={
                    'message': 'Application saved successfully',
                    "type": self.notification_sender.notification_type,
                    "step": CeleryWorkerSteps.SAVE_APPLICATION         
                })

                app = app_serializer.data
                app['project'] = str(app['project'])
                return app

            else:
                raise Exception(app_serializer.errors)
        except Exception as e:
            error_handler = ErrorHandler(ApplicationEnum.CELERY_WORKER, self.payload)
            error_handler.handle_error(step=CeleryWorkerSteps.SAVE_APPLICATION, error=e)
            
        
    