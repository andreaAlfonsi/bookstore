from rest_framework import serializers
from .models import Cart, CartItem
from books.models import Book

class CartItemSerializer(serializers.ModelSerializer):
    book = serializers.StringRelatedField()  # or use a nested serializer for more book details
    #book_id = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all())

    class Meta:
        model = CartItem
        #total_price = model.total_price()
        #print(total_price)
        fields = ['id', 'book', 'book_id', 'quantity', 'total_price']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    #items.total_price = sum(item.total_price for item in items)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items']
        read_only_fields = ['user']