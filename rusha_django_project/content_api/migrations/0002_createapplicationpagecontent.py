# Generated by Django 4.1.6 on 2023-02-12 21:06

import datetime
from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('content_api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CreateApplicationPageContent',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date_created', models.DateTimeField(default=datetime.datetime.now)),
                ('date_updated', models.DateTimeField(default=datetime.datetime.now)),
                ('is_active', models.BooleanField(default=True)),
                ('content', models.TextField()),
            ],
        ),
    ]