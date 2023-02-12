import json
from django.http import HttpResponse, JsonResponse
from django_redis import get_redis_connection
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .serializers import ApplicationProjectSerializer


from django.db import connection




@csrf_exempt
@require_http_methods(["GET"])
def get_home_page_cache(request, **kwargs):
    redis_connection = get_redis_connection("default")
    user_id = kwargs.get("user_id")
    project_cache_data  = redis_connection.get(user_id)
    
    if project_cache_data:
        return HttpResponse(project_cache_data, status=200)
    else:
        rows = []
        with connection.cursor() as cursor:
            cursor.execute("""
            SELECT row_to_json(t)
            FROM (
            SELECT * FROM projects_project 
            JOIN applications_application ON projects_project.id = applications_application.project_id
            ) t;
            """)


            rows = cursor.fetchall()



        serializer = ApplicationProjectSerializer(list(rows[0]), many=True)
        serializer_data = serializer.data

        redis_connection = get_redis_connection("default")
        key = f"{user_id}_home_page_cache_data"

        redis_connection.set(key, json.dumps(serializer_data))
        return JsonResponse(serializer_data, status=200, safe=False)
   