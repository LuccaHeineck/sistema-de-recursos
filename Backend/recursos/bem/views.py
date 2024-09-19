from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import UpdateAPIView
from .models import Bem, TipoBem
from .serializers import BemSerializer, TipoBemSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class BemCreateView(APIView):
    # Define que o usuário precisa estar autenticado para acessar esta view
    # permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = BemSerializer(data=request.data)

        if serializer.is_valid():
            # Atribuindo o usuário logado
            bem = serializer.save(created_by=request.user)
            return Response(BemSerializer(bem).data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BemUpdateView(UpdateAPIView):
    queryset = Bem.objects.all()
    serializer_class = BemSerializer
    # permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def perform_update(self, serializer):
        # Optionally override this method if you need custom behavior on update
        serializer.save(updated_by=self.request.user)


class BemListView(APIView):
    def get(self, request):
        bens = Bem.objects.all()
        serializer = BemSerializer(bens, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TipoBemListView(APIView):
    def get(self, request):
        tipos_bem = TipoBem.objects.all()
        serializer = TipoBemSerializer(tipos_bem, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
