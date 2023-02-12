from django.contrib import admin

# Register your models here.
from .models import HomePageContent, CreateApplicationPageContent

admin.site.register(HomePageContent)
admin.site.register(CreateApplicationPageContent)
