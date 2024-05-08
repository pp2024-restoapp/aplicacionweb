from rest_framework import serializers
from cartadigital.models import Categoria, Producto, Pedido

class CategoriaSerializer(serializers.ModelSerializer):
	class Meta:
		model = Categoria
		fields = ('id', 'nombre', 'descripcion')


class ProductoSerializer(serializers.ModelSerializer):
	class Meta:
		model = Producto
		fields = ('id','nombre','descripcion','precio', 'stock', 'imagen', 'activo','categoria')
	
class PedidoSerializer(serializers.ModelSerializer):
	class Meta:
		model = Pedido
		fields = ('id','estado','tipo', 'observacion', 'usuario', 'producto','importe','numeroMesa','pago')

class Producto_Categoria(serializers.ModelSerializer):
	class Meta:
		model = Producto
		fields = ('id','nombre','descripcion','precio','imagen','categoria')