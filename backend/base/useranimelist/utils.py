from rest_framework.response import Response

from .models import AnimeList
from .serializers import AnimeListSerializer


def getMethod(request):
    user = request.user
    anime_list = user.animelist_set.all()
    serializer = AnimeListSerializer(anime_list, many=True)
    return Response(serializer.data)

def updateMethod(request):
    anime_list = AnimeList.objects.get(user_id=request.user.id)
    serializer = AnimeListSerializer(anime_list, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

def createMethod(request):
    data = request.data
    anime_list = AnimeList.objects.create(anime_list=data, user_id=request.user.id)
    serializer = AnimeListSerializer(anime_list, many=False)
    return Response(serializer.data)