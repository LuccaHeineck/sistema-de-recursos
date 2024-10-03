from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import UpdateAPIView
from .models import Bem, TipoBem
from .serializers import BemSerializer, TipoBemSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import DestroyAPIView


class BemCreateView(APIView):
    # Define que o usuário precisa estar autenticado para acessar esta view
    # permission_classes = [IsAuthenticated]

    def post(self, request):
        # Passa o contexto do request para o serializer

        serializer = BemSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            bem = serializer.save()
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

class BemDeleteView(DestroyAPIView):
    queryset = Bem.objects.all()
    serializer_class = BemSerializer
    # permission_classes = [IsAuthenticated]  # Garante que o usuário está autenticado

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"detail": "Bem excluído com sucesso."}, status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        # Se você precisar de lógica personalizada na deleção, modifique aqui
        instance.delete()


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
    
class TipoBemCreateView(APIView):
    def post(self, request):
        serializer = TipoBemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TipoBemUpdateView(APIView):
    def put(self, request, pk):
        try:
            tipo_bem = TipoBem.objects.get(pk=pk)
        except TipoBem.DoesNotExist:
            return Response({'error': 'TipoBem não encontrado'}, status=status.HTTP_404_NOT_FOUND)

        serializer = TipoBemSerializer(tipo_bem, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TipoBemDeleteView(APIView):
    def delete(self, request, pk):
        try:
            tipo_bem = TipoBem.objects.get(pk=pk)
        except TipoBem.DoesNotExist:
            return Response({'error': 'TipoBem não encontrado'}, status=status.HTTP_404_NOT_FOUND)

        tipo_bem.delete()
        return Response({'message': 'TipoBem deletado com sucesso'}, status=status.HTTP_204_NO_CONTENT)    


