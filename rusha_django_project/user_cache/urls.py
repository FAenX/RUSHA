from django.urls import path

from .views import  get_home_page_cache

urlpatterns = [
    path('home-page-cache/', get_home_page_cache),

]