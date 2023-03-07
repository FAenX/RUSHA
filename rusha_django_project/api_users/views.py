from django.http import HttpResponse
from django.shortcuts import render

from django.views.decorators.http import require_http_methods

from library.decorators import validate_login_payload
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


def create_user(request):
    pass


@csrf_exempt
@validate_login_payload
@require_http_methods(["POST"])
def login(request):
    return HttpResponse(status=200)