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

![high level](https://am3pap003files.storage.live.com/y4mxzj3TdowjP59MFF9Rl7nghua5_CEulEIAVWTt0KR641IkIMjCI-BtAtN4v63IfWL71X9nYaa2zBvzso_jliNm3aegcVzj5ygCEU9i2SiZR4grS--yvxTjuwkktqLpIWfkOtHI6RVVeCKrgkw4JQTy4JKfObJsmq1Hg9a1Q65np6urYrzgoHMpNeONBjE9pU3?width=1056&height=1526&cropmode=none)


You can create containers using git post-recieve by pushing to a git bare repo in the server.

When you create a new app via Rushiwa, the Cron job will pick it up and create Nginx virtual server config and a git bare repo where a user can push their application to. 

When a user pushes code to the bare repo,  git post receive will run a docker script to either build and run a container or update an existing container. 

The container will be exposed to the outside via Nginx conf that was created by the cronjob. 
