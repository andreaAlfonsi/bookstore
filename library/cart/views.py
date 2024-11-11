from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Cart, CartItem
from django.contrib.auth.models import User
from books.models import Book
from rest_framework import status
from .serializers import CartSerializer, CartItemSerializer

class CartView(APIView):

    def get(self, request, user_id):
        user = User.objects.get(id=user_id)
        cart, _ = Cart.objects.get_or_create(user=user)
        #items = CartItem.objects.filter(cart_id=cart.id)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def post(self, request):
        user_id = request.data.get('user_id')
        user = User.objects.get(id=user_id)
        cart, _ = Cart.objects.get_or_create(user=user)
        book_id = request.data.get("book_id")
        quantity = request.data.get("quantity", 1)

        try:
            book = Book.objects.get(id=book_id)
        except Book.DoesNotExist:
            return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, book=book)
        if not created:
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity
        cart_item.save()

        return Response({"message": "Book added to cart"})

    def put(self, request):
        user_id = request.data.get('userId')
        user = User.objects.get(id=user_id)
        book_id = request.data.get("book_id")
        cart, _ = Cart.objects.get_or_create(user=user)
        try:
            cart_item = CartItem.objects.get(cart=cart, book_id=book_id)
        except CartItem.DoesNotExist:
            return Response({"error": "Item not in cart"}, status=status.HTTP_404_NOT_FOUND)

        cart_item.quantity = request.data.get("quantity", cart_item.quantity)
        cart_item.save()
        return Response({"message": "Cart updated"})

    def delete(self, request, user_id, book_id):
        cart, _ = Cart.objects.get_or_create(user=user_id)
        try:
            cart_item = CartItem.objects.get(cart=cart, book_id=book_id)
            cart_item.delete()
            return Response({"message": "Item removed from cart"})
        except CartItem.DoesNotExist:
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)