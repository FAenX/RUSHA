import os

import django

from celery import Celery
import os


# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rusha_django.settings')
django.setup()

from celery_tasks.helpers.create_application import save_application_to_db
from celery_tasks.helpers.create_git_repo import GitRepo
from celery_tasks.helpers.create_nginx_conf import NginxConf
from django_redis import get_redis_connection
from celery.schedules import crontab

app = Celery('rusha_django_worker')

print (app)

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

@app.task(bind=True)
def create_git_repo_task(*args, **application):
    application = save_application_to_db(**application)
    GitRepo().create_git_repo(**application)
    NginxConf().create_nginx_conf(**application)

@app.task
def restart_nginx():
    try:
        con = get_redis_connection()
        print(con)
        print('restart nginx')
        message = con.get('nginx_restart')
        print(message)

        if message == b'1':
            con.set('nginx_restart', '0')
            os.system("docker exec rusha_nginx nginx -s reload")
    except Exception as e:
        print(e)
        raise e

app.conf.beat_schedule = {
    "restart_nginx": {
        "task": "celery_tasks.celery_worker.restart_nginx",
        "schedule": crontab(minute="*", hour="*", day_of_week="*")
    }
}


