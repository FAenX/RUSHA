import datetime
import uuid

import django
from django.db import models

class Cache(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cache_name = models.CharField(max_length=200, unique=True)
    cache_type = models.CharField(max_length=200)
    cache_port = models.IntegerField(unique=True)
    cache_path = models.CharField(max_length=200, unique=True)
    date_created = models.DateTimeField(default=datetime.datetime.now)
    
    def __str__(self):
        return self.cache_name
    