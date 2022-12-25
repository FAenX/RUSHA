import redis
import os

import os

from celery import Celery
from celery.schedules import crontab
import redis
from django_redis import get_redis_connection

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rusha_django.settings')

app = Celery('rusha_beat')

print (app)

app.config_from_object('django.conf:settings', namespace='CELERY')



@app.task()
def restart_nginx():
    con = get_redis_connection()
    print(con)
    print('restart nginx')
    message = con.get('nginx_restart')
    print(message)

    if message == b'1':
        con.set('nginx_restart', '0')
        os.system("docker exec rusha_nginx nginx -s reload")

app.conf.beat_schedule = {
    "restart_nginx": {
        "task": "rusha_django.nginx_restart",
        "schedule": crontab(minute="*", hour="*", day_of_week="*")
    }
}







