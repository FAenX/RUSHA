

import json
from django.http import JsonResponse


def validate_login_payload (func):
    def wrapper (request):
        payload = json.loads(request.body)
        if 'email' not in payload or 'password' not in payload:
            return JsonResponse({'error': 'email and password are required'}, status=400)
        return func(request)
    return wrapper


