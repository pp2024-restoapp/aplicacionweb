
class Calificacion:
    def __init__(self,id,calificacion,comentario) -> None:
        self.__id=id
        self.__calificacion=calificacion
        self.__comentario=comentario
    
    #-- Setters --#
    def setId(self,id):
        self.__id=id
    
    def setCalificacion(self,calificacion):
        self.__calificacion=calificacion
    
    def setComentario(self,comentario):
        self.__comentario=comentario
    
    #-- Getters --#
    def getId(self):
        return (self.__id)

    def getCalificacion(self):
        return (self.__calificacion)
    
    def getComentario(self):
        return (self.__comentario)