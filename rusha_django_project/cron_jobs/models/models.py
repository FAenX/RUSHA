import django
from django.db import models
import uuid


# class RedisQueueToReloadNginx(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     status = models.CharField(max_length=200, default='pending')
#     date_created = models.DateField(default=django.utils.timezone.now)

#     class Meta:
#         using = 'redis'



