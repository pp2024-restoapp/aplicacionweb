
class Comentario:
    def __init__(self,id,comentario,asunto,fechaHora) -> None:
        self.__id:id
        self.__comentario:comentario
        self.__asunto:asunto
        self.__fecha_hora:fechaHora
    
    #-- Setters --#
    def setId(self,id):
        self.__id=id
    
    def setComentario(self,comentario):
        self.__comentario=comentario
    
    def setAsunto(self,asunto):
        self.__asunto=asunto
    
    def setFechaHora(self,fechaHora):
        self.__fecha_hora=fechaHora
    
    #-- Getters --#
    def getId(self):
        return (self.__id)
    
    def getComentario(self):
        return (self.__comentario)
    
    def getAsunto(self):
        return (self.__asunto)
    
    def getFechaHora(self):
        return (self.__fecha_hora)
    

