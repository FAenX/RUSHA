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

![high level](https://am3pap003files.storage.live.com/y4msm2nKHOL4BN7dKsKtAx90BpJid4BJyAEXBa4yFfPR8GQwHX32H0eclcgfSJ_4ya7WE4BQW7EK-ZkLtkgPVd13QsG0e5H-2zdcMcaVcKtKojIYmuORZ1O43bSGUL6TGvtfprj9gcb9q8Az0SjpjJI1pFEtp0WdtCS-iL_hUf-CDQYJHAUYmCq-PTY_iR2eEJ8?width=923&height=1121&cropmode=none)


You can create containers using git post-recieve by pushing to a git bare repo in the server.

When you create a new app via applications, the Cron job will pick it up and create Nginx virtual server config and a git bare repo where a user can push their application to. 

When a user pushes code to the bare repo,  git post receive will run a docker script to either build and run a container or update an existing container. 

The container will be exposed to the outside via Nginx conf that was created by the cronjob. 
