from django.urls import path
from . import views

urlpatterns = [
  
  	 path('',views.inicioApi,name='inicioApi' ),
      path('usuarios/listado',views.listaUsuarios,name='listaUsuarios' ),
      path('productos/listado',views.listadoProductos,name='listaProductos' ),
           
        
	]