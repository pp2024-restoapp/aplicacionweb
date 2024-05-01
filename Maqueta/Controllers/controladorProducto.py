import sys
sys.path.append('.\\Models')
from conexion import ConexionBD
from producto import Producto
from productoSQL import ProductoSql



#Agregar un producto
def agregarProducto():
    producto = Producto(1,"pizza muzarella","pizza con salsa, aceitunas, ajies y muzarella",1500,10,"pizzaMuzza.jpg",1)
    productoSql=ProductoSql()
    productoSql.insertarProducto(producto)

#Leer o listar productos
def listarProducto():
    productoSql=ProductoSql()
    lista = productoSql.listarProductos()
    for p in lista:
        print(p)
#Buscar un producto
def buscarProducto(cod):
    productoSql=ProductoSql()
    producto = productoSql.listarProducto(cod)
    for p in producto:
        print(p)

#Actualizar un producto
def actualizarProducto(cod):
     producto = Producto(1,"pizza muza","pizza con salsa y muzarella",1300,8,"pizzaMuzza.jpg",1)
     productoSql=ProductoSql()  
     productoSql.actualizarProducto(cod,producto)

#Borrar un producto
def borrarProducto(cod):
     productoSql=ProductoSql()
     productoSql.borrarProducto(cod)

#-- test para pruebas de funcionamiento --##

agregarProducto()
listarProducto()
buscarProducto(1)
actualizarProducto(1)
borrarProducto(1)


