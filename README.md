# rusha_django_project

Install Docker and docker compose then run the following command

`./local/run.sh`

Basically I am trying to build an infrastructure that 'high level' looks like the image below, (apologies for the crudeness)...

Eventually the plan is to replace Docker with k8s.

![high level](https://drive.google.com/uc?export=view&id=14QdXUlACHzTHPxyJYjWFZv5NIK-raBh4)


You can create containers using git post-recieve by pushing to a git bare repo in the server.

When you create a new app via Rushiwa, the Cron job will pick it up and create Nginx virtual server config and a git bare repo where a user can push their application to. 

When a user pushes code to the bare repo,  git post receive will run a docker script to either build and run a container or update an existing container. 

The container will be exposed to the outside via Nginx conf that was created by the cronjob. 
