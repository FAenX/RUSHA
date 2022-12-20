#!/usr/local/bin/python3

import os
import sys
import logging
import django
import redis
from django_redis import get_redis_connection


def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rusha_django.settings')
    django.setup()
    try:
        logging.getLogger().setLevel(logging.INFO)
        logging.info('-----------------')
        logging.info('Starting cron job')
        from cron_jobs.utils.create_git_repo import GitRepo
        from cron_jobs.utils.create_nginx_conf import NginxConf


        
        GitRepo().create_git_repo()
   
        NginxConf().create_nginx_conf()

        # 

        con = get_redis_connection('default')

        print(con)

        # Left Push
        res = con.lpush("mylist", "two", "one")
        print(res)

        logging.info('-----------------')
    
    except Exception as e:
        logging.getLogger().setLevel(logging.ERROR)
        logging.error(e)
        raise e
        
    

if __name__ == '__main__':
    main()
