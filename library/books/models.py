from django.db import models

class Book(models.Model):
    titolo = models.CharField(max_length=255)
    autore = models.CharField(max_length=255)
    anno_pubblicazione = models.IntegerField(null=True, blank=True)
    prezzo = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.titolo