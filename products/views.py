from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser # IsAdminUser yahan add kiya hai
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Sum
from .models import Product, Order, OrderItem
from .serializers import ProductSerializer, OrderSerializer

# --- PRODUCT VIEWS ---

@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_product(request, pk):
    try:
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

# --- ORDER VIEWS (For Normal Users) ---

@api_view(['POST'])
def add_order_items(request):
    user = request.user
    data = request.data
    order_items = data.get('orderItems')

    if not order_items or len(order_items) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # 1. Create Order
        order = Order.objects.create(
            user=user if user.is_authenticated else None,
            total_price=data['totalPrice']
        )

        # 2. Create Order Items and link them to Order
        for i in order_items:
            product = Product.objects.get(id=i['id'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                qty=i['qty'],
                price=i['price']
            )
            
            # Stock kam karne ki logic
            product.stock -= int(i['qty'])
            product.save()
        
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_orders(request):
    user = request.user
    orders = user.order_set.all().order_by('-created_at')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


# --- ADMIN DASHBOARD VIEWS ---

@api_view(['GET'])
@permission_classes([IsAdminUser]) # Sirf Admin access kar sakta hai
def get_admin_stats(request):
    total_orders = Order.objects.count()
    total_sales = Order.objects.aggregate(Sum('total_price'))['total_price__sum'] or 0
    total_products = Product.objects.count()
    
    latest_orders = Order.objects.all().order_by('-created_at')[:10]
    serializer = OrderSerializer(latest_orders, many=True)
    
    return Response({
        'totalOrders': total_orders,
        'totalSales': total_sales,
        'totalProducts': total_products,
        'latestOrders': serializer.data
    })

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_order_to_delivered(request, pk):
    order = Order.objects.get(id=pk)
    order.is_delivered = True
    order.save()
    return Response('Order was marked as delivered')



from django.http import HttpResponse
from django.contrib.auth.models import User
from .models import Product, Category # Category ko bhi import karein

# views.py ka aakhri hissa

def create_live_admin(request):
    try:
        # 1. Superuser Banayein
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@skillseducation.com', 'Admin12345')
            msg = "🔥 Admin 'admin' created! "
        else:
            msg = "✅ Admin already exists. "

        # 2. Category Banayein ya Dhoondein
        category_obj, created = Category.objects.get_or_create(name="Apparel")

        # 3. Aik Test Product Add Karein
        if Product.objects.count() == 0:
            Product.objects.create(
                name="Skills Luxury Tee",
                price=45.00,
                description="Premium minimalist t-shirt from Skillseducation collection.",
                stock=10, # ✅ 'countInStock' ko badal kar 'stock' kar diya
                category=category_obj, # ✅ String ki jagah object de diya
                image="/media/placeholder.jpg" 
            )
            msg += "🛍️ Test Product Added!"
        
        return HttpResponse(msg)
    
    except Exception as e:
        return HttpResponse(f"❌ Error: {str(e)}", status=500)