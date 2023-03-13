import json
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt

from django_redis import get_redis_connection
from content_api.models import HomePageContent, CreateApplicationPageContent
import json
from django.http import HttpResponse, JsonResponse
from django_redis import get_redis_connection
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .serializers import ApplicationProjectSerializer
from library.redis_connection import RedisConnection
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes

from django.db import connection
# Create your views here.
from library.decorators import authenticate



@csrf_exempt
@authenticate
@require_http_methods(["GET"])
def get_home_page_content_cache(request, decoded_token, split_token, *args, **kwargs):
    redis_connection = RedisConnection()
   

    print("*"*100)
    print(args)
    
    project_cache_data  = redis_connection.get_value(f"{decoded_token['id']}_home_page_cache_data")
    was_project_updated = redis_connection.get_value(f"{decoded_token['id']}_home_page_cache_data_updated")
    if was_project_updated.lower() == b"true":
        project_updated = True
    else:
        project_updated = False

    print(project_updated)
    if project_cache_data and not project_updated:
        print(project_cache_data)
        return HttpResponse(project_cache_data, status=200)
    else:
        rows = []
        with connection.cursor() as cursor:
            cursor.execute(f"""
            SELECT row_to_json(t)
            FROM (
            SELECT * FROM projects_project 
            JOIN applications_application ON projects_project.id = applications_application.project_id
            WHERE projects_project.user_id = '{decoded_token["id"]}'
            ORDER BY applications_application.date_created DESC
            ) t;
            """)


            rows = cursor.fetchall()

        print(rows)

        serializer = ApplicationProjectSerializer([i[0] for i in rows], many=True)
        serializer_data = serializer.data

        redis_connection = get_redis_connection("default")
        key = f"{decoded_token['id']}_home_page_cache_data"

        redis_connection.set(key, json.dumps(serializer_data))
        redis_connection.set(f"{decoded_token['id']}_home_page_cache_data_updated", str(False))
        return JsonResponse(serializer_data, status=200, safe=False)
   

@require_http_methods(["GET"])
def create_application_page_cache(request):
    redis_connection = get_redis_connection("default")
    content = redis_connection.get("create_applications_page_content_cache")
    

    if content:
        return HttpResponse(content, status=200)

    else:
        create_applications_page_content_cache = CreateApplicationPageContent.objects.filter(is_active=True).first()
        if create_applications_page_content_cache:
            content = json.dumps({
                "repositories": create_applications_page_content_cache.repositories,
                "frameworks": create_applications_page_content_cache.frameworks

            })
            redis_connection.set("create_applications_page_content_cache", content)
            return HttpResponse(content, status=200)

        else:
            return HttpResponse(status=404, data='No content found')
