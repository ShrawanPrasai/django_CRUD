from django import forms
from .models import Product


class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'description', 'price']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter product name',
                'style': 'width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;',
                'required': True
            }),
            'description': forms.Textarea(attrs={
                'class': 'form-control',
                'placeholder': 'Enter product description',
                'rows': 4,
                'style': 'width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; resize: vertical;',
                'required': True
            }),
            'price': forms.NumberInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter price',
                'step': '0.01',
                'min': '0',
                'style': 'width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;',
                'required': True
            }),
        }
    
    def clean_name(self):
        name = self.cleaned_data.get('name')
        if not name:
            raise forms.ValidationError('Product name is required.')
        if len(name.strip()) < 3:
            raise forms.ValidationError('Product name must be at least 3 characters long.')
        if len(name.strip()) > 200:
            raise forms.ValidationError('Product name cannot exceed 200 characters.')
        # Check for duplicate names (excluding current instance for updates)
        product_id = self.instance.pk if self.instance else None
        if Product.objects.filter(name__iexact=name.strip()).exclude(pk=product_id).exists():
            raise forms.ValidationError('A product with this name already exists.')
        return name.strip()
    
    def clean_description(self):
        description = self.cleaned_data.get('description')
        if not description:
            raise forms.ValidationError('Product description is required.')
        if len(description.strip()) < 10:
            raise forms.ValidationError('Product description must be at least 10 characters long.')
        if len(description.strip()) > 1000:
            raise forms.ValidationError('Product description cannot exceed 1000 characters.')
        return description.strip()
    
    def clean_price(self):
        price = self.cleaned_data.get('price')
        if price is None:
            raise forms.ValidationError('Price is required.')
        if price <= 0:
            raise forms.ValidationError('Price must be greater than 0.')
        if price > 999999.99:
            raise forms.ValidationError('Price cannot exceed $999,999.99.')
        return price
    
    def clean(self):
        cleaned_data = super().clean()
        name = cleaned_data.get('name')
        description = cleaned_data.get('description')
        
        # Cross-field validation
        if name and description:
            if name.lower() in description.lower():
                raise forms.ValidationError('Product description should not contain the product name.')
        
        return cleaned_data
