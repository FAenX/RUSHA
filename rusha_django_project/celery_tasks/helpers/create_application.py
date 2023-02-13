import json
import subprocess
import os
from applications.serializers import ApplicationSerializer

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





class CreateApplication:
    def create_application(self, application):
        print(application)
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
            return app_serializer.data
        else:
            # queue notification to user 
            # queue notification to admin
            raise Exception(app_serializer.errors)