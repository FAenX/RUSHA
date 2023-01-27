import redis
import os
import django


from celery import Celery
import logging



# celery beat
beat_app = Celery('beat_app', broker='redis://localhost:6379/0', backend='redis://localhost:6379/0')

beat_app.conf.beat_schedule = {
    "restart_nginx": {
        "task": "celery_tasks.celery_beat.restart_nginx",
        "schedule": 15, 
    }
}

@beat_app.task
def restart_nginx(*args, **kwargs):
    print(args, kwargs)
    redis_connection = redis.Redis(host='localhost', port=6379, db=0)
    if redis_connection.get('nginx_restart_queue') == b'1':
        print('nginx restart')
        os.system('docker exec -it rusha_nginx nginx -s reload')
        redis_connection.set('nginx_restart_queue', 0)
    else:
        print('nginx not restarted')



