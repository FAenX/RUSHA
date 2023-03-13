import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

from django.views.decorators.http import require_http_methods

from library.decorators import validate_login_payload
from django.views.decorators.csrf import csrf_exempt

from projects.models import Project

from .models import User
from .serializers import UserSerializer
from library.decorators import authenticate
import jwt

from library.decorators import SECRET_KEY




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

    user = User.objects.get(email=email)

    serialized_user = UserSerializer(user)

    active_project = Project.objects.filter(user=user).order_by('date_updated').first()
    print(active_project)

    print(serialized_user)

    token = jwt.encode({
        'id': user.id.hex,
        'email': user.email,
        'active_project_id': active_project.id.hex

        }, SECRET_KEY, algorithm='HS256')

    response_payload = {
        "auth_token": token,
        "user": serialized_user.data
    }

    return JsonResponse(response_payload, status=200)



@csrf_exempt
@authenticate
@require_http_methods(["GET"])
def decode_token(request, decoded_token, *args, **kwargs):
    return JsonResponse(decoded_token, status=200)
