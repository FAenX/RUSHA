#! /usr/bin/python3 


import redis
import os
import subprocess


def restart_nginx(*args, **kwargs):
    try:
        print(args, kwargs)
        redis_connection = redis.Redis(host='localhost', port=6379, db=0)
        if redis_connection.get('nginx_restart_queue') == b'1':
            print('nginx restart')
            subprocess.Popen('docker exec -it rusha_nginx nginx -s reload', shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            print('nginx restarted')
            redis_connection.set('nginx_restart_queue', 0)
        else:
            print('nginx not restarted')
    except Exception as e:
        print(e)


if __name__ == '__main__':
    restart_nginx()



