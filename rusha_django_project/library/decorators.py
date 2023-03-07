

import json
from django.http import JsonResponse


def validate_login_payload (func):
    def wrapper (request):
        payload = json.loads(request.body)
        if 'username' not in payload or 'password' not in payload:
            return JsonResponse({'error': 'username and password are required'}, status=400)
        return func(request)
    return wrapper


