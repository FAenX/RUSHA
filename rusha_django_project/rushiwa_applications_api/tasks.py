import os
from celery import shared_task
from .tasks_helpers.create_application import save_application_to_db
from .tasks_helpers.create_git_repo import GitRepo
from .tasks_helpers.create_nginx_conf import NginxConf


@shared_task(bind=True)
def create_git_repo_task(*args, **application):
    application = save_application_to_db(**application)
    GitRepo().create_git_repo(**application)
    NginxConf().create_nginx_conf(**application)