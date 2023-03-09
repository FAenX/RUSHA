import json
from django.http import HttpResponse, JsonResponse
from django_redis import get_redis_connection
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from content_api.serializers import ApplicationProjectSerializer
from library.redis_connection import RedisConnection




from django.db import connection




@csrf_exempt
@require_http_methods(["GET"])
def get_home_page_cache(request, **kwargs):

    redis_connection = RedisConnection()
    user_id = kwargs.get("user_id")
    project_cache_data  = redis_connection.get_value(f"{user_id}_home_page_cache_data")
    was_project_updated = redis_connection.get_value(f"{user_id}_home_page_cache_data_updated")


    print(was_project_updated)

    if was_project_updated.lower() == b"true":
        project_updated = True
    else:
        project_updated = False

    print(project_updated)

    
    
    if project_cache_data and not was_project_updated:
        return HttpResponse(project_cache_data, status=200)
    else:
        rows = []
        with connection.cursor() as cursor:
            cursor.execute(f"""
            SELECT row_to_json(t)
            FROM (
            SELECT * FROM projects_project 
            JOIN applications_application ON projects_project.id = applications_application.project_id
            WHERE projects_project.user_id = 'a6397cf3-7315-46bc-a095-f6322bf7d6af'
            ORDER BY applications_application.date_created DESC
            ) t;
            """)


            rows = cursor.fetchall()

        serializer = ApplicationProjectSerializer([i[0] for i in rows], many=True)
        serializer_data = serializer.data

        redis_connection = get_redis_connection("default")
        key = f"{user_id}_home_page_cache_data"

        redis_connection.set(key, json.dumps(serializer_data))
        redis_connection.set(f"{user_id}_home_page_cache_data_updated", str(False))
        return JsonResponse(serializer_data, status=200, safe=False)
   