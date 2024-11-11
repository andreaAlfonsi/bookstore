# Generated by Django 4.2.16 on 2024-11-01 11:49

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titolo', models.CharField(max_length=255)),
                ('autore', models.CharField(max_length=255)),
                ('anno_pubblicazione', models.IntegerField(blank=True, null=True)),
                ('prezzo', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
    ]