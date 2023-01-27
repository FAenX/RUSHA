#!/bin/bash

image_name="rusha"
docker build -t "${image_name}" .



docker run --network=host -d --rm \
--name rusha-celery-beat-worker \
--workdir /usr/rusha \
--volume rusha:/usr \
--volume "${PWD}/rusha_django_project/":/usr/rusha \
"${image_name}" -c "\
celery -A celery_tasks.celery_beat worker --loglevel INFO;
" 

docker run --network=host -d --rm \
--name rusha-celery-beat \
--workdir /usr/rusha \
--volume rusha:/usr \
--volume "${PWD}/rusha_django_project/":/usr/rusha \
"${image_name}" -c "\
celery -A celery_tasks.celery_beat beat --loglevel INFO;
"


docker-compose -f docker-compose-dev.yml up --build 