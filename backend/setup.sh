#!/bin/bash
# Usage: ./init_django_project.sh project_name 

# Check if project name is provided
if [ -z "$1" ]; then
    echo "❌ Error: Please provide a Django project name."
    echo "👉 Usage: bash init_django_project.sh <project_name>"
    exit 1
fi

PROJECT_NAME=$1


# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install required packages

# Check if requirements.txt exists
if [ -f "requirements.txt" ]; then
    echo "📦 Installing packages from requirements.txt..."
    pip install -r requirements.txt
else
    echo "⚠️ requirements.txt not found. Installing default packages manually..."
    pip install django djangorestframework psycopg2-binary django-environ
fi


# Generate a Django SECRET_KEY
SECRET_KEY=$(python3 -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())")

# Start project
django-admin startproject $PROJECT_NAME .

# Create .env file with the generated SECRET_KEY
cat > .env.example <<EOL
DEBUG=True
SECRET_KEY='$SECRET_KEY'
DB_NAME=your_db_name
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
ALLOWED_HOSTS=localhost,127.0.0.1
EOL

# Copy .env.example to .env
echo "✅ 📄 Copying .env.example to .env..."
cp .env.example .env

# Replace settings.py with your custom template
SETTINGS_FILE="$PROJECT_NAME/settings.py"

cat > $SETTINGS_FILE <<EOL
import os
import environ
from pathlib import Path

# Set up environment
env = environ.Env()
BASE_DIR = Path(__file__).resolve().parent.parent
env.read_env(os.path.join(BASE_DIR, ".env"))

# Security
SECRET_KEY = env("SECRET_KEY")
DEBUG = env.bool("DEBUG", default=True)
ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=["localhost", "127.0.0.1"])

# Application definition
DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

# Add third party apps here
THIRD_PARTY_APPS = [
    "rest_framework",
]

# Add in house project apps here
PROJECT_APPS = [
    
]

# Installed apps
INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + PROJECT_APPS

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = '$PROJECT_NAME.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = '$PROJECT_NAME.wsgi.application'

# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': env("DB_NAME"),
        'USER': env("DB_USER"),
        'PASSWORD': env("DB_PASSWORD"),
        'HOST': env("DB_HOST"),
        'PORT': env("DB_PORT"),
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# REST FRAMEWORK Config Starts
# REST_FRAMEWORK = {
#     'DATETIME_FORMAT': "%d-%m-%Y %H:%M:%S",
#     'DATETIME_INPUT_FORMATS': [
#         "%d-%m-%Y %H:%M:%S",
#         "%d-%m-%Y",
#         "%Y-%m-%dT%H:%M:%SZ",
#         "%Y-%m-%dT%H:%M:%S.%fZ",
#     ],
# }
# REST FRAMEWORK Config Ends

# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Dhaka'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

EOL

# Update requirements.txt
echo "✅ Updating requirements.txt"
pip freeze > requirements.txt

# Run initial migrations
# python manage.py migrate

echo "✅ Project '$PROJECT_NAME' is set up successfully!"
echo "✅ SECRET_KEY generated and stored in .env"