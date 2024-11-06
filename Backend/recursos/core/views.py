# accounts/views.py
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from django.contrib.auth.models import User

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LoginView(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class UserView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class UserListView(APIView):
    def get(self, request, pk=None):
        #Cria um limite de retorno de dados
        limit = request.GET.get('limit', None)

        if pk is not None:
            # Recupera um usuário específico pelo ID (pk)
            try:
                user = User.objects.get(pk=pk)
                serializer = UserSerializer(user)
                return Response(serializer.data)
            except User.DoesNotExist:
                return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        # Caso não tenha pk, lista todos os usuários ou filtra
        users = User.objects.all()

        # Verifica se há parâmetros de busca na query string
        user_id = request.query_params.get('id', None)
        username = request.query_params.get('username', None)

        # Filtra por ID se fornecido
        if user_id is not None:
            users = users.filter(pk=id)

        # Filtra por username se fornecido
        if username is not None:
            users = users.filter(username__icontains=username)

        if limit:
            users = users[:int(limit)]

        # Serializando os resultados
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class LogoutView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        # Blacklist token or just return a message
        return Response({"message": "Logged out"}, status=status.HTTP_205_RESET_CONTENT)
