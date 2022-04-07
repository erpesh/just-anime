from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import AnimeList
from .serializers import AnimeListSerializer
from .utils import getMethod, updateMethod, createMethod


@api_view(['GET', 'PUT', 'POST'])
@permission_classes([IsAuthenticated])
def getAnimeList(request):
    if request.method == 'GET':
        return getMethod(request)

    if request.method == 'PUT':
        return updateMethod(request)

    if request.method == 'POST':
        return createMethod(request)