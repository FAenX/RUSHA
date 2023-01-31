# rusha_django_project

# Technologies used

1. Django
2. Docker
3. Nginx
4. Mssql
5. Redis 
6. Celery
7. Git
8. Bash
9. Ansible
10. Docker compose
11. OpenSSH

Install Docker and docker compose then run the following command

`./local/run.sh`

Basically I am trying to build an infrastructure that 'high level' looks like the image below, (apologies for the crudeness)...

Eventually the plan is to replace Docker with k8s.

![high level](https://am3pap003files.storage.live.com/y4mCkm51R-d3p9Yo6Ix3T54r8C44ISmNtQ9bwkVxIapoda6lmpXa2iEhQ6eI6i8W7cjwy0mk5i_8dcF3v5-y0SoO1wXUS2rmlc_1fWncSLxxbiv3e3Twjhfpv_mYUKcpFL6nCzrfo6Cy-tD8jogQjHCQSyRfmduIgLaOReRXgBqXwl0N8SkBHSqySz2j1xHFQEI?width=863&height=1681&cropmode=none)


You can create containers using git post-recieve by pushing to a git bare repo in the server.

When you create a new app via Rushiwa, the Cron job will pick it up and create Nginx virtual server config and a git bare repo where a user can push their application to. 

When a user pushes code to the bare repo,  git post receive will run a docker script to either build and run a container or update an existing container. 

The container will be exposed to the outside via Nginx conf that was created by the cronjob. 
