
docker build . -t celery_task &&
docker run --rm \
--volume cronjob:/home/root \
--volume "${PWD}":/home/root/app \
--workdir /home/root/app \
--entrypoint /bin/bash \
--network host \
celery_task -c "\
      cd rusha_django_project && celery -A rusha_django.nginx_restart_task beat --loglevel=INFO  \
   ";