from django.urls import path

from .views import create_user, login, decode_token

urlpatterns = [
    path('create_user/', create_user),
    path('login/', login),
    path('decode_token/', decode_token)
]