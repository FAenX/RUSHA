import json

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from celery_tasks.celery_worker import create_application_task
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
        create_application_task.delay(payload=data)
        return HttpResponse(1, status=201)
    except Exception as e:
        print(e)
        return JsonResponse(json.dumps({"errored": "true"}), status=500)
        

   

    # if request.method == 'POST':


