


import json
from django.http import JsonResponse


def validate_application_payload(func):
    def wrapper(*args, **kwargs):
        request = args[0]
        data = json.loads(request.body)
        try:
            framework = data['framework']
            application_name = data['applicationName']
            project_id = data['projectId']
            description = data['description']
            tags = data['tags']
            environment_variables = data['environmentVariables']
            user_id = data['userId']
        except KeyError:
            return JsonResponse({'error': 'Missing required field'}, status=400)
        return func(*args, **kwargs)
    return wrapper