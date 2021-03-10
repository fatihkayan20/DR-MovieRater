from django.contrib import admin
from .models import *

class MovieAdmin(admin.ModelAdmin):
    list_display=('title','no_of_ratings','avg_rating')

admin.site.register(Movie,MovieAdmin)
admin.site.register(Rating)
