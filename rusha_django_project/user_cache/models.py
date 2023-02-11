import datetime
import uuid
from django.db import models
from api_users.models import User

# Create your models here.

class HomePageCache(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_created = models.DateTimeField(default=datetime.datetime.now)
    date_updated = models.DateTimeField(default=datetime.datetime.now)
    is_active = models.BooleanField(default=True)
    cache = models.TextField()

    def __str__(self):
        return self.user
