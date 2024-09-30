from django.shortcuts import render
from django.contrib.auth import authenticate
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


class LoginView(APIView):
    def post(self, request):
        # Obtendo os dados do corpo da requisição da tabela auth_user
        data = request.data
        username = data.get('username')
        password = data.get('password')

        # Validando se os dados foram fornecidos
        if not username or not password:
            return Response({'error': 'Preencha todos os campos'}, status=status.HTTP_400_BAD_REQUEST)

        # Autenticando o usuário
        user = authenticate(username=username, password=password)

        if user is not None:
            # Se as credenciais estão corretas, retorna uma mensagem de sucesso
            return Response({'message': f'Bem-vindo, {user.username}!'}, status=status.HTTP_200_OK)
        else:
            # Se as credenciais estão incorretas
            return Response({'error': 'Credenciais inválidas'}, status=status.HTTP_401_UNAUTHORIZED)


class UsuarioLogadoView(APIView):
    def get(self, request):
        print(f"Usuário autenticado: {request.user}")  # Verifique se o usuário está autenticado
        if request.user.is_authenticated:
            return Response({'username': request.user.username}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Usuário não autenticado'}, status=status.HTTP_401_UNAUTHORIZED)