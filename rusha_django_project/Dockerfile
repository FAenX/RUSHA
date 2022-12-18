FROM python:3.9

RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - 
RUN curl https://packages.microsoft.com/config/debian/11/prod.list > /etc/apt/sources.list.d/mssql-release.list
RUN apt-get update\
    && ACCEPT_EULA=Y apt-get install -y msodbcsql17 mssql-tools18 unixodbc-dev\
    && echo 'export PATH="$PATH:/opt/mssql-tools18/bin"' 

WORKDIR /app
COPY ./rusha_django_project/poetry.lock ./rusha_django_project/pyproject.toml ./
RUN pip install poetry
RUN poetry config virtualenvs.in-project false
RUN poetry export -f requirements.txt --output requirements.txt --without-hashes
RUN pip install -r requirements.txt

 