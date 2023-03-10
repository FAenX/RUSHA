# Generated by Django 4.1.6 on 2023-02-11 13:27

import datetime
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('application_name', models.CharField(max_length=200, unique=True)),
                ('framework', models.CharField(max_length=200)),
                ('local_git_repo', models.CharField(max_length=200, null=True)),
                ('description', models.CharField(max_length=200, null=True)),
                ('tag', models.CharField(default='latest', max_length=200)),
                ('date_created', models.DateTimeField(default=datetime.datetime.now)),
                ('application_port', models.IntegerField(unique=True)),
                ('domain_name', models.CharField(max_length=200, unique=True)),
                ('application_path', models.CharField(max_length=200, unique=True)),
                ('proxy_host_name_and_or_port', models.CharField(default='http://localhost:8080', max_length=200)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='projects.project')),
            ],
        ),
    ]
