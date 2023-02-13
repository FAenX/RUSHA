import json
import subprocess
import os
from applications.serializers import ApplicationSerializer
from django_redis import get_redis_connection
from projects.models import Project
from user_cache.serializers import ApplicationProjectSerializer

import yaml
import logging


from .git_templates.templates import react_post_receive_template
from .application import Application
from .enums.application_types import static_files, api

from applications.models import Application as ApplicationModel
from .generate_application_path import generate_application_path
from .generate_application_port import generate_application_port
from .generate_domain_name import generate_domain_name
from .get_host_name import get_hostname
from django.db import connection





class CreateApplication:
    def create_application(self, application):
        application_name = application['application_name']
        project_id = application['project_id']
        application_path = generate_application_path(application_name)
        application_port = generate_application_port()
        domain_name = generate_domain_name(application_name)

        application['application_path'] = application_path
        application['application_port'] = application_port
        application['domain_name'] = domain_name
        application['proxy_host_name_and_or_port'] = f'{get_hostname()}:{application_port}'
        application['project'] = project_id

        app_serializer = ApplicationSerializer(data=application)

        if app_serializer.is_valid():
            app_serializer.save()

            rows = []
            with connection.cursor() as cursor:
                cursor.execute("""
                SELECT row_to_json(t)
                FROM (
                SELECT * FROM projects_project 
                JOIN applications_application ON projects_project.id = applications_application.project_id
                WHERE projects_project.user_id = 'a6397cf3-7315-46bc-a095-f6322bf7d6af'
                ORDER BY applications_application.date_created DESC
                ) t;
                """, [project_id])


                rows = cursor.fetchall()



            serializer = ApplicationProjectSerializer([i[0] for i in rows], many=True)
            serializer_data = serializer.data

            redis_connection = get_redis_connection("default")
            user_id = application['user_id']
            key = f"{user_id}_home_page_cache_data"

            redis_connection.set(key, json.dumps(serializer_data))
            return app_serializer.data

        else:
            # queue notification to user 
            # queue notification to admin
            raise Exception(app_serializer.errors)