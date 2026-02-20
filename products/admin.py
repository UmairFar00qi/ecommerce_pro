from django.contrib import admin
from .models import Product, Category

# Taake hum dashboard se data handle kar sakein
admin.site.register(Product)
admin.site.register(Category)