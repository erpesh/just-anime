from rest_framework.serializers import ModelSerializer

from .models import AnimeList


class AnimeListSerializer(ModelSerializer):
    class Meta:
        model = AnimeList
        fields = '__all__'