from django.http import HttpResponse
from django.views.decorators.http import require_http_methods

from django_redis import get_redis_connection

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