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
from celery_tasks.celery_worker import create_git_repo_task, cache_project_page_visits
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
@transaction.atomic
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

            project = ApplicationProjectSerializer(app_serializer.validated_data)
            dump = json.dumps(project.data)
            create_git_repo_task.delay(dump)
           
        else:
            return JsonResponse(app_serializer.errors, status=400)

        return JsonResponse(app_serializer.data, status=201)
    
    except Exception as e:
        print(e)
        raise e
        return HttpResponse(e, status=500)
        

   

    # if request.method == 'POST':


@csrf_exempt
@require_http_methods(["POST"])
@validate_home_page_cache_data
def user(request):
    data = json.loads(request.body)
    print(data["payload"])
    cache_project_page_visits.delay(**data["payload"])
   
    return HttpResponse(status=200)



@require_http_methods(["GET"])
def get_home_page_content_cache(request):
    redis_connection = get_redis_connection("default")
    home_page_content_cache = redis_connection.get("home_page_content_cache")

    print(home_page_content_cache)

    if home_page_content_cache:
        return HttpResponse(home_page_content_cache, status=200)
    else:
        return HttpResponse(status=404)



@require_http_methods(["GET"])
def get_home_page_cache(request, **kwargs):
    data = request.body
    redis_connection = get_redis_connection("default")
    key = f"af44fd17-a0d4-4de4-b648-d3d3a593f8bb_home_page_cache_data"

    project_cache_data  = redis_connection.get(key)


    if project_cache_data:
        return HttpResponse(project_cache_data, status=200)
    else:
        project = Project.objects.get(id="af44fd17-a0d4-4de4-b648-d3d3a593f8bb")
        project = ProjectSerializer(project).data
        print(project)

        applications = Application.objects.filter(project_id=project["id"])
        print(applications)

        application_list = ApplicationSerializer(applications, many=True).data

        # convert uuid to string
        for application in application_list:
            application["id"] = str(application["id"])
            application["project_id"] = str(application["project_id"])

        project["id"] = str(project["id"])
        

        cache_data = {
            "userId": "af44fd17-a0d4-4de4-b648-d3d3a593f8bb",
            "project": {
                "id": project["id"],
                "project_name": project["project_name"],
                "description": project["description"],
                "date_created": project["date_created"],
                "tag": project["tag"],
                "applications": application_list
            },
            
        }




        print (request)
        redis_connection = get_redis_connection("default")
        key = f"af44fd17-a0d4-4de4-b648-d3d3a593f8bb_home_page_cache_data"
        print(key)
        cache_data  = redis_connection.set(key, json.dumps(cache_data))
        return HttpResponse(cache_data, status=200)
   