import datetime
import uuid

import django
from django.db import models

class Project(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project_name = models.CharField(max_length=200, unique=True)
    description = models.CharField(max_length=200, null=True)
    date_created = models.DateTimeField(default=datetime.datetime.now)
    tag = models.CharField(max_length=200, null=True)
   
    
    def __str__(self):
        return self.project_name


# Create your models here.
class Application(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE)
    application_name = models.CharField(max_length=200, unique=True)
    framework = models.CharField(max_length=200)
    local_git_repo = models.CharField(max_length=200, null=True)
    description = models.CharField(max_length=200, null=True)
    tag = models.CharField(max_length=200, default='latest')
    date_created = models.DateTimeField(default=datetime.datetime.now)
    application_port = models.IntegerField(unique=True)
    domain_name = models.CharField(max_length=200, unique=True)
    application_path = models.CharField(max_length=200, unique=True)
    proxy_host_name_and_or_port = models.CharField(max_length=200, default='http://localhost:8080')
    
    
    def __str__(self):
        return self.application_name


    



   
    