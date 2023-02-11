from django.urls import path

from .views import application_list, deploy_application, get_home_page_cache

urlpatterns = [
    path('applications/', application_list),
    path('deploy/', deploy_application),
    path('home-page-cache/<userId>/', get_home_page_cache),
    # path('content-cache/', get_home_page_content_cache),

]