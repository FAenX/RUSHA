import json

from django.db import transaction
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework import generics

from .models import Application, Project
from .serializers import ApplicationSerializer
from celery_tasks.celery_worker import create_application_task, cache_project_page_visits
from django_redis import get_redis_connection
from rest_framework import serializers
from .decorators.validate_application_payload import validate_application_payload



@csrf_exempt
@require_http_methods(["POST"])
@validate_application_payload
def deploy_application(request):
    """
    retrieve:
    """   
    try:
       
        data = json.loads(request.body)
        framework = data['framework']
        application_name = data['applicationName']
        project_id = data['projectId']
        description = data['description']
        tags = data['tags']
        environment_variables = data['environmentVariables']
        user_id = data['userId']

        application_dict = {
            'framework': framework,
            'application_name': application_name,
            'project_id': project_id,
            'description': description,
            'tags': tags,
            'environment_variables': environment_variables,
            'user_id': user_id
        }

       

        create_application_task.delay(application=application_dict)
           
       
        return HttpResponse(1, status=201)
    
    except Exception as e:
        print(e)
        return JsonResponse(json.dumps({"errored": "true"}), status=500)
        

   

    # if request.method == 'POST':


