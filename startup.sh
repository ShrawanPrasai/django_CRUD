#!/bin/bash

# Render startup script for Django CRUD project
echo "🚀 Starting Django CRUD deployment..."

# Set Django settings module
export DJANGO_SETTINGS_MODULE=crudproject.settings

# Run database migrations
echo "📊 Running database migrations..."
python manage.py migrate --noinput

# Collect static files
echo "📁 Collecting static files..."
python manage.py collectstatic --noinput

# Create superuser if it doesn't exist
echo "👤 Checking for superuser..."
python manage.py shell << EOF
from django.contrib.auth.models import User
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
    print('✅ Superuser created: admin/admin123')
else:
    print('✅ Superuser already exists')
EOF

echo "🎉 Django CRUD app is ready!"
echo "🌐 App URL: https://django-crud-i6uv.onrender.com"
echo "🔧 Admin URL: https://django-crud-i6uv.onrender.com/admin/"
echo "👤 Admin credentials: admin / admin123"
