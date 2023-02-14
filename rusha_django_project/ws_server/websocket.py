# mysite/asgi.py
import os

import django

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path
from .consumer import MyConsumer


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rusha_django.settings')
django.setup()







application = ProtocolTypeRouter({
    "websocket": AuthMiddlewareStack(
        URLRouter([
            path("ws/", MyConsumer.as_asgi()),
        ])
    ),
})