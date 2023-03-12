

import json
from django.http import JsonResponse


def validate_login_payload (func):
    def wrapper (request):
        payload = json.loads(request.body)
        if 'email' not in payload or 'password' not in payload:
            return JsonResponse({'error': 'email and password are required'}, status=400)
        return func(request)
    return wrapper


def validate_jwt_token (func):
    def wrapper (request):
        payload = json.loads(request.body)
        if 'token' not in payload:
            return JsonResponse({'error': 'token is required'}, status=400)

        # get user from token

        
        return func(request)
    return wrapper