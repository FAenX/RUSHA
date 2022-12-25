import os
from celery import shared_task
from .celery_tasks.create_application import save_application_to_db
from .celery_tasks.create_git_repo import GitRepo
from .celery_tasks.create_nginx_conf import NginxConf
import redis

con = redis.Redis(host='redis', port=6379, db=0)

@shared_task(bind=True)
def create_git_repo_task(*args, **application):
    application = save_application_to_db(**application)
    GitRepo().create_git_repo(**application)
    NginxConf().create_nginx_conf(**application)

