from django.urls import path

from .views import get_home_page_content_cache, create_application_page_cache

urlpatterns = [
    path('home_page_cache/', get_home_page_content_cache),
    path('create_application_page_cache/', create_application_page_cache)

]