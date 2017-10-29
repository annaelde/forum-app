# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-29 05:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Board',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(max_length=64, unique=True)),
                ('description', models.CharField(max_length=712)),
                ('slug', models.SlugField()),
            ],
        ),
    ]
