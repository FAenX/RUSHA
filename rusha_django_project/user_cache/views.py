import json
from django.http import HttpResponse
from django_redis import get_redis_connection
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods



@csrf_exempt
@require_http_methods(["GET"])
def get_home_page_cache(request, **kwargs):
    data = request.body
    print(data)
    print(kwargs)
    print(request)
    redis_connection = get_redis_connection("default")
    key = f"af44fd17-a0d4-4de4-b648-d3d3a593f8bb_home_page_cache_data"

    user_id = kwargs.get("userId")

    project_cache_data  = redis_connection.get(user_id)


    # if project_cache_data:
    #     return HttpResponse(project_cache_data, status=200)
    # else:
    #     project = Project.objects.get(id=user_id)
    #     project = ProjectSerializer(project).data
    #     print(project)

    #     applications = Application.objects.filter(project_id=project["id"])
    #     print(applications)

    #     application_list = ApplicationSerializer(applications, many=True).data

    #     # convert uuid to string
    #     for application in application_list:
    #         application["id"] = str(application["id"])
    #         application["project_id"] = str(application["project_id"])

    #     project["id"] = str(project["id"])
        

    #     cache_data = {
    #         "userId": "af44fd17-a0d4-4de4-b648-d3d3a593f8bb",
    #         "project": {
    #             "id": project["id"],
    #             "project_name": project["project_name"],
    #             "description": project["description"],
    #             "date_created": project["date_created"],
    #             "tag": project["tag"],
    #             "applications": application_list
    #         },
            
    #     }




    print (request)
    redis_connection = get_redis_connection("default")
    key = f"af44fd17-a0d4-4de4-b648-d3d3a593f8bb_home_page_cache_data"
    print(key)
    cache_data  = redis_connection.set(key, json.dumps(cache_data))
    return HttpResponse(cache_data, status=200)
   