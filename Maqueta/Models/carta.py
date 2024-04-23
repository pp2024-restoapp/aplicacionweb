
class carta:
    def __init__(self,numero,nombre,idioma) -> None:
        self.__numero:numero
        self.__nombre:nombre
        self.__idioma:idioma
    
    #-- Setters --#
    def setNumero(self,numero):
        self.__numero=numero
        
    def setNombre(self,nombre):
        self.__nombre=nombre
    
    def setIdioma(self,idioma):
        self.__idioma=idioma
    
    #-- Getters --#
    def getNumero(self):
        return (self.__numero)
    
    def getNombre(self):
        return (self.__nombre)
    
    def getIdioma(self):
        return (self.__idioma)