from django.urls import path

from .views import  get_home_page_cache

urlpatterns = [
    path('home_page_cache/<user_id>/', get_home_page_cache),

]