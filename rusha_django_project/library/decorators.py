

import json
from django.http import JsonResponse
import jwt

SECRET_KEY = 'dsldmksdkfdnfjdnfkjdnfkjsnjkfnkjdnfjksdnfjkndkfndksnfkjsd'


def validate_login_payload (func):
    def wrapper (request):
        payload = json.loads(request.body)
        if 'email' not in payload or 'password' not in payload:
            return JsonResponse({'error': 'email and password are required'}, status=400)
        return func(request)
    return wrapper


# def validate_jwt_token (func):
#     def wrapper (request):
#         payload = json.loads(request.body)
#         if 'token' not in payload:
#             return JsonResponse({'error': 'token is required'}, status=400)

#         # get user from token

        
#         return func(request)
#     return wrapper


def authenticate(func):
    def wrapper(request, *args, **kwargs):
        token = request.headers.get('Authorization')
        split_token = token.split(' ')[-1]
        print(f"Token in authentication {split_token}")
        if split_token == 'null':
            return JsonResponse({'error': 'token is required'}, status=400)
        
        print(split_token)
        decoded_token = jwt.decode(split_token, SECRET_KEY, algorithms=['HS256'])
        print(decoded_token)
        
        res = func(request, decoded_token, split_token, *args, **kwargs)
        return res
    return wrapper



   