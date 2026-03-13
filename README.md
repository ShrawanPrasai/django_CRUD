# Django CRUD Project

A comprehensive Django CRUD (Create, Read, Update, Delete) application with advanced features including search, pagination, validation, and modern UI design.

## Features

### Core CRUD Operations
- **Create**: Add new products with validation
- **Read**: View product lists and individual product details
- **Update**: Edit existing product information
- **Delete**: Remove products with confirmation

### Advanced Features
- **Search**: Real-time search across product names and descriptions
- **Pagination**: Paginated product listings (10 items per page)
- **Validation**: Comprehensive form validation with custom error messages
- **Error Handling**: Robust error handling throughout the application
- **Responsive Design**: Mobile-friendly interface with modern styling
- **Admin Integration**: Django admin interface for product management

### Technical Features
- **Django 4.2.7**: Latest stable Django framework
- **SQLite Database**: Lightweight database for development
- **Bootstrap-like Styling**: Custom CSS with modern design patterns
- **JavaScript Enhancements**: Interactive features and form validation
- **Security**: CSRF protection and secure form handling

## Project Structure

```
django_crud_project/
├── crudproject/           # Main Django project
│   ├── __init__.py
│   ├── settings.py        # Project settings
│   ├── urls.py           # Main URL configuration
│   └── wsgi.py
├── core/                 # Core application
│   ├── migrations/       # Database migrations
│   ├── static/          # Static files (CSS, JS)
│   │   └── core/
│   │       ├── css/
│   │       │   └── style.css
│   │       └── js/
│   │           └── main.js
│   ├── templates/        # HTML templates
│   │   └── core/
│   │       ├── base.html
│   │       ├── product_list.html
│   │       ├── product_detail.html
│   │       ├── product_form.html
│   │       └── product_confirm_delete.html
│   ├── __init__.py
│   ├── admin.py         # Django admin configuration
│   ├── apps.py          # Application configuration
│   ├── forms.py         # Form definitions
│   ├── models.py        # Database models
│   ├── tests.py         # Test cases
│   ├── urls.py          # Application URLs
│   └── views.py         # View functions
├── venv/                # Virtual environment
├── db.sqlite3          # SQLite database
├── manage.py           # Django management script
├── requirements.txt    # Python dependencies
└── README.md          # This file
```

## Installation and Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)

### Setup Instructions

1. **Clone or download the project**
   ```bash
   # If using git
   git clone <repository-url>
   cd django_crud_project
   ```

2. **Create and activate virtual environment**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate
   
   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run database migrations**
   ```bash
   python manage.py migrate
   ```

5. **Create a superuser (optional, for admin access)**
   ```bash
   python manage.py createsuperuser
   # Username: admin
   # Email: admin@example.com
   # Password: admin123
   ```

6. **Run the development server**
   ```bash
   python manage.py runserver
   ```

7. **Access the application**
   - Main application: http://127.0.0.1:8000/
   - Admin interface: http://127.0.0.1:8000/admin/

## Usage

### Basic Operations

1. **View Products**: Navigate to the home page to see all products
2. **Add Product**: Click "Add New Product" button
3. **Edit Product**: Click "Edit" button on any product
4. **Delete Product**: Click "Delete" button and confirm
5. **Search Products**: Use the search bar to filter products
6. **Navigate Pages**: Use pagination controls at the bottom

### Admin Interface

Access the Django admin interface at `/admin` to:
- Manage products with advanced controls
- View database statistics
- Perform bulk operations

### Form Validation

The application includes comprehensive validation:
- **Product Name**: Required, 3-200 characters, unique
- **Description**: Required, 10-1000 characters
- **Price**: Required, positive number, max $999,999.99
- **Cross-field**: Description shouldn't contain product name

## Features Breakdown

### Phase 1: Project Setup
- Django project and app creation
- Virtual environment setup
- Basic configuration

### Phase 2: Models
- Product model with fields: name, description, price, timestamps
- Django admin integration

### Phase 3: Database
- SQLite database setup
- Initial migrations

### Phase 4: Views
- CRUD view functions
- Basic error handling

### Phase 5: Templates
- HTML templates for all CRUD operations
- Base template with consistent layout

### Phase 6: URLs
- URL routing configuration
- Named URL patterns

### Phase 7: Forms
- Django ModelForm implementation
- Basic validation

### Phase 8: Static Files
- Custom CSS with modern design
- JavaScript for interactivity
- Responsive design

### Phase 9: Validation
- Enhanced form validation
- Comprehensive error handling
- User-friendly error messages

### Phase 10: Advanced Features
- Search functionality
- Pagination
- Performance optimizations

## Development Notes

### Customization
- Modify `core/static/core/css/style.css` for styling changes
- Update `core/forms.py` for validation rules
- Extend `core/models.py` for additional fields

### Testing
- Run tests with: `python manage.py test`
- Add test cases in `core/tests.py`

### Deployment
- Update `DEBUG = False` in settings.py for production
- Configure appropriate database in production
- Set up static files serving

## Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions:
- Check the Django documentation: https://docs.djangoproject.com/
- Review the code comments
- Create an issue in the project repository
