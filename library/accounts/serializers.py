from rest_framework import serializers
#from .models import Account
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Aggiungi il ruolo dell'utente al token
        token['is_admin'] = user.is_superuser
        token['user_id'] = user.id
        return token
    

# Serializer per la registrazione
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'is_superuser'] 
        #extra_kwargs = {'password': {'write_only': True}}

    '''def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data.get('role', 'user')  # Ruolo predefinito 'user'
        )
        return user'''