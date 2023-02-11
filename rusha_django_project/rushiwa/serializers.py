from rest_framework import serializers

from .models import Application, Project



class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'


class ApplicationProjectSerializer(serializers.ModelSerializer):
    project_id = ProjectSerializer()

    def get_related_field(self, instance):
        return instance.project.value

    class Meta:
        model = Application
        fields = '__all__'