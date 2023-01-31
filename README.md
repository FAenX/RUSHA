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

![high level](https://am3pap003files.storage.live.com/y4mGA5f-6sKiRt1Nja1YgF3wm1B7_n479R8v2s_nN5XSM-gwTvh8w0314CQSq7Jue3iVoyxAuBzOyZ9l_qMOf7pN6TrSnOMxdMtva91CdaowY3PtmtU8GWQQo7jOXTnXu_AQiviciLmJjKfW7yXdDD1QVXAYFVMWkvIxezsm9DuhYZzaLAL5-K_QHXCQKGtZNAY?width=953&height=1526&cropmode=none)


You can create containers using git post-recieve by pushing to a git bare repo in the server.

When you create a new app via Rushiwa, the Cron job will pick it up and create Nginx virtual server config and a git bare repo where a user can push their application to. 

When a user pushes code to the bare repo,  git post receive will run a docker script to either build and run a container or update an existing container. 

The container will be exposed to the outside via Nginx conf that was created by the cronjob. 
