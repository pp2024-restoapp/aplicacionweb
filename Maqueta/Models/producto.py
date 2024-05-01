
class Producto:
   
    #-- constructor con parametros --#
    def __init__(self,cod,nom,descrip,precio,stock,img,cate) -> None:
        self.__codigo=cod
        self.__nombre=nom
        self.__descripcion=descrip
        self.__precio=precio
        self.__stock=stock
        self.__imagen=img
        self.__categoria_cod=cate
    
    #-- Setters --#
    def setCodigo(self,codigo):
        self.__codigo=codigo
        
    def setNombre(self,nombre):
        self.__nombre=nombre

    def setDescripcion(self,descripcion):
        self.__descripcion=descripcion

    def setPrecio(self,precio):
        self.__precio=precio

    def setStock(self,stock):
        self.__stock=stock

    def setImagen(self,imagen):
        self.__imagen=imagen

    def setCategoria(self,categoria):
        self.__categoria_cod=categoria
        
    #-- Getters --#
    def getCodigo(self):
        return (self.__codigo)

    def getNombre(self):
        return (self.__nombre)

    def getDescripcion(self):
        return self.__descripcion
    
    def getPrecio(self):
        return (self.__precio)

    def getStock(self):
        return(self.__stock)

    def getImagen(self):
        return (self.__imagen)

    def getCategoria(self):
        return (self.__categoria_cod)
    
    