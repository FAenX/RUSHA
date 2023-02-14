import datetime
import uuid
from django.db import models

from api_users.models import User

# Create your models here.




class Project(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project_name = models.CharField(max_length=200, unique=True)
    description = models.CharField(max_length=200, null=True)
    date_created = models.DateTimeField(default=datetime.datetime.now)
    tag = models.CharField(max_length=200, null=True)
   
    
    def __str__(self):
        return self.project_name


