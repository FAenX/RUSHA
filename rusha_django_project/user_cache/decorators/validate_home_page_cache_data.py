from django.http import HttpResponse, JsonResponse
import json

def validate_home_page_cache_data(func):
    def wrapper(*args, **kwargs):
        try:
            print(args)
            data = json.loads(args[0].body)["payload"]
            data['timestamp']
            data["projectId"]
            data["userId"]
            return func(*args, **kwargs)
        except KeyError:
            return HttpResponse("timestap, project_id, project_name required", status=400)

    return wrapper