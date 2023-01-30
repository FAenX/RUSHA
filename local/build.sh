#! /bin/bash
docker run --rm \
--volume rusha:/usr \
--workdir /usr/src \
--entrypoint /bin/bash \
--volume "${PWD}/rusha_django_project:/usr/src" \
--volume "${PWD}/dist/:/usr/src/dist" \
--volume "${PWD}/cron_jobs:/usr/src/cron_jobs" \
python:3.9 -c "\
    python manage.py migrate 
   "