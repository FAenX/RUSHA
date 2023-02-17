import os

import django

from celery import Celery
import os
import json
import subprocess




# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rusha_django.settings')
django.setup()

from .modules.create_git_repo import GitRepo
from .modules.create_nginx_conf import NginxConf
from .modules.create_application import CreateApplication
from library.error_handler import ErrorHandler
from library.notifications_handler import NotificationsHandler, NotificationType
from library.redis_connection import RedisConnection





# celery worker
app = Celery('rusha_worker')

app.config_from_object('django.conf:settings', namespace='CELERY_WORKER')


@app.task(bind=True)
def create_application_task(*args, **kwargs):
    payload = kwargs.get('payload')
    
    user_id = payload['userId']
    payload['user_id'] = user_id



    notification_sender = NotificationsHandler(
        payload,
        notification_type=NotificationType.SUCCESS
    )


    try:
        saved_application = CreateApplication(payload).create_application()
        saved_application['user_id'] = user_id

        print(saved_application)
        GitRepo(saved_application).create_git_repo()
        NginxConf(saved_application).create_nginx_conf()
        notification_sender.send_notification(message={
            'message': 'Application configurations created successfully',
            'type': notification_sender.notification_type
        })

        return True
    except Exception as e:
        # write to a redis notification queue to admin
        error_handler = ErrorHandler('celery_worker', payload)
        error_handler.handle_error()


@app.task(bind=True)
def cache_project_page_visits(*args, **cache_data):
    redis_connection = RedisConnection()
    
    key = f"{cache_data.get('userId')}_home_page_cache_data"
    redis_connection.insert_key_value_pair(key, json.dumps(cache_data))

    
app.conf.beat_schedule = {
    "restart_nginx": {
        "task": "celery_tasks.celery_worker.restart_nginx",
        "schedule": 15, 
    }
}

@app.task
def restart_nginx(*args, **kwargs):
    # print(args, kwargs)
    redis_connection = RedisConnection()
    
    if redis_connection.get_value('nginx_restart_queue') == b'1':
       
        
        subprocess.run(
            'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock rusha sh -c "docker restart rusha_nginx"', 
            shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

       
        redis_connection.insert_key_value_pair('nginx_restart_queue', 0)
        
            
 


if __name__ == '__main__':
    restart_nginx()

    



