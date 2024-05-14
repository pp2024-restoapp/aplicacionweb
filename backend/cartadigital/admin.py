from django.contrib import admin
from .models import *

# Clases basadas en ModelAdmin:
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ['id', 'nombre','descripcion']
    search_fields = ['nombre', 'descripcion']
    list_filter = ['nombre']

class PedidoAdmin(admin.ModelAdmin):
    list_display = ['id','fecha_Hora','estado','tipo','numeroMesa','usuario','importe','pago']
    search_fields = ['id','numeroMesa','usuario']
    list_filter = ['estado','tipo','usuario']

class ProductoAdmin(admin.ModelAdmin):
    list_display = ['id','nombre','precio','stock','categoria']
    search_fields = ['nombre','categoria','descripcion']
    list_filter = ['precio']

class CartaAdmin(admin.ModelAdmin):
    list_display = ['id','nombre','idioma']
    search_fields = ['nombre']
    list_filter = ['idioma']

class CalificacionAdmin(admin.ModelAdmin):
    list_display = ['id','calificacion','producto']
    search_fields = ['calificacion','producto','comentario']
    list_filter = ['producto']

#class FacturaAdmin(admin.ModelAdmin):
#    list_display = ['id','fecha','importe']
#    search_fields = ['id','fecha']
#    list_filter =  ['fecha']

class VentaAdmin(admin.ModelAdmin):
    list_display = ['id','fecha_hora','descuento','importe','pedido']
    search_fields = ['id','fecha_hora','pedido']
    list_filter = ['pedido']

class ComentarioAdmin(admin.ModelAdmin):
    list_display = ['id','fecha_hora','asunto','usuario']
    search_fields = ['asunto','usuario','id']
    list_filter = ['asunto','usuario']

class MesaAdmin(admin.ModelAdmin):
    list_display = ['id','numero','estado','ubicacion','cant_personas']

class ReservaAdmin(admin.ModelAdmin):
    list_display = ['id','fechaHora','nombre','email']
    search_fields = ['id','fechaHora','nombre']
    list_filter = ['fechaHora','email']

# Register your models here.
admin.site.register(Categoria,CategoriaAdmin)
admin.site.register(Pedido, PedidoAdmin)
admin.site.register(Producto, ProductoAdmin)
admin.site.register(Carta, CartaAdmin)
admin.site.register(Calificacion, CalificacionAdmin)
#admin.site.register(Factura, FacturaAdmin)
admin.site.register(Venta, VentaAdmin)
admin.site.register(Comentario, ComentarioAdmin)
admin.site.register(Mesa, MesaAdmin)
admin.site.register(Reserva, ReservaAdmin)


