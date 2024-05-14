from collections.abc import Iterable
from typing import Any
from django.db import models
from authentication.models import CustomUser
from datetime import datetime

# CLASE CATEGORIA
class Categoria(models.Model):
    #id(primary_key lo genera por defecto el ORM de django)
    nombre = models.CharField(max_length=30, blank=False)
    descripcion = models.CharField(max_length=50, blank=False)
    def __unicode__(self):
        return self.nombre
    def __str__(self):
        return self.nombre
    class Meta:
        db_table = 'categoria'
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'
        
# CLASE USUARIO
class Usuario(models.Model):
    #id(primary_key lo genera por defecto el ORM de django)
    nombre = models.CharField(max_length=45, blank=False)
    apellido = models.CharField(max_length=50, blank=False)
    email = models.EmailField(max_length=60, blank=False)
    password = models.CharField(max_length=20, blank=False)
    tipo_Usuario = models.CharField(max_length=20) #(puede tomar valores como: 'administrador' o 'usuario')
    activo = models.BooleanField(default=True)
    def __unicode__(self):
        return self.nombre
    def __str__(self):
        return self.nombre
    class Meta:
        db_table = 'usuario'
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

# CLASE PRODUCTO
class Producto(models.Model):
     #id(primary_key lo genera por defecto el ORM de django)
    nombre = models.CharField(max_length=30, blank=False)
    descripcion = models.TextField(max_length=1000, blank=False)
    precio = models.DecimalField(max_length=10, blank=False, decimal_places=2, max_digits=10)
    stock = models.IntegerField(default=0)
    imagen = models.CharField(max_length=60)
    activo = models.BooleanField(default=True)
    # categoria_id (ForeignKey lo genera por defecto para la relacion que se arma)
    categoria = models.ForeignKey(
        Categoria, 
        related_name= "producto_categoria",
        on_delete=models.CASCADE
    )
        
    def __unicode__(self):
        return self.nombre
    def __str__(self):
        return self.nombre
    class Meta:
        db_table = 'producto'
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'




# CLASE PEDIDO
class Pedido(models.Model): 
    #id(primary_key lo genera por defecto el ORM de django)
    fecha_Hora = models.DateTimeField(default=datetime.now())
    estado = models.CharField(max_length=100, blank=False)#(puede tomar valores como: 'solicitado','confirmado','atendido','cancelado')
    tipo = models.CharField(max_length=100, blank=False) #(puede tomar valores como: 'salon','delivery','retiro')
    observacion = models.CharField (max_length=100)
    numeroMesa = models.IntegerField(default=0)
    importe = models.FloatField(default=0.0)
    pago= models.CharField(max_length= 15, default='pendiente') #puede tomar valores como: 'pendiente' ó 'realizado'
    #usuario_id = (ForeignKey lo genera por defecto para la relacion que se arma)
    usuario = models.ForeignKey(
        CustomUser,
        related_name= "pedido_usuario",
        on_delete=models.CASCADE
    )
    #ManyToManyField( se crea la tabla pedido_producto para esta relacion)
    producto = models.ManyToManyField(
        Producto,
        related_name= "pedido_producto"
    )
    def __unicode__(self):
        return self.fecha_Hora
    def __str__(self):
        return str(self.pk)
    class Meta:
        db_table = 'pedido'
        verbose_name = 'Pedido'
        verbose_name_plural = 'Pedidos'




# CLASE CARTA 
class Carta(models.Model):
     #id(primary_key lo genera por defecto el ORM de django)
    nombre = models.CharField(max_length=45)
    idioma = models.CharField(max_length=45)
    #ManyToManyField( se crea la tabla carta_producto para esta relacion)
    producto = models.ManyToManyField(
        Producto,
        related_name= "carta_producto"
    )
    def __unicode__(self):
        return self.nombre
    def __str__(self):
        return self.nombre
    class Meta:
        db_table = 'carta'
        verbose_name = 'Carta'
        verbose_name_plural = 'Cartas'


# CLASE CALIFICACIÓN
class Calificacion(models.Model):
    #id(primary_key lo genera por defecto el ORM de django)
    calificacion = models.CharField(max_length=15, default='bueno') #(puede tomar valores: 'malo','regular','bueno','muy bueno','excelente')
    comentario = models.CharField (max_length=45)
    # producto_id = (ForeignKey lo genera por defecto para la relacion que se arma)
    producto = models.ForeignKey(
        Producto,
        #to_field="id_Producto",
        related_name= "calificacion_producto",
        on_delete=models.CASCADE
    )
    def __unicode__(self):
        return self.calificacion
    def __str__(self):
       return str(self.pk)
    class Meta:
        db_table = 'calificacion'
        verbose_name = 'Calificacion'
        verbose_name_plural = 'Calificaciones'

# CLASE FACTURA
#class Factura(models.Model):
   #id(primary_key lo genera por defecto el ORM de django)
    #fecha = models.DateField(blank=False)
    #cantidad = models.IntegerField(blank=False)
    #descripcion = models.TextField (max_length=1000, blank=False)
    #importe = models.IntegerField(blank=False)
    #def __unicode__(self):
        #return self.cantidad
    #def __str__(self):
        #return self.cantidad
    #class Meta:
        #db_table = 'factura'
        #verbose_name = 'Factura'
        #verbose_name_plural = 'Facturas'

# CLASE VENTA
class Venta(models.Model):
   #id(primary_key lo genera por defecto el ORM de django)
    descuento = models.FloatField(default=0.0)
    fecha_hora = models.DateTimeField(default=datetime.now())
    importe = models.FloatField(default=0.0)
    formaPago = models.CharField(default='efectivo',max_length=30) #efectivo, tarjeta c/d, transferencia, mercado pago
    estado = models.CharField(default='pendiente', max_length=25) # pendiente,aceptada, rechazada
    numComprobante = models.IntegerField(default=0)
    #pedido_id =  (ForeignKey lo genera por defecto para la relacion que se arma)
    pedido = models.ForeignKey(
        Pedido,
        #to_field="id_Pedido",
        related_name= "venta_pedido",
        on_delete=models.CASCADE
    )
    
    def __unicode__(self):
        return self.descuento
    def __str__(self):
       return str(self.pk)
    class Meta:
        db_table = 'venta'
        verbose_name = 'Venta'
        verbose_name_plural = 'Ventas'

# CLASE COMENTARIO
class Comentario(models.Model):
   #id(primary_key lo genera por defecto el ORM de django)
    comentario = models.CharField(max_length=50) #(puede tomar los valores: 'sugerencia','reclamo','agradecimiento','otro')
    fecha_hora = models.DateTimeField(blank=False)
    asunto = models.CharField (max_length=20, blank=False)
    #usuario_id = (ForeignKey lo genera por defecto para la relacion que se arma)
    usuario = models.ForeignKey(
        CustomUser,
        related_name= "comentario_usuario",
        on_delete=models.CASCADE
    )
    def __unicode__(self):
        return self.id_Comentario
    def __str__(self):
        return str(self.pk)
    class Meta:
        db_table = 'comentario'
        verbose_name = 'Comentario'
        verbose_name_plural = 'Comentarios'

# CLASE MESA
class Mesa(models.Model):
    #id(primary_key lo genera por defecto el ORM de django)
    numero = models.IntegerField(default=0)
    estado = models.CharField(max_length=100, blank=False) #(puede tomar los valores : 'libre','ocupada','reservada')
    ubicacion = models.TextField(max_length=1000, blank=False) #(puede tomar los valores: 'interior','exterior','patio')
    cant_personas = models.IntegerField(blank=False)
    def __unicode__(self):
        return self.estado
    def __str__(self):
         return "%s" %(self.numero)
    class Meta:
        db_table = 'mesa'
        verbose_name = 'Mesa'
        verbose_name_plural = 'Mesas'
 
#CLASE RESERVA
class Reserva(models.Model):
    nombre = models.CharField(max_length=45)
    fechaHora = models.DateTimeField(null=True)
    cantPersonas = models.IntegerField(default= 1, blank=False)
    email = models.EmailField(max_length=60, blank=True)
    
    
    def __unicode__(self):
        return self.fechaHora
    def __str__(self):
        return str(self.pk)
    class Meta:
        db_table = 'reserva'
        verbose_name = 'Reserva'
        verbose_name_plural = 'Reservas'
 









