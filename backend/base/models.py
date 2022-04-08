from django.contrib.auth.models import User
from django.db import models

# Create your models here.
from django.db.models.signals import post_save
from django.dispatch import receiver

from .useranimelist.models import AnimeList


@receiver(post_save, sender=User)
def init_new_user(instance, created, raw, **kwargs):
    # raw is set when model is created from loaddata.
    if created and not raw:
        AnimeList.objects.create(
            anime_list={
                "Watching": [],
                "Completed": [],
                "Plan to watch": []
            }, user=instance)
