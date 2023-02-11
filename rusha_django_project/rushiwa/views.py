import json

from django.db import transaction
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework import generics

from .models import Application, Project
from .serializers import ApplicationSerializer, ProjectSerializer, ApplicationProjectSerializer
from .helpers.generate_application_path import generate_application_path
from .helpers.generate_application_port import generate_application_port
from .helpers.generate_domain_name import generate_domain_name
from .helpers.get_host_name import get_hostname
from celery_tasks.celery_worker import create_application_task, cache_project_page_visits
from .decorators.validate_home_page_cache_data import validate_home_page_cache_data
from django_redis import get_redis_connection
from rest_framework import serializers

# Create your views here.
@csrf_exempt
def application_list(request):
    """
    retrieve:
    """   

    if request.method == 'GET':
        applications = Application.objects.all()
        serializer = ApplicationSerializer(applications, many=True)
        return JsonResponse(serializer.data, safe=False)


@csrf_exempt
@require_http_methods(["POST"])
def deploy_application(request):
    """
    retrieve:
    """   
    try:
       
        data = json.loads(request.body)
        # send this to task queue

        framework = data.get('framework')
        application_name = data.get('applicationName')
        project_id = data.get('projectId')
        application_dict = {
            'framework': framework,
            'application_name': application_name,
            'project_id': project_id
        }

        application_path = generate_application_path(application_name)
        application_port = generate_application_port()
        domain_name = generate_domain_name(application_name)

        application_dict['application_path'] = application_path
        application_dict['application_port'] = application_port
        application_dict['domain_name'] = domain_name
        application_dict['proxy_host_name_and_or_port'] = f'{get_hostname()}:{application_port}'


        app_serializer = ApplicationSerializer(data=application_dict)

        
        

        if app_serializer.is_valid():

            application_data = ApplicationProjectSerializer(app_serializer.validated_data)
            # dump = json.dumps(project.data)
            create_application_task.delay(application_data.data)
           
        else:
            return JsonResponse(app_serializer.errors, status=400)

        return JsonResponse(app_serializer.data, status=201)
    
    except Exception as e:
        print(e)
        return HttpResponse(e, status=500)
        

   

    # if request.method == 'POST':


