from django.db import models
from django.contrib.auth.models import User
from books.models import Book  # Importa il modello Book dall'app 'books'

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Favorite book {self.book} for {self.user}"
