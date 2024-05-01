import mysql.connector,producto;
from mysql.connector import Error
from producto import Producto
from conexion import ConexionBD

class ProductoSql:
    def __init__(self) -> None:
        self.bd=ConexionBD()

    #-- CREATE o Insertar Producto --#
    def insertarProducto(self,prod):
            try:
                if self.bd.connection.is_connected():
                    mySql_insert_query = """INSERT INTO `carta_digital`.`producto` (`nombre`, `descripcion`, `precio`, `stock`,`imagen`,`categoria_cod`) VALUES (%s,%s,%s,%s,%s,%s) """
                    data=(prod.getNombre(),prod.getDescripcion(),prod.getPrecio(),prod.getStock(),prod.getImagen(),prod.getCategoria())
                    self.bd.cursor=self.bd.connection.cursor()
                    self.bd.cursor.execute(mySql_insert_query,data)
                    self.bd.connection.commit()
                    record=self.bd.cursor.fetchone()
                    print(self.bd.cursor.rowcount, "Producto agregado exitosamente ")
                    self.bd.cursor.close()
            except Error as e:
               print("Error al insertar producto{}".format(e))
            finally:
                self.bd.cerrarConexion()
    
    #-- READ o listar todos los productos
    def listarProductos(self):
        try:
            if self.bd.connection.is_connected():
                mySql_read_query=""" SELECT * FROM `carta_digital`.`producto`"""
                self.bd.cursor=self.bd.connection.cursor()
                self.bd.cursor.execute(mySql_read_query)
                rows=self.bd.cursor.fetchall()
                self.bd.cursor.close()
                return rows
                                    
        except Error as e:
            print("Error al listar productos".format(e))
            return []
        finally:
                self.bd.cerrarConexion()
    

    #--READ  o buscar un producto       
    def listarProducto(self,cod):
        try:
            if self.bd.connection.is_connected():
                mySql_readQuery=""" SELECT `producto`.`codigo`,`producto`.`nombre`,`categoria`.`nombre` FROM `carta_digital`.`producto` 
                INNER JOIN `carta_digital`.`categoria` ON(`producto`.`categoria_cod` = `categoria`.`cod` )
                WHERE `producto`.`codigo` = %s """
                data =(cod,)
                self.bd.cursor=self.bd.connection.cursor()
                self.bd.cursor.execute(mySql_readQuery,data )
                rows=self.bd.cursor.fetchall()
                self.bd.cursor.close()
                return rows
                
        except Error as e:
            print("Error al buscar el producto",print(e))
            return []
        finally:
                self.bd.cerrarConexion()
    
    #-- UPDATE o actualizar un producto -##    
       
    def actualizarProducto(self, codigo, prod):
        try:
            if self.bd.connection.is_connected():
                mySql_update_query = """UPDATE `carta_digital`.`producto` 
                                    SET `nombre` = %s, `descripcion` = %s, precio = %s, `stock` = %s, `imagen` = %s, `categoria_cod` = %s 
                                    WHERE `codigo` = %s"""
                self.bd.cursor = self.bd.connection.cursor()
                data = (prod.getNombre(), prod.getDescripcion(), prod.getPrecio(), prod.getStock(),prod.getImagen(), prod.getCategoria(), codigo)
                self.bd.cursor.execute(mySql_update_query, data)
                self.bd.connection.commit()
                print(self.bd.cursor.rowcount, "Producto actualizado con éxito ")
                self.bd.cursor.close()
        except Error as e:
            print("Error al actualizar producto {}".format(e))
        finally:
                self.bd.cerrarConexion()
        

    #-- DELETE o borra un producto --#
    def borrarProducto(self, codigo):
            try:
                if self.bd.connection.is_connected():
                    mySql_delete_query = "DELETE FROM `carta_digital`.`producto` WHERE `codigo` = %s"
                    self.bd.cursor=self.bd.connection.cursor()
                    data=(codigo, )
                    self.bd.cursor.execute(mySql_delete_query, data)
                    self.bd.connection.commit()
                    record=self.bd.cursor.fetchone()
                    print(self.bd.cursor.rowcount, "Producto eliminado exitosamente ")
                    self.bd.cursor.close()
            except Error as e:
                print("Error al borrar un producto {}".format(e))   
            finally:
                self.bd.cerrarConexion()   

