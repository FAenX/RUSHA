# Generated by Django 4.1.6 on 2023-02-12 21:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content_api', '0002_createapplicationpagecontent'),
    ]

    operations = [
        migrations.AddField(
            model_name='createapplicationpagecontent',
            name='frameworks',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='createapplicationpagecontent',
            name='repoitories',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='createapplicationpagecontent',
            name='content',
            field=models.TextField(null=True),
        ),
    ]
