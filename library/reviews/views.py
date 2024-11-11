from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import Review, Book
from .serializers import ReviewSerializer

# Aggiungi una recensione per un libro
class ReviewCreateView(APIView):
    def post(self, request, book_id):
        user_id = request.data.get('userId')
        user = User.objects.get(id=user_id)
        book = Book.objects.get(id=book_id)
        rating = request.data.get('rating')
        comment = request.data.get('comment')
        
        review = Review.objects.create(user=user, book=book, rating=rating, comment=comment)
        serializer = ReviewSerializer(review)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# Ottieni tutte le recensioni di un libro
class BookReviewsView(APIView):
    def get(self, request, book_id):
        reviews = Review.objects.filter(book_id=book_id)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)