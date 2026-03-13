#!/usr/bin/env python
"""
Deployment fix script for Django CRUD on Render
Run this in Render shell to fix 500 errors
"""

import os
import sys
import django
from django.core.management import execute_from_command_line
from django.contrib.auth.models import User

def main():
    """Fix deployment issues"""
    print("🔧 Fixing Django CRUD deployment issues...")
    
    # Set Django settings
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'crudproject.settings')
    
    try:
        # Run migrations
        print("📊 Running database migrations...")
        execute_from_command_line(['manage.py', 'migrate', '--noinput'])
        print("✅ Migrations completed")
        
        # Collect static files
        print("📁 Collecting static files...")
        execute_from_command_line(['manage.py', 'collectstatic', '--noinput'])
        print("✅ Static files collected")
        
        # Create superuser if not exists
        print("👤 Checking for superuser...")
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
            print("✅ Superuser created: admin/admin123")
        else:
            print("✅ Superuser already exists")
        
        print("🎉 Deployment fixes completed!")
        print("🌐 App URL: https://django-crud-i6uv.onrender.com")
        print("🔧 Admin URL: https://django-crud-i6uv.onrender.com/admin/")
        print("👤 Admin credentials: admin / admin123")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
