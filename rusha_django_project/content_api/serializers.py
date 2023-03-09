from django.db import models
from rest_framework import serializers
from projects.serializers import ProjectSerializer
from applications.models import Application


class ApplicationProjectSerializer(serializers.Serializer):
    project_id = serializers.UUIDField()
    project_name = serializers.CharField(max_length=200)
    description = serializers.CharField(max_length=200)
    date_created = serializers.DateTimeField()
    tag = serializers.CharField(max_length=200)
    user_id = serializers.UUIDField()
    application_name = serializers.CharField(max_length=200)
    framework = serializers.CharField(max_length=200)
    local_git_repo = serializers.CharField(max_length=200)
    application_port = serializers.IntegerField()
    domain_name = serializers.CharField(max_length=200)
    application_path = serializers.CharField(max_length=200)
    proxy_host_name_and_or_port = serializers.CharField(max_length=200)
    project_id = serializers.UUIDField()

    