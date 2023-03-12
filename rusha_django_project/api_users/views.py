import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

from django.views.decorators.http import require_http_methods

from library.decorators import validate_login_payload
from django.views.decorators.csrf import csrf_exempt

from .models import User
from .serializers import UserSerializer
import jwt


SECRET_KEY = 'dsldmksdkfdnfjdnfkjdnfkjsnjkfnkjdnfjksdnfjkndkfndksnfkjsd'


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

    print(serialized_user)

    token = jwt.encode({'id': user.id.hex}, SECRET_KEY, algorithm='HS256')

    response_payload = {
        "auth_token": token,
        "user": serialized_user.data
    }

    return JsonResponse(response_payload, status=200)



@csrf_exempt
@require_http_methods(["GET"])
def decode_token(request):
    token = request.headers.get('Authorization')
    split_token = token.split(' ')[-1]
    print(split_token)
    decoded_token = jwt.decode(split_token, SECRET_KEY, algorithms=['HS256'])
    print(decoded_token)
    return JsonResponse(decoded_token, status=200)
