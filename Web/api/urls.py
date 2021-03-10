from django.urls import path,include
from rest_framework import  routers
from .views import  UserViewSet,MovieViewSet,RatingViewSet

router=routers.DefaultRouter()
router.register('users', UserViewSet ,basename='users')
router.register('movies', MovieViewSet ,basename='movies')
router.register('ratings', RatingViewSet ,basename='ratings')


urlpatterns = [
    path('', include(router.urls)),
]