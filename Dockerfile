FROM python:3.9

RUN apt-get update
RUN apt-get install postgresql postgresql-contrib -y
RUN apt-get install libpq-dev python3-dev -y

RUN apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release -y

RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

RUN echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

RUN apt-get update
RUN apt-get install docker-ce docker-ce-cli containerd.io -y

COPY ./rusha_django_project/poetry.lock ./rusha_django_project/pyproject.toml ./
RUN pip install poetry
RUN poetry config virtualenvs.in-project false
RUN poetry export -f requirements.txt --output requirements.txt --without-hashes
RUN pip install -r requirements.txt


WORKDIR /app
 