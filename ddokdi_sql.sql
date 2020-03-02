-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema ddokdi_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ddokdi_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ddokdi_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `ddokdi_db` ;

-- -----------------------------------------------------
-- Table `ddokdi_db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ddokdi_db`.`user` (
  `USERID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(60) NOT NULL,
  `id` VARCHAR(64) NOT NULL,
  `passwords` VARCHAR(64) NOT NULL,
  `gender` TINYINT(1) NOT NULL,
  `age` DATE NOT NULL,
  `admin` TINYINT(1) NOT NULL,
  `timestamp` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`USERID`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ddokdi_db`.`drug_management`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ddokdi_db`.`drug_management` (
  `drug_management_USERID` INT NULL DEFAULT NULL,
  `drug_name` VARCHAR(45) NOT NULL,
  `time` CHAR(1) NULL DEFAULT NULL,
  `drug_management_no` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`drug_management_no`),
  INDEX `drug_management_USERID` (`drug_management_USERID` ASC) VISIBLE,
  CONSTRAINT `drug_management_USERID`
    FOREIGN KEY (`drug_management_USERID`)
    REFERENCES `ddokdi_db`.`user` (`USERID`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ddokdi_db`.`event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ddokdi_db`.`event` (
  `event_no` INT NOT NULL AUTO_INCREMENT,
  `event_name` VARCHAR(45) NOT NULL,
  `date` DATETIME NOT NULL,
  `qualification` VARCHAR(2048) NOT NULL,
  `body` VARCHAR(8000) NOT NULL,
  `location` VARCHAR(2048) NOT NULL,
  `beneficial` VARCHAR(2048) NULL DEFAULT NULL,
  `etc` VARCHAR(2048) NULL DEFAULT NULL,
  `heads` INT NULL DEFAULT NULL,
  `timestamp` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `event_admin` INT NULL DEFAULT NULL,
  PRIMARY KEY (`event_no`),
  INDEX `event_admin_idx` (`event_admin` ASC) VISIBLE,
  CONSTRAINT `event_admin`
    FOREIGN KEY (`event_admin`)
    REFERENCES `ddokdi_db`.`user` (`USERID`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `ddokdi_db`.`greeting`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ddokdi_db`.`greeting` (
  `greeting_USERID` INT NULL DEFAULT '0',
  `mood` CHAR(1) NOT NULL,
  `message` CHAR(10) NULL DEFAULT NULL,
  `timestamp` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `greeting_no` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`greeting_no`),
  INDEX `greeting_USERID_idx` (`greeting_USERID` ASC) VISIBLE,
  CONSTRAINT `greeting_USERID`
    FOREIGN KEY (`greeting_USERID`)
    REFERENCES `ddokdi_db`.`user` (`USERID`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `ddokdi_db`.`user_event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ddokdi_db`.`user_event` (
  `user_event_USERID` INT NULL DEFAULT NULL,
  `checking` TINYINT(1) NOT NULL,
  `participation` TINYINT(1) NOT NULL,
  `user_event_event_no` INT NULL DEFAULT NULL,
  `user_event_no` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`user_event_no`),
  INDEX `user_event_event_num_idx` (`user_event_event_no` ASC) VISIBLE,
  INDEX `user_event_USERID` (`user_event_USERID` ASC) VISIBLE,
  CONSTRAINT `user_event_event_no`
    FOREIGN KEY (`user_event_event_no`)
    REFERENCES `ddokdi_db`.`event` (`event_no`),
  CONSTRAINT `user_event_USERID`
    FOREIGN KEY (`user_event_USERID`)
    REFERENCES `ddokdi_db`.`user` (`USERID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
