CREATE DATABASE  IF NOT EXISTS `carta_digital` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `carta_digital`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: carta_digital
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `calificacion`
--

DROP TABLE IF EXISTS `calificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calificacion` (
  `idcalificacion` int NOT NULL AUTO_INCREMENT,
  `calificacion` set('malo','regular','bueno','muy bueno','excelente') DEFAULT NULL,
  `comentario` varchar(45) DEFAULT NULL,
  `producto_codigo` int NOT NULL,
  PRIMARY KEY (`idcalificacion`,`producto_codigo`),
  KEY `fk_calificacion_producto1_idx` (`producto_codigo`),
  CONSTRAINT `fk_calificacion_producto1` FOREIGN KEY (`producto_codigo`) REFERENCES `producto` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `carta`
--

DROP TABLE IF EXISTS `carta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carta` (
  `numero` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `idioma` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`numero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `cod` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) DEFAULT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`cod`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `comentario`
--

DROP TABLE IF EXISTS `comentario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentario` (
  `idcomentario` int NOT NULL AUTO_INCREMENT,
  `comentario` varchar(50) DEFAULT NULL,
  `fecha_hora` varchar(45) DEFAULT NULL,
  `asunto` set('sugerencia','reclamo','agradecimiento','otro') DEFAULT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`idcomentario`),
  KEY `fk_comentario_usuario1_idx` (`usuario_id`),
  CONSTRAINT `fk_comentario_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `factura`
--

DROP TABLE IF EXISTS `factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `factura` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `importe` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mesa`
--

DROP TABLE IF EXISTS `mesa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mesa` (
  `numero` int NOT NULL,
  `estado` set('libre','ocupada','reservada') DEFAULT NULL,
  `ubicacion` set('interior','exterior','patio') DEFAULT NULL,
  `cant_pers` int DEFAULT NULL,
  PRIMARY KEY (`numero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `numero` int NOT NULL AUTO_INCREMENT,
  `fecha_hora` datetime DEFAULT NULL,
  `estado` set('solicitado','confirmado','atendido') DEFAULT NULL,
  `tipo` set('salon','delivery','retiro') DEFAULT NULL,
  `observacion` varchar(60) DEFAULT NULL,
  `usuario_id` int NOT NULL,
  `mesa_num` int DEFAULT NULL,
  PRIMARY KEY (`numero`),
  KEY `fk_pedido_usuario1_idx` (`usuario_id`),
  CONSTRAINT `fk_pedido_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `idpersona` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idpersona`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `codigo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) DEFAULT NULL,
  `descripcion` varchar(60) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `imagen` varchar(60) DEFAULT NULL,
  `categoria_cod` int NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `fk_producto_categoria1_idx` (`categoria_cod`),
  CONSTRAINT `fk_producto_categoria1` FOREIGN KEY (`categoria_cod`) REFERENCES `categoria` (`cod`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `producto_carta`
--

DROP TABLE IF EXISTS `producto_carta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto_carta` (
  `producto_codigo` int NOT NULL,
  `carta_numero` int NOT NULL,
  `seccion` set('ofertas','combos','principal','postres','bebidas') DEFAULT NULL,
  PRIMARY KEY (`producto_codigo`,`carta_numero`),
  KEY `fk_producto_has_carta_carta1_idx` (`carta_numero`),
  KEY `fk_producto_has_carta_producto1_idx` (`producto_codigo`),
  CONSTRAINT `fk_producto_has_carta_carta1` FOREIGN KEY (`carta_numero`) REFERENCES `carta` (`numero`),
  CONSTRAINT `fk_producto_has_carta_producto1` FOREIGN KEY (`producto_codigo`) REFERENCES `producto` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `producto_pedido`
--

DROP TABLE IF EXISTS `producto_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto_pedido` (
  `producto_codigo` int NOT NULL,
  `pedido_numero` int NOT NULL,
  `cantidad` int DEFAULT NULL,
  PRIMARY KEY (`producto_codigo`,`pedido_numero`),
  KEY `fk_producto_has_pedido_pedido1_idx` (`pedido_numero`),
  KEY `fk_producto_has_pedido_producto1_idx` (`producto_codigo`),
  CONSTRAINT `fk_producto_has_pedido_pedido1` FOREIGN KEY (`pedido_numero`) REFERENCES `pedido` (`numero`),
  CONSTRAINT `fk_producto_has_pedido_producto1` FOREIGN KEY (`producto_codigo`) REFERENCES `producto` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reserva`
--

DROP TABLE IF EXISTS `reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserva` (
  `numero` int NOT NULL AUTO_INCREMENT,
  `fecha_hora` datetime DEFAULT NULL,
  `estado` set('solicitada','confirmada','cancelada') DEFAULT NULL,
  `detalle` varchar(45) DEFAULT NULL,
  `usuario_id` int NOT NULL,
  `mesa_numero` int NOT NULL,
  PRIMARY KEY (`numero`),
  KEY `fk_reserva_usuario1_idx` (`usuario_id`),
  KEY `fk_reserva_mesa1_idx` (`mesa_numero`),
  CONSTRAINT `fk_reserva_mesa1` FOREIGN KEY (`mesa_numero`) REFERENCES `mesa` (`numero`),
  CONSTRAINT `fk_reserva_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `tipoUsuario` set('administrador','cliente') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `venta`
--

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descuento` double DEFAULT NULL,
  `fecha_hora` datetime DEFAULT NULL,
  `importe` double DEFAULT NULL,
  `pedido_numero` int DEFAULT NULL,
  `factura_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pedido_numero_idx` (`pedido_numero`),
  KEY `factura_id_idx` (`factura_id`),
  CONSTRAINT `factura_id` FOREIGN KEY (`factura_id`) REFERENCES `factura` (`id`),
  CONSTRAINT `pedido_numero` FOREIGN KEY (`pedido_numero`) REFERENCES `pedido` (`numero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-07 11:01:33
