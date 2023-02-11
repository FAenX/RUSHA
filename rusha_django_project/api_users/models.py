import datetime
import uuid
from django.db import models

# Create your models here.


class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=200, unique=True)
    password = models.CharField(max_length=200)
    date_created = models.DateTimeField(default=datetime.datetime.now)
    date_updated = models.DateTimeField(default=datetime.datetime.now)
    is_active = models.BooleanField(default=True)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)


    def __str__(self):
        return self.first_name + " " + self.last_name