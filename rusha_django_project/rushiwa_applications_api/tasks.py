import os
from celery import shared_task
from .tasks_f.create_git_repo import GitRepo
from .tasks_f.create_nginx_conf import NginxConf


@shared_task(bind=True)
def create_git_repo_task(*args, **application):
    print('create_git_repo_task')
    GitRepo().create_git_repo(**application)