from django.urls import path

from .views import get_home_page_content_cache

urlpatterns = [
    path('get_home_page_content/', get_home_page_content_cache),

]