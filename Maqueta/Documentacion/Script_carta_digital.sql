-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema carta_digital
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema carta_digital
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `carta_digital` DEFAULT CHARACTER SET utf8 ;
USE `carta_digital` ;

-- -----------------------------------------------------
-- Table `carta_digital`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carta_digital`.`categoria` (
  `cod` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(30) NULL,
  `descripcion` VARCHAR(50) NULL,
  PRIMARY KEY (`cod`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `carta_digital`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carta_digital`.`producto` (
  `codigo` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(30) NULL,
  `descripcion` VARCHAR(60) NULL,
  `precio` DOUBLE NULL,
  `stock` INT NULL,
  `imagen` VARCHAR(60) NULL,
  `categoria_cod` INT NOT NULL,
  PRIMARY KEY (`codigo`),
  INDEX `fk_producto_categoria1_idx` (`categoria_cod` ASC) VISIBLE,
  CONSTRAINT `fk_producto_categoria1`
    FOREIGN KEY (`categoria_cod`)
    REFERENCES `carta_digital`.`categoria` (`cod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `carta_digital`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carta_digital`.`usuario` (
  `id` INT NOT NULL,
  `nombre` VARCHAR(45) NULL,
  `apellido` VARCHAR(50) NULL,
  `email` VARCHAR(60) NULL,
  `password` VARCHAR(20) NULL,
  `tipoUsuario` SET('administrador', 'cliente') NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `carta_digital`.`pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carta_digital`.`pedido` (
  `numero` INT NOT NULL AUTO_INCREMENT,
  `fecha_hora` DATETIME NULL,
  `estado` SET('solicitado', 'confirmado', 'atendido') NULL,
  `tipo` SET('salon', 'delivery', 'retiro') NULL,
  `observacion` VARCHAR(60) NULL,
  `usuario_id` INT NOT NULL,
  `mesa_num` INT NULL,
  PRIMARY KEY (`numero`),
  INDEX `fk_pedido_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_pedido_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `carta_digital`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `carta_digital`.`producto_pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carta_digital`.`producto_pedido` (
  `producto_codigo` INT NOT NULL,
  `pedido_numero` INT NOT NULL,
  `cantidad` INT NULL,
  PRIMARY KEY (`producto_codigo`, `pedido_numero`),
  INDEX `fk_producto_has_pedido_pedido1_idx` (`pedido_numero` ASC) VISIBLE,
  INDEX `fk_producto_has_pedido_producto1_idx` (`producto_codigo` ASC) VISIBLE,
  CONSTRAINT `fk_producto_has_pedido_producto1`
    FOREIGN KEY (`producto_codigo`)
    REFERENCES `carta_digital`.`producto` (`codigo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_producto_has_pedido_pedido1`
    FOREIGN KEY (`pedido_numero`)
    REFERENCES `carta_digital`.`pedido` (`numero`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `carta_digital`.`mesa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carta_digital`.`mesa` (
  `numero` INT NOT NULL,
  `estado` SET('libre', 'ocupada', 'reservada') NULL,
  `ubicacion` SET('interior', 'exterior', 'patio') NULL,
  `cant_pers` INT NULL,
  PRIMARY KEY (`numero`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `carta_digital`.`reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carta_digital`.`reserva` (
  `numero` INT NOT NULL AUTO_INCREMENT,
  `fecha_hora` DATETIME NULL,
  `estado` SET('solicitada', 'confirmada', 'cancelada') NULL,
  `detalle` VARCHAR(45) NULL,
  `usuario_id` INT NOT NULL,
  `mesa_numero` INT NOT NULL,
  PRIMARY KEY (`numero`),
  INDEX `fk_reserva_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  INDEX `fk_reserva_mesa1_idx` (`mesa_numero` ASC) VISIBLE,
  CONSTRAINT `fk_reserva_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `carta_digital`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reserva_mesa1`
    FOREIGN KEY (`mesa_numero`)
    REFERENCES `carta_digital`.`mesa` (`numero`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `carta_digital`.`carta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carta_digital`.`carta` (
  `numero` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `idioma` VARCHAR(45) NULL,
  PRIMARY KEY (`numero`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `carta_digital`.`producto_carta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carta_digital`.`producto_carta` (
  `producto_codigo` INT NOT NULL,
  `carta_numero` INT NOT NULL,
  `seccion` SET('ofertas', 'combos', 'principal', 'postres', 'bebidas') NULL,
  PRIMARY KEY (`producto_codigo`, `carta_numero`),
  INDEX `fk_producto_has_carta_carta1_idx` (`carta_numero` ASC) VISIBLE,
  INDEX `fk_producto_has_carta_producto1_idx` (`producto_codigo` ASC) VISIBLE,
  CONSTRAINT `fk_producto_has_carta_producto1`
    FOREIGN KEY (`producto_codigo`)
    REFERENCES `carta_digital`.`producto` (`codigo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_producto_has_carta_carta1`
    FOREIGN KEY (`carta_numero`)
    REFERENCES `carta_digital`.`carta` (`numero`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `carta_digital`.`comentario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carta_digital`.`comentario` (
  `idcomentario` INT NOT NULL AUTO_INCREMENT,
  `comentario` VARCHAR(50) NULL,
  `fecha_hora` VARCHAR(45) NULL,
  `asunto` SET('sugerencia', 'reclamo', 'agradecimiento', 'otro') NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`idcomentario`),
  INDEX `fk_comentario_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_comentario_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `carta_digital`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `carta_digital`.`calificacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `carta_digital`.`calificacion` (
  `idcalificacion` INT NOT NULL AUTO_INCREMENT,
  `calificacion` SET('malo', 'regular', 'bueno', 'muy bueno', 'excelente') NULL,
  `comentario` VARCHAR(45) NULL,
  `producto_codigo` INT NOT NULL,
  PRIMARY KEY (`idcalificacion`, `producto_codigo`),
  INDEX `fk_calificacion_producto1_idx` (`producto_codigo` ASC) VISIBLE,
  CONSTRAINT `fk_calificacion_producto1`
    FOREIGN KEY (`producto_codigo`)
    REFERENCES `carta_digital`.`producto` (`codigo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
