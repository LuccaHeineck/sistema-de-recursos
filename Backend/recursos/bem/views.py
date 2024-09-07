from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated

from .models import Bem
from .serializers import BemSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView


class BemCreateView(APIView):
    # Define que o usuário precisa estar autenticado para acessar esta view
    # permission_classes = [IsAuthenticated]

    def post(self, request):
        # Obtendo os dados da requisição
        serializer = BemSerializer(data=request.data)

        # Validando os dados
        if serializer.is_valid():
            # Salvando o novo bem
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Retornando os erros de validação
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BemListView(APIView):
    def get(self, request):
        bens = Bem.objects.all()
        serializer = BemSerializer(bens, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
