

from rushiwa.serializers import ApplicationSerializer
from rushiwa.models import Application


def save_application_to_db(*args, **application):
    print(application)
    application = Application.objects.create(**application)
    application = ApplicationSerializer(application).data
    return application