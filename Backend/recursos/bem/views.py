from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import UpdateAPIView
from .models import Bem, TipoBem  # Kit
from .serializers import BemSerializer, TipoBemSerializer, KitSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import DestroyAPIView
from rest_framework.pagination import PageNumberPagination

from django.db.models import Q


class BemCreateView(APIView):
    # Define que o usuário precisa estar autenticado para acessar esta view
    # permission_classes = [IsAuthenticated]

    def post(self, request):
        # Passa o contexto do request para o serializer

        serializer = BemSerializer(
            data=request.data, context={'request': request})

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
        # Pegando os parâmetros de filtro da URL
        id_bem = request.GET.get('id_bem', None)
        descricao = request.GET.get('descricao', None)
        permite_reserva = request.GET.get('permite_reserva', None)
        status_bem = request.GET.get('status_bem', None)
        id_tipo_bem = request.GET.get('id_tipo_bem', None)
        quantidade_bem = request.GET.get('quantidade_bem', None)

        # Inicia a query sem filtros
        bens = Bem.objects.filter()

        # Adiciona filtros se houver parâmetros fornecidos
        if id_bem:
            bens = bens.filter(id_bem=id_bem)

        if descricao:
            bens = bens.filter(descricao__icontains=descricao)

        if permite_reserva is not None:
            # Converte para booleano
            permite_reserva = permite_reserva.lower() == 'true'
            bens = bens.filter(permite_reserva=permite_reserva)

        if status_bem:
            bens = bens.filter(status_bem=status_bem)

        if id_tipo_bem:
            bens = bens.filter(id_tipo_bem=id_tipo_bem)

        # Configura o paginador
        paginator = PageNumberPagination()
        paginator.page_size = 5  # Número de ítens por página
        result_page = paginator.paginate_queryset(bens, request)

        # Serializando os resultados filtrados
        serializer = BemSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)


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


class KitListView(APIView):

    def get(self, request):
        id_kit = request.GET.get('id_kit', None)
        descriacao = request.GET.get('descricao', None)
        id_bem = request.GET.get('id_bem', None)

        kits = Kit.objects.all()
        serializer = KitSerializer(kits, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
