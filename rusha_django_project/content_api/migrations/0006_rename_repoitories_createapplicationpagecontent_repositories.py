# Generated by Django 4.1.6 on 2023-02-12 21:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('content_api', '0005_createapplicationpagecontent_repositories_other'),
    ]

    operations = [
        migrations.RenameField(
            model_name='createapplicationpagecontent',
            old_name='repoitories',
            new_name='repositories',
        ),
    ]
