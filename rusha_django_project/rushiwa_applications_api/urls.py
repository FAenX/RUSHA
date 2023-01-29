from django.urls import path

from .views import application_list, deploy_application, user, get_home_page_cache

urlpatterns = [
    path('applications/', application_list),
    path('deploy/', deploy_application),
    path('user/', user),
    path('get_home_page_cache/<int:userId>', get_home_page_cache)
]