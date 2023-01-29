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



# celery worker
app = Celery('rusha_django_worker')

print (app)

app.config_from_object('django.conf:settings', namespace='CELERY_WORKER')


@app.task(bind=True)
def create_git_repo_task(*args, **application):
    application = save_application_to_db(**application)
    GitRepo().create_git_repo(**application)
    NginxConf().create_nginx_conf(**application)



