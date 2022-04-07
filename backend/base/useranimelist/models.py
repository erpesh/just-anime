from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class AnimeList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, db_constraint=False)
    anime_list = models.JSONField()

    def __str__(self):
        return self.user

