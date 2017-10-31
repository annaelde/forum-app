from django.contrib import admin

from .models import Post

# Register your models here.
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    fields = ('title', 'content', 'author', 'board')