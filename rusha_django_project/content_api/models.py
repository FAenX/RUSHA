import datetime
import uuid
from django.db import models

# Create your models here.

class HomePageContent(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date_created = models.DateTimeField(default=datetime.datetime.now)
    date_updated = models.DateTimeField(default=datetime.datetime.now)
    is_active = models.BooleanField(default=True)
    content = models.JSONField()

    def __str__(self):
        return self.content

class NavigationBar(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date_created = models.DateTimeField(default=datetime.datetime.now)
    date_updated = models.DateTimeField(default=datetime.datetime.now)
    is_active = models.BooleanField(default=True)
    title = models.CharField(max_length=200)
    link_to = models.CharField(max_length=200)

    def __str__(self):
        return self.content

class CreateApplicationPageContent(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date_created = models.DateTimeField(default=datetime.datetime.now)
    date_updated = models.DateTimeField(default=datetime.datetime.now)
    is_active = models.BooleanField(default=True)
    repositories = models.JSONField(null=True)
    frameworks = models.JSONField(null=True)
    

    def __str__(self):
        return "Create Application Page Content"
