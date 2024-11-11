from django.shortcuts import render

from rest_framework import viewsets, generics
from .models import Book
from .serializers import BookSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import AllowAny
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.views import APIView
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
import openai
#openai.api_key = settings.OPENAI_API_KEY

from openai import OpenAI
client = OpenAI(api_key = settings.OPENAI_API_KEY)

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = BookSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['autore', 'anno_pubblicazione']
    ordering_fields = ['titolo', 'autore', 'anno_pubblicazione', 'prezzo']
    
class BookBuddyView(APIView):

    def post(self, request):
        book_title = request.data.get("book_title")
        book_author = request.data.get('book_author')
        user_message = request.data.get("message")
        
        if not user_message:
            intro_message = f"Ciao! Sono il tuo Book Buddy e sono qui per aiutarti a conoscere meglio '{book_title}' di {book_author}. Chiedimi tutto ciò che vuoi sapere!"
            return Response({"response": intro_message}, status=status.HTTP_200_OK)
        
        try:
            response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                    {   "role": "system",
                        "content": f"""Sei BB (Book Buddy), e l'utente interagirà con te per avere informazioni
                         su '{book_title}' per decire se comprarlo. Non fare spoiler.
                         """},
                    {
                        "role": "user",
                        "content": user_message
                    }
                ], max_tokens=150
                )
            ai_response = response.choices[0].message.content#.strip()
            return Response({"response": ai_response}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)