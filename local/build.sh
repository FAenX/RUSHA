#!/bin/bash
# docker build . -t python-poetry-build

# docker run --rm --workdir /github/workspace --user root -v "${PWD}":/github/workspace --entrypoint /bin/bash python-poetry-build -c "\
#     pip install poetry --cache-dir=.pip; \
#     poetry export -f requirements.txt  -o requirements.txt --without-hashes; \
#     pip install -t dist/src -r requirements.txt --cache-dir=.pip ; \
#     cp -rv --exclude=dist ./* dist/src/; \
#     rm requirements.txt;"


docker run --rm -v "${PWD}":/github/workspace \
--workdir /github/workspace \
--entrypoint /bin/bash \
--volume "${PWD}:/github/workspace" \
--workdir /github/workspace \
rusha-rushiwa_django -c "\
    cd rusha_django_project; \
    ls -la; \
    poetry update -vvv; \   
   "