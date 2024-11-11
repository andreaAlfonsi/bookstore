from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import Favorite, Book
from books.serializers import BookSerializer
from favorites.serializers import FavoriteSerializer

class AddFavoriteView(APIView):
    def post(self, request, book_id):
        user_id = request.data.get('userId')
        user = User.objects.get(id=user_id)
        book = Book.objects.get(id=book_id)
        
        # Aggiungi il libro ai preferiti
        favorite, created = Favorite.objects.get_or_create(user=user, book=book)
        if not created:
            return Response({"message": "Book already in favorites."}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = FavoriteSerializer(favorite)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
# Ottieni tutti i libri preferiti di un utente
class UserFavoritesView(APIView):
    def get(self, request, user_id):
        favorites = Favorite.objects.filter(user_id=user_id).select_related('book')  # Recupera i preferiti con il libro        serializer = FavoriteSerializer(favorites, many=True)
        favorite_books = [favorite.book for favorite in favorites]  # Ottieni solo i libri
        serializer = BookSerializer(favorite_books, many=True)
        return Response(serializer.data)
    
class RemoveFavoriteView(APIView):
    def delete(self, request, user_id, book_id):
        try:
            favorite = Favorite.objects.get(user=user_id, book_id=book_id)
            favorite.delete()
            return Response({"message": "Libro rimosso dai preferiti"}, status=status.HTTP_204_NO_CONTENT)
        except Favorite.DoesNotExist:
            return Response({"error": "Il libro non è nei preferiti"}, status=status.HTTP_404_NOT_FOUND)


class IsFavoriteView(APIView):
    def get(self, request,user_id, book_id):
        is_favorite = Favorite.objects.filter(user_id=user_id, book_id=book_id).exists()
        return Response({"is_favorite": is_favorite})