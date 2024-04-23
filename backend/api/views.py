from django.shortcuts import render
from django.http import HttpResponse 
from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.shortcuts import get_object_or_404

from cartadigital.models import Usuario, Producto, Categoria


# Create your views here.
def inicioApi(request):
    return HttpResponse("<h1> Bienvenido a la API de CartaDigtal </h1>")

def listaUsuarios(request):
    usuarios = list(Usuario.objects.values())
    return JsonResponse(usuarios, safe= False)

def listadoProductos(request):
    productos = list(Producto.objects.values())
    
       
    return JsonResponse(productos, safe=False)








