from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from products.views import MyTokenObtainPairView, create_live_admin # ✅ Views import
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # --- Setup / Admin Creation ---
    path('api/create-admin-secret-link/', create_live_admin), 

    # --- Product & Orders APIs ---
    path('api/products/', include('products.urls')),
    
    # --- Authentication APIs ---
    # Login ab naye view (MyTokenObtainPairView) ko use karega
    path('api/users/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/users/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

# Static/Media files for local development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)