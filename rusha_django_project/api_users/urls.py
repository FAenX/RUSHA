from django.urls import path

from .views import create_user, login

urlpatterns = [
    path('create_user/', create_user),
    path('login/', login),
]