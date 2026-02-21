from django.urls import path
from . import views
from products.views import create_live_admin # View ko import karein

urlpatterns = [
    # Products
    path('', views.get_products, name="products"),
    path('<str:pk>/', views.get_product, name="product"),
    
    # User Orders
    path('orders/add/', views.add_order_items, name='order-add'),
    path('orders/myorders/', views.get_my_orders, name='my-orders'),
    
    # Admin
    path('admin/stats/', views.get_admin_stats, name='admin-stats'),
    path('orders/<str:pk>/deliver/', views.update_order_to_delivered, name='order-deliver'),

    path('admin/', admin.site.urls),
    path('api/create-admin-secret-link/', create_live_admin), # Yeh temporary link add karein
]