/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.5.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: salao_beleza
-- ------------------------------------------------------
-- Server version	11.5.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `agendamentos`
--

DROP TABLE IF EXISTS `agendamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agendamentos` (
  `agendamento_id` int(11) NOT NULL AUTO_INCREMENT,
  `cliente_id` int(11) NOT NULL,
  `servico_id` int(11) DEFAULT NULL,
  `funcionario_id` int(11) DEFAULT NULL,
  `data_hora` datetime NOT NULL,
  `status` enum('pendente','confirmado','cancelado','concluido') DEFAULT 'pendente',
  PRIMARY KEY (`agendamento_id`),
  KEY `cliente_id` (`cliente_id`),
  KEY `servico_id` (`servico_id`),
  KEY `funcionario_id` (`funcionario_id`),
  CONSTRAINT `agendamentos_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`cliente_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `agendamentos_ibfk_2` FOREIGN KEY (`servico_id`) REFERENCES `servicos` (`servico_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `agendamentos_ibfk_3` FOREIGN KEY (`funcionario_id`) REFERENCES `funcionarios` (`funcionario_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agendamentos`
--

LOCK TABLES `agendamentos` WRITE;
/*!40000 ALTER TABLE `agendamentos` DISABLE KEYS */;
INSERT INTO `agendamentos` VALUES
(1,1,2,2,'2024-11-14 15:49:19','confirmado'),
(2,1,3,3,'2024-11-15 15:49:19','confirmado'),
(3,2,2,2,'2024-11-14 15:49:19','confirmado'),
(4,2,3,3,'2024-11-15 15:49:19','confirmado'),
(5,3,2,2,'2024-11-14 15:49:19','confirmado'),
(6,3,3,3,'2024-11-15 15:49:19','confirmado'),
(7,4,2,2,'2024-11-14 15:49:19','confirmado'),
(8,4,3,3,'2024-11-15 15:49:19','confirmado'),
(9,5,2,2,'2024-11-14 15:49:19','confirmado'),
(10,5,3,3,'2024-11-15 15:49:19','confirmado');
/*!40000 ALTER TABLE `agendamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cargos`
--

DROP TABLE IF EXISTS `cargos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cargos` (
  `cargo_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `descricao` text DEFAULT NULL,
  `imagem_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cargo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargos`
--

LOCK TABLES `cargos` WRITE;
/*!40000 ALTER TABLE `cargos` DISABLE KEYS */;
INSERT INTO `cargos` VALUES
(1,'Cabeleireiro','Especialista em cortes e penteados','https://plus.unsplash.com/premium_photo-1669675935483-01a22e5c88bf?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D}'),
(2,'Manicure','Especialista em cuidados das unhas','https://images.unsplash.com/photo-1659391542239-9648f307c0b1?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(3,'Esteticista','Especialista em tratamentos estéticos','https://plus.unsplash.com/premium_photo-1681483462522-80dcd1c017ca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(4,'Colorista','Especialista em coloração capilar','https://images.unsplash.com/photo-1605980625982-b128a7e7fde2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(5,'Recepcionista','Responsável pelo atendimento ao cliente','https://plus.unsplash.com/premium_photo-1664049686025-e20a49fbabfa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
/*!40000 ALTER TABLE `cargos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias` (
  `categoria_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `descricao` text DEFAULT NULL,
  `imagem_url` varchar(255) DEFAULT NULL,
  `tipo` enum('Produto','Serviço') NOT NULL DEFAULT 'Produto',
  PRIMARY KEY (`categoria_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES
(1,'Tratamento Capilar','Produtos para cuidados com o cabelo','https://plus.unsplash.com/premium_photo-1674841253335-6c892a8b1dc1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Serviço'),
(2,'Cosméticos','Produtos de maquiagem e cuidados com a pele','https://images.unsplash.com/photo-1591375462077-800a22f5fba4?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Serviço'),
(3,'Cuidados com a Pele','Produtos para hidratação e limpeza da pele','https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Serviço'),
(4,'Cuidados com as Unhas','Produtos para manicures e pedicures','https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Serviço'),
(5,'Perfumes','Perfumes e fragrâncias','https://images.unsplash.com/photo-1701291927826-c7775869d822?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Serviço'),
(6,'Shampoo','Produtos para cabelo','https://images.unsplash.com/photo-1701992679010-7cf5dfee49d5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Produto'),
(7,'Maquiagem','Produtos de maquiagem e cuidados com a pele','https://images.unsplash.com/photo-1617220379475-420f5a8a20d9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Produto'),
(8,'Cuidados com a Pele','Produtos para hidratação e limpeza da pele','https://plus.unsplash.com/premium_photo-1679046948909-ab47e96082e7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Produto'),
(9,'Unhas','Produtos para manicures e pedicures','https://images.unsplash.com/photo-1599948128020-9a44505b0d1b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Produto'),
(10,'Perfumes','Perfumes e fragrâncias','https://images.unsplash.com/photo-1590156117763-d5909f5ccbc8?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Produto');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clientes` (
  `cliente_id` int(11) NOT NULL AUTO_INCREMENT,
  `primeiro_nome` varchar(50) NOT NULL,
  `sobrenome` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `data_nascimento` date DEFAULT NULL,
  `data_cadastro` datetime DEFAULT NULL,
  `imagem_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cliente_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES
(1,'Carla','Silva','carla.silva@example.com','$2b$10$UN1laiYTYUGvBTCrLeZb1ulV3COO5ukm53ppPCUZNgtgUeTmLvAi6','1995-01-10','2024-11-13 15:49:18','https://images.unsplash.com/photo-1685534346360-bb9a018df02a?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(2,'Julia','Santos','julia.santos@example.com','$2b$10$UN1laiYTYUGvBTCrLeZb1ulV3COO5ukm53ppPCUZNgtgUeTmLvAi6','1992-02-15','2024-11-13 15:49:18','https://images.unsplash.com/photo-1516534775068-ba3e7458af70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(3,'Lucas','Almeida','lucas.almeida@example.com','$2b$10$UN1laiYTYUGvBTCrLeZb1ulV3COO5ukm53ppPCUZNgtgUeTmLvAi6','1990-05-30','2024-11-13 15:49:18','https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(4,'Marta','Pereira','marta.pereira@example.com','$2b$10$UN1laiYTYUGvBTCrLeZb1ulV3COO5ukm53ppPCUZNgtgUeTmLvAi6','1988-12-12','2024-11-13 15:49:18','https://plus.unsplash.com/premium_photo-1683143646126-df3a3f3739f3?q=80&w=1974&auto=format&fit=crop&ixib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(5,'Pedro','Costa','pedro.costa@example.com','$2b$10$UN1laiYTYUGvBTCrLeZb1ulV3COO5ukm53ppPCUZNgtgUeTmLvAi6','1995-08-25','2024-11-13 15:49:18','https://plus.unsplash.com/premium_photo-1689565611422-b2156cc65e47?q=80&w=2070&auto=format&fit=crop&ixib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enderecos`
--

DROP TABLE IF EXISTS `enderecos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enderecos` (
  `endereco_id` int(11) NOT NULL AUTO_INCREMENT,
  `entidade_id` int(11) NOT NULL,
  `tipo_entidade` enum('cliente','funcionario') NOT NULL,
  `logradouro` varchar(100) NOT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `complemento` varchar(50) DEFAULT NULL,
  `bairro` varchar(50) DEFAULT NULL,
  `cidade` varchar(50) NOT NULL,
  `estado` varchar(2) NOT NULL,
  `cep` varchar(10) DEFAULT NULL,
  `imagem_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`endereco_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enderecos`
--

LOCK TABLES `enderecos` WRITE;
/*!40000 ALTER TABLE `enderecos` DISABLE KEYS */;
INSERT INTO `enderecos` VALUES
(1,1,'cliente','Rua A','123',NULL,'Centro','São Paulo','SP','01000-000',NULL),
(2,2,'cliente','Rua B','456',NULL,'Vila','Rio de Janeiro','RJ','22000-000',NULL),
(3,3,'cliente','Rua C','789',NULL,'Zona Norte','Belo Horizonte','MG','30000-000',NULL),
(4,4,'cliente','Rua D','101',NULL,'Centro','Porto Alegre','RS','90000-000',NULL),
(5,1,'funcionario','Rua E','202',NULL,'Vila Nova','Curitiba','PR','80000-000',NULL);
/*!40000 ALTER TABLE `enderecos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionarios`
--

DROP TABLE IF EXISTS `funcionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `funcionarios` (
  `funcionario_id` int(11) NOT NULL AUTO_INCREMENT,
  `primeiro_nome` varchar(50) NOT NULL,
  `sobrenome` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `cargo_id` int(11) DEFAULT NULL,
  `data_contratacao` datetime DEFAULT NULL,
  `imagem_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`funcionario_id`),
  UNIQUE KEY `email` (`email`),
  KEY `cargo_id` (`cargo_id`),
  CONSTRAINT `funcionarios_ibfk_1` FOREIGN KEY (`cargo_id`) REFERENCES `cargos` (`cargo_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
INSERT INTO `funcionarios` VALUES
(1,'Ana','Silva','ana.silva@example.com','$2b$10$N0uxek/mFO/r/QpK2ZC/ReSkUoEH22HY0e8arfQHB9gDgtwvSANVC',1,'2021-01-15 00:00:00','https://plus.unsplash.com/premium_photo-1688740375397-34605b6abe48?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(2,'Beatriz','Oliveira','beatriz.oliveira@example.com','$2b$10$N0uxek/mFO/r/QpK2ZC/ReSkUoEH22HY0e8arfQHB9gDgtwvSANVC',2,'2020-08-20 00:00:00','https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(3,'Clara','Martins','clara.martins@example.com','$2b$10$N0uxek/mFO/r/QpK2ZC/ReSkUoEH22HY0e8arfQHB9gDgtwvSANVC',3,'2019-07-12 00:00:00','https://images.unsplash.com/photo-1573497161161-c3e73707e25c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(4,'Diana','Souza','diana.souza@example.com','$2b$10$N0uxek/mFO/r/QpK2ZC/ReSkUoEH22HY0e8arfQHB9gDgtwvSANVC',4,'2021-03-10 00:00:00','https://images.unsplash.com/photo-1573497490790-9053816a01d4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(5,'Elisa','Costa','elisa.costa@example.com','$2b$10$N0uxek/mFO/r/QpK2ZC/ReSkUoEH22HY0e8arfQHB9gDgtwvSANVC',5,'2022-05-05 00:00:00','https://images.unsplash.com/photo-1674049405530-7bbb0b0c1eef?q=80&w=2070&auto=format&fit=crop&ixib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
/*!40000 ALTER TABLE `funcionarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itens_pedido`
--

DROP TABLE IF EXISTS `itens_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itens_pedido` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `pedido_id` int(11) NOT NULL,
  `produto_id` int(11) DEFAULT NULL,
  `quantidade` int(11) NOT NULL,
  `preco_unitario` decimal(10,2) NOT NULL,
  PRIMARY KEY (`item_id`),
  KEY `pedido_id` (`pedido_id`),
  KEY `produto_id` (`produto_id`),
  CONSTRAINT `itens_pedido_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`pedido_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `itens_pedido_ibfk_2` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`produto_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itens_pedido`
--

LOCK TABLES `itens_pedido` WRITE;
/*!40000 ALTER TABLE `itens_pedido` DISABLE KEYS */;
INSERT INTO `itens_pedido` VALUES
(1,1,1,1,20.00),
(2,1,2,1,20.00),
(3,1,3,1,20.00),
(4,1,4,1,20.00),
(5,1,5,1,20.00),
(6,2,1,1,20.00),
(7,2,2,1,20.00),
(8,2,3,1,20.00),
(9,2,4,1,20.00),
(10,2,5,1,20.00),
(11,3,1,1,20.00),
(12,3,2,1,20.00),
(13,3,3,1,20.00),
(14,3,4,1,20.00),
(15,3,5,1,20.00),
(16,4,1,1,20.00),
(17,4,2,1,20.00),
(18,4,3,1,20.00),
(19,4,4,1,20.00),
(20,4,5,1,20.00),
(21,5,1,1,20.00),
(22,5,2,1,20.00),
(23,5,3,1,20.00),
(24,5,4,1,20.00),
(25,5,5,1,20.00),
(26,6,1,1,20.00),
(27,6,2,1,20.00),
(28,6,3,1,20.00),
(29,6,4,1,20.00),
(30,6,5,1,20.00),
(31,7,1,1,20.00),
(32,7,2,1,20.00),
(33,7,3,1,20.00),
(34,7,4,1,20.00),
(35,7,5,1,20.00),
(36,8,1,1,20.00),
(37,8,2,1,20.00),
(38,8,3,1,20.00),
(39,8,4,1,20.00),
(40,8,5,1,20.00),
(41,9,1,1,20.00),
(42,9,2,1,20.00),
(43,9,3,1,20.00),
(44,9,4,1,20.00),
(45,9,5,1,20.00),
(46,10,1,1,20.00),
(47,10,2,1,20.00),
(48,10,3,1,20.00),
(49,10,4,1,20.00),
(50,10,5,1,20.00),
(51,11,1,1,20.00),
(52,11,2,1,20.00),
(53,11,3,1,20.00),
(54,11,4,1,20.00),
(55,11,5,1,20.00),
(56,12,1,1,20.00),
(57,12,2,1,20.00),
(58,12,3,1,20.00),
(59,12,4,1,20.00),
(60,12,5,1,20.00),
(61,13,1,1,20.00),
(62,13,2,1,20.00),
(63,13,3,1,20.00),
(64,13,4,1,20.00),
(65,13,5,1,20.00),
(66,14,1,1,20.00),
(67,14,2,1,20.00),
(68,14,3,1,20.00),
(69,14,4,1,20.00),
(70,14,5,1,20.00),
(71,15,1,1,20.00),
(72,15,2,1,20.00),
(73,15,3,1,20.00),
(74,15,4,1,20.00),
(75,15,5,1,20.00),
(76,16,1,1,20.00),
(77,16,2,1,20.00),
(78,16,3,1,20.00),
(79,16,4,1,20.00),
(80,16,5,1,20.00),
(81,17,1,1,20.00),
(82,17,2,1,20.00),
(83,17,3,1,20.00),
(84,17,4,1,20.00),
(85,17,5,1,20.00),
(86,18,1,1,20.00),
(87,18,2,1,20.00),
(88,18,3,1,20.00),
(89,18,4,1,20.00),
(90,18,5,1,20.00),
(91,19,1,1,20.00),
(92,19,2,1,20.00),
(93,19,3,1,20.00),
(94,19,4,1,20.00),
(95,19,5,1,20.00),
(96,20,1,1,20.00),
(97,20,2,1,20.00),
(98,20,3,1,20.00),
(99,20,4,1,20.00),
(100,20,5,1,20.00),
(101,21,1,1,20.00),
(102,21,2,1,20.00),
(103,21,3,1,20.00),
(104,21,4,1,20.00),
(105,21,5,1,20.00),
(106,22,1,1,20.00),
(107,22,2,1,20.00),
(108,22,3,1,20.00),
(109,22,4,1,20.00),
(110,22,5,1,20.00),
(111,23,1,1,20.00),
(112,23,2,1,20.00),
(113,23,3,1,20.00),
(114,23,4,1,20.00),
(115,23,5,1,20.00),
(116,24,1,1,20.00),
(117,24,2,1,20.00),
(118,24,3,1,20.00),
(119,24,4,1,20.00),
(120,24,5,1,20.00),
(121,25,1,1,20.00),
(122,25,2,1,20.00),
(123,25,3,1,20.00),
(124,25,4,1,20.00),
(125,25,5,1,20.00);
/*!40000 ALTER TABLE `itens_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedidos` (
  `pedido_id` int(11) NOT NULL AUTO_INCREMENT,
  `cliente_id` int(11) NOT NULL,
  `data_pedido` datetime DEFAULT NULL,
  `valor_total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`pedido_id`),
  KEY `cliente_id` (`cliente_id`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`cliente_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES
(1,1,'2024-11-13 15:49:19',100.00),
(2,1,'2024-11-13 15:49:19',100.00),
(3,1,'2024-11-13 15:49:19',100.00),
(4,1,'2024-11-13 15:49:19',100.00),
(5,1,'2024-11-13 15:49:19',100.00),
(6,2,'2024-11-13 15:49:19',100.00),
(7,2,'2024-11-13 15:49:19',100.00),
(8,2,'2024-11-13 15:49:19',100.00),
(9,2,'2024-11-13 15:49:19',100.00),
(10,2,'2024-11-13 15:49:19',100.00),
(11,3,'2024-11-13 15:49:19',100.00),
(12,3,'2024-11-13 15:49:19',100.00),
(13,3,'2024-11-13 15:49:19',100.00),
(14,3,'2024-11-13 15:49:19',100.00),
(15,3,'2024-11-13 15:49:19',100.00),
(16,4,'2024-11-13 15:49:19',100.00),
(17,4,'2024-11-13 15:49:19',100.00),
(18,4,'2024-11-13 15:49:19',100.00),
(19,4,'2024-11-13 15:49:19',100.00),
(20,4,'2024-11-13 15:49:19',100.00),
(21,5,'2024-11-13 15:49:19',100.00),
(22,5,'2024-11-13 15:49:19',100.00),
(23,5,'2024-11-13 15:49:19',100.00),
(24,5,'2024-11-13 15:49:19',100.00),
(25,5,'2024-11-13 15:49:19',100.00);
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `produtos` (
  `produto_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` text DEFAULT NULL,
  `preco` decimal(10,2) NOT NULL,
  `estoque` int(11) NOT NULL,
  `categoria_id` int(11) DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT 1,
  `imagem_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`produto_id`),
  KEY `categoria_id` (`categoria_id`),
  CONSTRAINT `produtos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`categoria_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES
(1,'Shampoo Reconstrutor','Repara cabelos danificados',30.00,100,5,1,'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(2,'Condicionador Hidratação','Para hidratação intensa',25.00,80,5,1,'https://images.unsplash.com/photo-1686121544831-3f5a03770e21?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(3,'Máscara Capilar','Nutrição profunda',50.00,60,6,1,'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=2056&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(4,'Óleo Capilar','Dá brilho aos cabelos',40.00,50,6,1,'https://images.unsplash.com/photo-1669281393011-c335050cf0e9?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(5,'Esmalte Rosa','Longa duração',10.00,150,7,1,'https://media.istockphoto.com/id/960165554/pt/foto/nail-polish-with-shadow.jpg?s=2048x2048&w=is&k=20&c=Bf6nr_wq7p3lfBv5o-p7QKsOEUkCI8Akib20ZV7aDhk=');
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicos`
--

DROP TABLE IF EXISTS `servicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `servicos` (
  `servico_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` text DEFAULT NULL,
  `preco` decimal(10,2) NOT NULL,
  `duracao` time DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT 1,
  `imagem_url` varchar(255) DEFAULT NULL,
  `categoria_id` int(11) NOT NULL,
  PRIMARY KEY (`servico_id`),
  KEY `categoria_id` (`categoria_id`),
  CONSTRAINT `servicos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`categoria_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicos`
--

LOCK TABLES `servicos` WRITE;
/*!40000 ALTER TABLE `servicos` DISABLE KEYS */;
INSERT INTO `servicos` VALUES
(1,'Corte de Cabelo Masculino','Corte e finalização',40.00,'00:30:00',1,'https://images.unsplash.com/photo-1511920922889-5c35bfd95a7f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',1),
(2,'Hidratação Capilar','Hidratação para cabelos secos',60.00,'00:45:00',1,'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',1),
(3,'Cauterização Capilar','Tratamento para reconstrução capilar',70.00,'01:00:00',1,'https://www.belezasimples.com.br/wp-content/uploads/2019/10/0000cauterizacao_capa-710x503.jpg',1),
(4,'Coloração','Coloração capilar completa',90.00,'01:30:00',1,'https://plus.unsplash.com/premium_photo-1661630726197-3bb591b15d98?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',1),
(5,'Botox Capilar','Redução de volume e hidratação',80.00,'01:00:00',1,'https://paradafeminina.com.br/wp-content/uploads/2020/02/botox.png',1),
(6,'Maquiagem Social','Maquiagem para eventos sociais',100.00,'01:00:00',1,'https://plus.unsplash.com/premium_photo-1661770834484-266859b6be88?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',2),
(7,'Sobrancelha Design','Design e preenchimento de sobrancelha',40.00,'00:30:00',1,'https://plus.unsplash.com/premium_photo-1663050996462-4671145bf66f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',2),
(8,'Limpeza de Pele','Limpeza profunda da pele',120.00,'01:00:00',1,'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',2),
(9,'Peeling Facial','Tratamento de rejuvenescimento facial',150.00,'01:00:00',1,'https://plus.unsplash.com/premium_photo-1663040173266-4d41d3736cc9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',2),
(10,'Maquiagem para Noivas','Maquiagem especial para noivas',200.00,'02:00:00',1,'https://images.unsplash.com/photo-1592343516059-cf2712eb0dee?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',2),
(11,'Hidratação Facial','Hidratação profunda da pele',50.00,'00:30:00',1,'https://plus.unsplash.com/premium_photo-1708271138660-0427d0f25942?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',3),
(12,'Massagem Relaxante','Massagem para relaxamento',90.00,'01:00:00',1,'https://plus.unsplash.com/premium_photo-1661582395155-e74bb0d891c8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',3),
(13,'Tratamento Antienvelhecimento','Tratamento para pele madura',200.00,'01:30:00',1,'https://plus.unsplash.com/premium_photo-1661457800454-64ba872af3f9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',3),
(14,'Esfoliação Corporal','Esfoliação e hidratação corporal',80.00,'01:00:00',1,'https://plus.unsplash.com/premium_photo-1683121902668-41f60858608a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',3),
(15,'Drenagem Linfática','Massagem de drenagem linfática',100.00,'01:00:00',1,'https://d1xe7tfg0uwul9.cloudfront.net/sbd-portal-2024/wp-content/uploads/2022/06/Drenagem-linfatica-e-benefica-para-a-saude-shutterstock-1.webp',3),
(16,'Manicure Tradicional','Manicure com esmaltação',25.00,'00:30:00',1,'https://plus.unsplash.com/premium_photo-1661290231745-15f1ed6fea88?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',4),
(17,'Pedicure Completa','Cuidado completo dos pés',35.00,'00:40:00',1,'https://plus.unsplash.com/premium_photo-1661499249417-c20d6b668469?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',4),
(18,'Esmaltação em Gel','Esmaltação duradoura em gel',50.00,'00:50:00',1,'https://unhadecoradasimples.com.br/wp-content/uploads/2024/06/unhas-em-gel-decoradas-12.jpg',4),
(19,'Unhas Acrigel','Alongamento e esmaltação com acrigel',80.00,'01:30:00',1,'https://vidarealdemulheres.com.br/wp-content/uploads/2024/05/unhas-acrigel-decoradas-capa-.jpeg',4),
(20,'Unhas de Fibra','Alongamento e esmaltação com fibra',90.00,'01:30:00',1,'https://unhadecoradasimples.com.br/wp-content/uploads/2024/04/13_hq720.jpg',4),
(21,'Perfume Importado','Perfume com fragrância marcante',200.00,'00:00:00',1,'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',5),
(22,'Perfume Nacional','Perfume com fragrância suave',120.00,'00:00:00',1,'https://essenciadehomem.com.br/wp-content/uploads/2023/11/Perfumes-Masculinos-Nacionais-Que-Parecem-Importados.jpg',5),
(23,'Água de Colônia','Perfume leve para uso diário',80.00,'00:00:00',1,'https://images.unsplash.com/photo-1674469296521-e6b42d9768a4?q=80&w=2033&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',5),
(24,'Deo Colônia','Perfume suave para uso cotidiano',90.00,'00:00:00',1,'https://plus.unsplash.com/premium_photo-1675018083544-021f18a5ef19?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',5),
(25,'Perfume Amadeirado','Perfume com notas amadeiradas',250.00,'00:00:00',1,'https://plus.unsplash.com/premium_photo-1691592871274-5d0531e7518b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',5);
/*!40000 ALTER TABLE `servicos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2024-11-13 12:49:25
