from django.urls import path

from .views import  deploy_application

urlpatterns = [
    path('deploy/', deploy_application),
   

]