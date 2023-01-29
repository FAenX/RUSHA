import json

from django.db import transaction
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework import generics

from .models import Application
from .serializers import ApplicationSerializer
from .helpers.generate_application_path import generate_application_path
from .helpers.generate_application_port import generate_application_port
from .helpers.generate_domain_name import generate_domain_name
from .helpers.get_host_name import get_hostname
from celery_tasks.celery_worker import create_git_repo_task

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
        application_dict = {
            'framework': framework,
            'application_name': application_name
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
            a =  create_git_repo_task.delay(**app_serializer.validated_data)
            pass
           
        else:
            return JsonResponse(app_serializer.errors, status=400)

        return JsonResponse(app_serializer.data, status=201)
    
    except Exception as e:
        print(e)
        raise e
        return HttpResponse(e, status=500)
        

   

    # if request.method == 'POST':
   