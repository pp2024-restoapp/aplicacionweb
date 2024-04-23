import mysql.connector;
from mysql.connector import Error


class ConexionBD:

    ### constructor de la clase ConexionBD ****
    def __init__(self) -> None:
                        
            try:
                self.connection=mysql.connector.connect(host='localhost',
                                                        database='carta_digital',
                                                        user='root',
                                                        password='root')
                if self.connection.is_connected():
                        db_Info=self.connection.get_server_info()
                        print("Conectada a MySQL Server version", db_Info)
                        
                        self.cursor=self.connection.cursor()
                        self.cursor.execute("select database();")
                        
                        record=self.cursor.fetchone()
                        print("Estas conectado a la base de datos: ", record)
                        self.cursor.close()
            except Error as e:
                print ("Error while connecting to MySQL", e)
    
    # metodo que cierra la conexion a la bd       
    def cerrarConexion(self):
            try:
                if self.connection.is_connected():
                    
                    self.connection.close()
                    print("Conexion MySQL cerrada.")
            except Error as e:
                print ("Error al cerrar la conexion",e)
    
   
 
    
       
           
           
           
            
            



                