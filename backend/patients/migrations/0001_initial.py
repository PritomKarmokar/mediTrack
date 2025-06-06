# Generated by Django 5.2.1 on 2025-05-17 17:17

import django_ulid.models
import ulid.api.api
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', django_ulid.models.ULIDField(default=ulid.api.api.Api.new, editable=False, primary_key=True, serialize=False)),
                ('first_name', models.CharField(max_length=25)),
                ('last_name', models.CharField(max_length=25)),
                ('blood_group', models.CharField(max_length=20)),
            ],
            options={
                'verbose_name': 'Patient',
                'db_table': 'patient',
            },
        ),
    ]
