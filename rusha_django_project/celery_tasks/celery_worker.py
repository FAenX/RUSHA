import os

import django

from celery import Celery
import os
import json


# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rusha_django.settings')
django.setup()

from .helpers.create_git_repo import GitRepo
from .helpers.create_nginx_conf import NginxConf
from .helpers.create_application import CreateApplication
from django_redis import get_redis_connection
import subprocess



# celery worker
app = Celery('rusha_django_worker')

print (app)

app.config_from_object('django.conf:settings', namespace='CELERY_WORKER')


@app.task(bind=True)
def create_application_task(*args, **kwargs):
    application = kwargs.get('application')
    user_id = application.get('user_id')
    connection = get_redis_connection("default")
    try:
        saved_application = CreateApplication().create_application(application, user_id)
        GitRepo().create_git_repo(saved_application, user_id)
        NginxConf().create_nginx_conf(saved_application, user_id)

        connection.lpush(f'{user_id}_notification_queue', json.dumps({
                'message': f'Nginx configuration created successfully',
                'type': 'success',
                "activeStep": 4,
                "failedStep": 5
            }))
            
        
        return True
    except Exception as e:
        # write to a redis notification queue to admin
        
        connection.lpush(f'{user_id}_notification_queue', json.dumps({
            'message': f'Application {application.get("application_name")} could not be created',
            'type': 'error',
            "error": f"{e}",
            'failedStep': 1,
            "activeStep": 1
        }))

        raise e
        
        


   

   



@app.task(bind=True)
def cache_project_page_visits(*args, **cache_data):
    print (cache_data)
    print (args)
    print ('cache_project_page_visits')
    redis_connection = get_redis_connection("default")
    key = f"{cache_data.get('userId')}_home_page_cache_data"
    redis_connection.set(key, json.dumps(cache_data))

    
app.conf.beat_schedule = {
    "restart_nginx": {
        "task": "celery_tasks.celery_worker.restart_nginx",
        "schedule": 15, 
    }
}

@app.task
def restart_nginx(*args, **kwargs):
    # print(args, kwargs)
    redis_connection = get_redis_connection("default")
    if redis_connection.get('nginx_restart_queue') == b'1':
        print('nginx restart')
        
        subprocess.run(
            'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock rusha sh -c "docker restart rusha_nginx"', 
            shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

       
        redis_connection.set('nginx_restart_queue', 0)
        
            
 


if __name__ == '__main__':
    restart_nginx()

    



