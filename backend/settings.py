import os
from pathlib import Path
from datetime import timedelta

# Build paths inside the project
BASE_DIR = Path(__file__).resolve().parent.parent

# --- SECURITY SETTINGS ---
# SECRET_KEY ko environment variable se uthayen taake GitHub par leak na ho
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'django-insecure-w6t*=+mhk@qvii8uvz#wc8r^4can%p3!4^nx3h5^p!!qima4zp')

# Production mein DEBUG hamesha False hona chahiye
DEBUG = os.environ.get('DEBUG', 'True') == 'True'

# Apne Render URL ko yahan add karein
ALLOWED_HOSTS = [
    'localhost', 
    '127.0.0.1', 
    '.onrender.com' # Is se saare Render subdomains allow ho jayenge
]

# --- APPLICATION DEFINITION ---
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third-party Apps
    'rest_framework',
    'corsheaders',
    'rest_framework_simplejwt',
    
    # Local Apps
    'products',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Sab se top par
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', # Static files ke liye zaroori hai
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# --- DATABASE ---
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# --- AUTHENTICATION & JWT ---
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=30), # Aapki preference ke mutabiq 30 din
    'REFRESH_TOKEN_LIFETIME': timedelta(days=90),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
    'AUTH_HEADER_TYPES': ('Bearer',),
}

# --- STATIC & MEDIA FILES ---
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / "staticfiles"

# WhiteNoise settings for production
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# --- CORS SETTINGS ---
# Development ke liye True hai, lekin production mein specific URLs dena behtar hai
CORS_ALLOW_ALL_ORIGINS = True 

# --- OTHER SETTINGS ---
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True