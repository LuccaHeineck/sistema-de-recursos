from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

class Hello_world(APIView):
    def get(self, request):
        return Response({'message': 'PIONMTO, world!'})
    
    def post(self, request):
        # Supondo que os dados esperados sejam enviados no corpo da requisição (request.data)
        data = request.data
        
        if 'name' in data:
            message = f'Hello, {data["name"]}!'
            return Response({'message': message}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No name provided'}, status=status.HTTP_400_BAD_REQUEST)

