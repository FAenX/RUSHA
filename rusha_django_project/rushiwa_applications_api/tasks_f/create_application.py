

from rushiwa_applications_api.serializers import ApplicationSerializer
from rushiwa_applications_api.models import Application


def save_application_to_db(*args, **application):
    application = Application.objects.create(**application)
    application = ApplicationSerializer(application).data
    return application