#! /bin/bash
docker run --rm \
--volume rusha:/usr \
--workdir /usr/src \
--entrypoint /bin/bash \
--volume "${PWD}/rusha_django_project:/usr/src" \
--volume "${PWD}/dist/:/usr/src/dist" \
--volume "${PWD}/cron_jobs:/usr/src/cron_jobs" \
python:3.9 -c "\
    pip install poetry; \  
    poetry export -f requirements.txt  -o requirements.txt --without-hashes; \
    pip install -t dist/src -r requirements.txt --cache-dir=.pip ; \
    cp -r cron_jobs/* dist/src/; \
    rm requirements.txt;
   "