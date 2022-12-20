docker run --rm -v "${PWD}":/github/workspace \
--workdir /github/workspace \
--entrypoint /bin/bash \
--volume "${PWD}:/github/workspace" \
--workdir /github/workspace \
rusha-rushiwa_django -c "\
   python ./rusha_django_project/dequeue_new_applications.py; \
   "