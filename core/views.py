from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.http import Http404
from django.urls import reverse_lazy
from django.core.paginator import Paginator
from .models import Product
from .forms import ProductForm


def product_list(request):
    try:
        query = request.GET.get('q', '').strip()
        products = Product.objects.all()
        
        # Search functionality
        if query:
            products = products.filter(
                name__icontains=query
            ) | products.filter(
                description__icontains=query
            )
        
        # Pagination
        paginator = Paginator(products, 10)  # Show 10 products per page
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        
        context = {
            'page_obj': page_obj,
            'products': page_obj,  # For backward compatibility
            'query': query,
            'is_paginated': page_obj.has_other_pages(),
        }
        
        return render(request, 'core/product_list.html', context)
    except Exception as e:
        messages.error(request, f'An error occurred while fetching products: {str(e)}')
        return render(request, 'core/product_list.html', {'products': [], 'page_obj': None, 'is_paginated': False})


def product_detail(request, pk):
    try:
        product = get_object_or_404(Product, pk=pk)
        return render(request, 'core/product_detail.html', {'product': product})
    except Http404:
        messages.error(request, 'Product not found.')
        return redirect('product_list')
    except Exception as e:
        messages.error(request, f'An error occurred while fetching product details: {str(e)}')
        return redirect('product_list')


def product_create(request):
    if request.method == 'POST':
        try:
            form = ProductForm(request.POST)
            if form.is_valid():
                product = form.save()
                messages.success(request, f'Product "{product.name}" created successfully!')
                return redirect('product_detail', pk=product.pk)
            else:
                messages.error(request, 'Please correct the errors below.')
        except IntegrityError:
            messages.error(request, 'A product with this name already exists.')
        except ValidationError as e:
            messages.error(request, str(e))
        except Exception as e:
            messages.error(request, f'An unexpected error occurred: {str(e)}')
    else:
        form = ProductForm()
    
    return render(request, 'core/product_form.html', {'form': form, 'title': 'Create Product'})


def product_update(request, pk):
    try:
        product = get_object_or_404(Product, pk=pk)
    except Http404:
        messages.error(request, 'Product not found.')
        return redirect('product_list')
    
    if request.method == 'POST':
        try:
            form = ProductForm(request.POST, instance=product)
            if form.is_valid():
                updated_product = form.save()
                messages.success(request, f'Product "{updated_product.name}" updated successfully!')
                return redirect('product_detail', pk=updated_product.pk)
            else:
                messages.error(request, 'Please correct the errors below.')
        except IntegrityError:
            messages.error(request, 'A product with this name already exists.')
        except ValidationError as e:
            messages.error(request, str(e))
        except Exception as e:
            messages.error(request, f'An unexpected error occurred: {str(e)}')
    else:
        form = ProductForm(instance=product)
    
    return render(request, 'core/product_form.html', {'form': form, 'title': 'Update Product'})


def product_delete(request, pk):
    try:
        product = get_object_or_404(Product, pk=pk)
    except Http404:
        messages.error(request, 'Product not found.')
        return redirect('product_list')
    
    if request.method == 'POST':
        try:
            product_name = product.name
            product.delete()
            messages.success(request, f'Product "{product_name}" deleted successfully!')
            return redirect('product_list')
        except Exception as e:
            messages.error(request, f'An error occurred while deleting the product: {str(e)}')
            return redirect('product_detail', pk=product.pk)
    
    return render(request, 'core/product_confirm_delete.html', {'product': product})
