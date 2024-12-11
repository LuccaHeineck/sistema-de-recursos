from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import UpdateAPIView, DestroyAPIView
from rest_framework.pagination import PageNumberPagination

from .serializer import ItensRetiradaSerializer, RetiradasSerializer
from .models import ItensRetirada, Retiradas


class RetiradaCreateView(APIView):
    # permission_classes = [IsAuthenticated]  # Habilite se precisar de autenticação

    def post(self, request):
        serializer = RetiradasSerializer(
            data=request.data, context={'request': request})

        if serializer.is_valid():
            retirada = serializer.save()
            return Response(RetiradasSerializer(retirada).data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RetiradaUpdateView(UpdateAPIView):
    queryset = Retiradas.objects.all()
    serializer_class = RetiradasSerializer
    # permission_classes = [IsAuthenticated]  # Habilite se precisar de autenticação

    def perform_update(self, serializer):
        # Adicione lógica personalizada de atualização, se necessário
        serializer.save()


class RetiradaDeleteView(DestroyAPIView):
    queryset = Retiradas.objects.all()
    serializer_class = RetiradasSerializer
    # permission_classes = [IsAuthenticated]  # Habilite se precisar de autenticação

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"detail": "Retirada excluída com sucesso."}, status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        # Adicione lógica personalizada de deleção, se necessário
        instance.delete()


class RetiradaListView(APIView):
    def get(self, request):
        id_retirada = request.GET.get('id_retirada', None)
        id_pessoa = request.GET.get('id_pessoa', None)
        data_retirada = request.GET.get('data_retirada', None)
        motivo_retirada = request.GET.get('motivo_retirada', None)
        status_retirada = request.GET.get('status_retirada', None)

        # Inicia a query sem filtros
        retiradas = Retiradas.objects.all()

        if id_pessoa:
            retiradas = retiradas.filter(id_pessoa=id_pessoa)

        if data_retirada:
            retiradas = retiradas.filter(data_retirada=data_retirada)

        paginator = PageNumberPagination()
        paginator.page_size = 2  # Número de ítens por página
        result_page = paginator.paginate_queryset(retiradas, request)

        # Serializando os resultados filtrados
        serializer = RetiradasSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)


class ItensRetiradaCreateView(APIView):
    # permission_classes = [IsAuthenticated]  # Habilite se precisar de autenticação

    def post(self, request):
        serializer = ItensRetiradaSerializer(
            data=request.data, context={'request': request})

        if serializer.is_valid():
            item_retirada = serializer.save()
            return Response(ItensRetiradaSerializer(item_retirada).data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ItensRetiradaUpdateView(UpdateAPIView):
    queryset = ItensRetirada.objects.all()
    serializer_class = ItensRetiradaSerializer

    def get_object(self):
        id_retirada = self.kwargs.get("id_retirada")
        id_bem = self.kwargs.get("id_bem")
        print("id_retirada:", id_retirada, "id_bem:", id_bem)  # Debugging
        return ItensRetirada.objects.get(id_retirada=id_retirada, id_bem=id_bem)

    def perform_update(self, serializer):
        print("Request Data:", self.request.data)  # Debugging
        serializer.save()


class ItensRetiradaDeleteView(DestroyAPIView):
    queryset = ItensRetirada.objects.all()
    serializer_class = ItensRetiradaSerializer
    # permission_classes = [IsAuthenticated]  # Habilite se precisar de autenticação

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"detail": "Item retirado excluído com sucesso."}, status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()


class ItensRetiradaListView(APIView):
    def get(self, request):
        id_retirada = request.GET.get('id_retirada', None)
        id_bem = request.GET.get('id_bem', None)
        quantidade_bem = request.GET.get('quantidade_bem', None)
        data_retirada = request.GET.get('data_retirada', None)
        data_devolucao = request.GET.get('data_devolucao', None)
        data_limite = request.GET.get('data_limite', None)
        status_retirada = request.GET.get('status_retirada', None)
        observacao = request.GET.get('observacao', None)

        # Inicia a query sem filtros
        itens_retirada = ItensRetirada.objects.all()

        if id_retirada:
            itens_retirada = itens_retirada.filter(id_retirada=id_retirada)

        if id_bem:
            itens_retirada = itens_retirada.filter(id_bem=id_bem)

        if quantidade_bem:
            itens_retirada = itens_retirada.filter(
                quantidade_bem=quantidade_bem)

        # Serializando os resultados filtrados
        serializer = ItensRetiradaSerializer(itens_retirada, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ItensRetiradaByPessoaListView(APIView):
    def get(self, request, id_pessoa):
        # Verifica se o id_pessoa foi fornecido
        if not id_pessoa:
            return Response({"detail": "id_pessoa parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Filtra os itens de retirada pela pessoa
        itens_retirada = ItensRetirada.objects.filter(
            id_retirada__id_pessoa=id_pessoa
        ).exclude(
            status_retirada="Devolvido"
        ).exclude(
            data_devolucao__isnull=False
        )

        # Serializa os itens encontrados
        serializer = ItensRetiradaSerializer(itens_retirada, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
