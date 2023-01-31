from django.urls import path

from .views import application_list, deploy_application, user, get_home_page_cache, get_home_page_content_cache

urlpatterns = [
    path('applications/', application_list),
    path('deploy/', deploy_application),
    path('user/', user),
    path('get-home-page-cache/<userId>/', get_home_page_cache),
    path('get-home-page--content-cache/', get_home_page_content_cache),

]