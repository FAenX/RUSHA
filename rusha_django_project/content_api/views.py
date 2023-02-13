import json
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods

from django_redis import get_redis_connection
from content_api.models import HomePageContent, CreateApplicationPageContent

# Create your views here.




@require_http_methods(["GET"])
def get_home_page_content_cache(request):
    redis_connection = get_redis_connection("default")
    home_page_content_cache = redis_connection.get("home_page_content_cache")

    print(home_page_content_cache)

    # if home_page_content_cache:
    return HttpResponse(home_page_content_cache, status=200)
    # else:
    #     return HttpResponse(status=404)

@require_http_methods(["GET"])
def create_application_page_content_cache(request):
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
            return HttpResponse(status=404)
