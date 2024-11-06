# reservas/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import UpdateAPIView, DestroyAPIView
from rest_framework.pagination import PageNumberPagination

from .models import Reserva
from .serializer import ReservaSerializer


class ReservaCreateView(APIView):
    """
    API view to create a new reservation (Reserva).
    """
    def post(self, request):
        serializer = ReservaSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            reserva = serializer.save()
            return Response(ReservaSerializer(reserva).data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReservaUpdateView(UpdateAPIView):
    """
    API view to update an existing reservation (Reserva).
    """
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer

    def perform_update(self, serializer):
        serializer.save()


class ReservaDeleteView(DestroyAPIView):
    """
    API view to delete an existing reservation (Reserva).
    """
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"detail": "Reserva excluída com sucesso."}, status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()


class ReservaListView(APIView):
    """
    API view to list reservations (Reserva) with optional filters and pagination.
    """
    def get(self, request):
        id_pessoa = request.GET.get('id_pessoa', None)
        data_reserva = request.GET.get('data_reserva', None)
        data_validade_reserva = request.GET.get('data_validade_reserva', None)

        reservas = Reserva.objects.all()

        # Apply filters if provided
        if id_pessoa:
            reservas = reservas.filter(id_pessoa=id_pessoa)
        if data_reserva:
            reservas = reservas.filter(data_reserva=data_reserva)
        if data_validade_reserva:
            reservas = reservas.filter(data_validade_reserva=data_validade_reserva)

        paginator = PageNumberPagination()
        paginator.page_size = 5  # Set items per page
        paginated_reservas = paginator.paginate_queryset(reservas, request)

        serializer = ReservaSerializer(paginated_reservas, many=True)
        return paginator.get_paginated_response(serializer.data)
