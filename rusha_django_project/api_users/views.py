import json
from django.http import HttpResponse, JsonResponse
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
    payload = json.loads(request.body)
    email = payload['email']
    password = payload['password']

    print(email, password)
    # TODO: check if user exists

    response_payload = {
        "auth_token": "1234567890",
        "user": {
            "id": 1,
            "email": email,
            "first_name": "John",
            "last_name": "Doe",
            "phone": "1234567890",
            "address": "123 Main St",
            "city": "New York",
            "state": "NY",
            "zip_code": "12345",
            "country": "USA",
            "is_active": True,
            "is_staff": False,
            "is_superuser": False,
            "date_joined": "2020-01-01T00:00:00Z",
            "last_login": "2020-01-01T00:00:00Z",
        }
    }



    return JsonResponse(response_payload, status=200)