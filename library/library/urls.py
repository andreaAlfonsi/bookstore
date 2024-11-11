"""
URL configuration for library project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from books.views import BookViewSet, BookBuddyView
from accounts.views import RegistrationView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from accounts.views import CustomTokenObtainPairView
from reviews.views import ReviewCreateView, BookReviewsView
from favorites.views import AddFavoriteView, UserFavoritesView, RemoveFavoriteView, IsFavoriteView
from cart.views import CartView

router = DefaultRouter()
router.register(r'books', BookViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    #path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 
    path('api/register/', RegistrationView.as_view(), name='register'),
    path('api/books/<int:book_id>/reviews/', BookReviewsView.as_view(), name='book-reviews'),
    path('api/books/<int:book_id>/reviews/create/', ReviewCreateView.as_view(), name='create-review'),
    path('api/books/<int:book_id>/favorites/add/', AddFavoriteView.as_view(), name='add-favorite'),
    path('api/favorites/<int:user_id>/', UserFavoritesView.as_view(), name='user-favorites'),
    path('api/<int:user_id>/favorites/<int:book_id>/', RemoveFavoriteView.as_view(), name='remove-favorite'),
    path('api/<int:user_id>/favorites/check/<int:book_id>/', IsFavoriteView.as_view(), name='is-favorite'),
    path('api/cart/', CartView.as_view(), name='cart'),
    path('api/cart/<int:user_id>/', CartView.as_view(), name='cart-user'),
    path('api/cart/<int:user_id>/<int:book_id>/', CartView.as_view(), name='cart-user'),
    path('api/book-buddy/', BookBuddyView.as_view(), name='book-buddy'),
]