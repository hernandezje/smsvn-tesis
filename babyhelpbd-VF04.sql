-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-12-2024 a las 15:59:54
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `babyhelpbd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alerta`
--

CREATE TABLE `alerta` (
  `idAlerta` int(11) NOT NULL,
  `Valor_Detectado` float NOT NULL,
  `Fecha_Hora` datetime NOT NULL,
  `Gravedad` enum('Leve','Moderada','Grave') NOT NULL,
  `Sensor_idSensor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alerta`
--

INSERT INTO `alerta` (`idAlerta`, `Valor_Detectado`, `Fecha_Hora`, `Gravedad`, `Sensor_idSensor`) VALUES
(4, 70, '2024-12-03 05:36:00', 'Moderada', 2),
(5, 45, '2024-12-03 07:00:00', 'Leve', 1),
(6, 20, '2024-12-05 07:30:01', 'Grave', 4),
(7, 120, '2024-12-05 10:00:01', 'Leve', 3),
(8, 15, '2024-12-07 10:00:01', 'Grave', 2),
(9, 55, '2024-12-09 10:30:01', 'Moderada', 1),
(10, 65, '2024-12-09 13:00:01', 'Leve', 3),
(11, 80, '2024-12-09 11:00:01', 'Moderada', 4),
(12, 50, '2024-12-03 12:00:00', 'Grave', 2),
(13, 40, '2024-12-04 15:30:00', 'Leve', 1),
(14, 90, '2024-12-04 16:00:00', 'Grave', 3),
(23, 40, '2024-12-12 00:35:01', 'Leve', 1),
(24, 70, '2024-12-12 09:55:00', 'Moderada', 2),
(25, 40, '2024-12-12 10:00:10', 'Moderada', 1),
(26, 42, '2024-12-12 11:00:10', 'Grave', 1),
(27, 42, '2024-12-12 12:00:10', 'Grave', 1),
(28, 42, '2024-12-12 12:00:10', 'Grave', 1),
(29, 42, '2024-12-12 12:22:10', 'Moderada', 1),
(30, 39, '2024-12-12 12:36:00', 'Leve', 2),
(31, 35, '2024-12-12 12:42:00', 'Moderada', 1),
(32, 30, '2024-12-12 12:55:00', 'Grave', 1),
(34, 30, '2024-12-12 12:58:00', 'Moderada', 1),
(35, 38, '2024-12-12 13:01:00', 'Leve', 1),
(36, 30, '2024-12-12 16:06:00', 'Moderada', 1),
(37, 30, '2024-12-12 16:10:00', 'Grave', 1),
(38, 30, '2024-12-12 16:20:00', 'Leve', 1),
(39, 30, '2024-12-12 16:25:00', 'Moderada', 1),
(40, 30, '2024-12-12 17:16:00', 'Moderada', 1),
(41, 30, '2024-12-12 17:18:00', 'Leve', 1),
(45, 30, '2024-12-12 17:36:00', 'Leve', 1),
(46, 30, '2024-12-12 18:16:00', 'Moderada', 1),
(47, 30, '2024-12-12 21:00:00', 'Grave', 1),
(48, 30, '2024-12-12 21:15:00', 'Moderada', 1),
(49, 30, '2024-12-12 21:40:00', 'Moderada', 1),
(50, 30, '2024-12-12 22:11:00', 'Moderada', 1),
(51, 15, '2024-12-12 22:16:00', 'Grave', 1),
(52, 15, '2024-12-12 22:53:00', 'Grave', 1),
(53, 15, '2024-12-12 22:58:00', 'Grave', 1),
(54, 15, '2024-12-12 23:11:00', 'Grave', 1),
(55, 15, '2024-12-12 23:13:00', 'Grave', 1),
(56, 15, '2024-12-12 23:30:00', 'Grave', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `antecedente_medico`
--

CREATE TABLE `antecedente_medico` (
  `idAntecedente_Medico` int(11) NOT NULL,
  `Adicciones` set('SI','NO') NOT NULL,
  `Descripcion_Adic` varchar(45) DEFAULT NULL,
  `Patologias` set('SI','NO') NOT NULL,
  `Descripcion_Pat` varchar(45) DEFAULT NULL,
  `Recibe_Tratamiento` set('SI','NO') NOT NULL,
  `Descripcion_Tratam` varchar(45) DEFAULT NULL,
  `Alergias` set('SI','NO') NOT NULL,
  `Descripcion_Aler` varchar(45) DEFAULT NULL,
  `Vacunas` set('SI','NO') NOT NULL,
  `Descripcion_Vac` varchar(45) DEFAULT NULL,
  `Lactante_idLactante` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `antecedente_medico`
--

INSERT INTO `antecedente_medico` (`idAntecedente_Medico`, `Adicciones`, `Descripcion_Adic`, `Patologias`, `Descripcion_Pat`, `Recibe_Tratamiento`, `Descripcion_Tratam`, `Alergias`, `Descripcion_Aler`, `Vacunas`, `Descripcion_Vac`, `Lactante_idLactante`) VALUES
(22, 'NO', '', 'NO', '', 'NO', '', 'SI', 'Alergia a la proteína de la leche de vaca', 'SI', 'Vacuna BCG, Hepatitis B, DTP, Hib, Polio, Neu', 15);

--
-- Disparadores `antecedente_medico`
--
DELIMITER $$
CREATE TRIGGER `restrict_antecedente_insert` BEFORE INSERT ON `antecedente_medico` FOR EACH ROW BEGIN
  -- Verificar si ya existe un antecedente médico relacionado con un Lactante
  IF (SELECT COUNT(*) FROM Antecedente_Medico WHERE Lactante_idLactante = NEW.Lactante_idLactante) >= 1 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Solo se permite un antecedente médico por Lactante.';
  END IF;

  -- Si existe un Lactante, asignar automáticamente su idLactante
  SET NEW.Lactante_idLactante = (
    SELECT idLactante FROM Lactante LIMIT 1
  );
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

CREATE TABLE `contacto` (
  `idContacto` int(11) NOT NULL,
  `DNI` int(11) DEFAULT NULL,
  `Nombre_Apellido` varchar(45) DEFAULT NULL,
  `Telefono` varchar(15) DEFAULT NULL,
  `Parentezco` varchar(15) DEFAULT NULL,
  `Progenitor` set('SI','NO') DEFAULT 'NO',
  `Direccion` varchar(45) DEFAULT NULL,
  `Lactante_idLactante` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contacto`
--

INSERT INTO `contacto` (`idContacto`, `DNI`, `Nombre_Apellido`, `Telefono`, `Parentezco`, `Progenitor`, `Direccion`, `Lactante_idLactante`) VALUES
(60, 36534366, 'Johana Henandez', '369852147', 'Madrina', 'NO', 'LAVALLE 550', NULL),
(64, 12345678, 'Juan Perez', '1234567890', 'Padre', 'SI', 'Calle Ficticia 123', NULL),
(65, 23456789, 'Maria Juarez de Perez', '0987654321', 'Madre', 'SI', 'Calle Ficticia 123', NULL),
(66, 34567890, 'Carlos Alberto Perez', '5678901234', 'Hermano', 'NO', 'Avenida Libertad 456', NULL),
(67, 45678901, 'Rocio Lobo', '6789012345', 'Tia', 'NO', 'Avenida Libertad 456', NULL),
(68, 56789012, 'Laura Gomez', '7890123456', 'Abuela', 'NO', 'Calle Ficticia 123', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dispositivo`
--

CREATE TABLE `dispositivo` (
  `idDispositivo` int(11) NOT NULL,
  `Estado` enum('activo','inactivo') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `dispositivo`
--

INSERT INTO `dispositivo` (`idDispositivo`, `Estado`) VALUES
(1, 'activo');

--
-- Disparadores `dispositivo`
--
DELIMITER $$
CREATE TRIGGER `restrict_dispositivo_insert` BEFORE INSERT ON `dispositivo` FOR EACH ROW BEGIN
  -- Verificar si ya existe un registro en la tabla Dispositivo
  IF (SELECT COUNT(*) FROM Dispositivo) >= 1 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Solo se permite un registro en la tabla Dispositivo.';
  END IF;

  -- Asignar automáticamente el idDispositivo al registro de Lactante (si existe)
  UPDATE Lactante SET Dispositivo_idDispositivo = NEW.idDispositivo
  WHERE idLactante IS NOT NULL;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `idHistorial` int(11) NOT NULL,
  `Fecha_Inicio` datetime NOT NULL,
  `Fecha_Fin` datetime DEFAULT NULL,
  `Estado` varchar(50) NOT NULL,
  `Alerta_idAlerta` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial`
--

INSERT INTO `historial` (`idHistorial`, `Fecha_Inicio`, `Fecha_Fin`, `Estado`, `Alerta_idAlerta`) VALUES
(8, '2024-12-01 07:15:00', '2024-12-03 05:35:00', 'Normal', NULL),
(9, '2024-12-03 05:36:00', '2024-12-03 05:41:10', 'Critico', 4),
(10, '2024-12-03 05:41:11', '2024-12-03 07:00:00', 'Normal', NULL),
(11, '2024-12-03 07:00:01', '2024-12-03 07:30:00', 'Critico', 5),
(12, '2024-12-03 07:30:01', '2024-12-05 07:30:00', 'Normal', NULL),
(13, '2024-12-05 07:30:01', '2024-12-05 08:00:00', 'Anormal', 6),
(14, '2024-12-05 08:00:01', '2024-12-05 10:00:00', 'Normal', NULL),
(15, '2024-12-05 10:00:01', '2024-12-05 10:30:00', 'Critico', 7),
(16, '2024-12-05 10:30:01', '2024-12-07 10:00:00', 'Normal', NULL),
(17, '2024-12-07 10:00:01', '2024-12-07 10:30:00', 'Critico', 8),
(18, '2024-12-07 10:30:01', '2024-12-09 10:30:00', 'Normal', NULL),
(19, '2024-12-09 10:30:01', '2024-12-09 11:00:00', 'Anormal', 9),
(20, '2024-12-09 11:00:01', '2024-12-09 13:00:00', 'Normal', NULL),
(21, '2024-12-09 13:00:01', '2024-12-09 13:30:00', 'Critico', 10),
(22, '2024-12-09 13:30:01', '2024-12-11 13:00:00', 'Normal', NULL),
(23, '2024-12-11 13:30:01', '2024-12-11 14:29:59', 'Normal', NULL),
(24, '2024-12-11 14:30:00', '2024-12-11 15:00:00', 'Anormal', 15),
(25, '2024-12-12 08:00:00', '2024-12-12 08:59:59', 'Normal', NULL),
(26, '2024-12-12 09:00:00', '2024-12-12 10:00:00', 'Critico', 16),
(27, '2024-12-12 10:00:01', '2024-12-13 07:14:59', 'Normal', NULL),
(28, '2024-12-13 07:15:00', '2024-12-13 07:45:00', 'Critico', 17),
(29, '2024-12-13 07:45:01', '2024-12-13 17:59:59', 'Normal', NULL),
(30, '2024-12-13 18:00:00', '2024-12-13 18:30:00', 'Critico', 18),
(31, '2024-12-13 18:30:01', '2024-12-14 10:59:59', 'Normal', NULL),
(32, '2024-12-14 11:00:00', '2024-12-14 12:00:00', 'Anormal', 19),
(33, '2024-12-14 12:00:01', '2024-12-14 19:59:59', 'Normal', NULL),
(34, '2024-12-14 20:00:00', '2024-12-14 20:30:00', 'Critico', 20),
(35, '2024-12-14 20:30:01', '2024-12-15 07:59:59', 'Normal', NULL),
(36, '2024-12-15 08:00:00', '2024-12-15 08:30:00', 'Critico', 21);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lactante`
--

CREATE TABLE `lactante` (
  `idLactante` int(11) NOT NULL,
  `DNI` int(11) NOT NULL,
  `Nombre_Apellido` varchar(45) NOT NULL,
  `Sexo` set('MUJER','VARON') NOT NULL,
  `Fecha_Nac` datetime NOT NULL,
  `Peso` double NOT NULL,
  `Altura` double NOT NULL,
  `Grupo_Sanguineo` varchar(15) NOT NULL,
  `Condicion_Nac` varchar(45) NOT NULL,
  `Dispositivo_idDispositivo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `lactante`
--

INSERT INTO `lactante` (`idLactante`, `DNI`, `Nombre_Apellido`, `Sexo`, `Fecha_Nac`, `Peso`, `Altura`, `Grupo_Sanguineo`, `Condicion_Nac`, `Dispositivo_idDispositivo`) VALUES
(15, 36985234, 'MARCOS ANGEL HERNANDEZ', 'VARON', '2024-12-04 05:02:00', 3.1, 35, 'A+', 'PARTO NORMAL SIN COMPLICACIONES A TERMINO', 1);

--
-- Disparadores `lactante`
--
DELIMITER $$
CREATE TRIGGER `restrict_lactante_insert` BEFORE INSERT ON `lactante` FOR EACH ROW BEGIN
  -- Verificar si ya existe un registro en la tabla Lactante
  IF (SELECT COUNT(*) FROM Lactante) >= 1 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Solo se permite un registro en la tabla Lactante.';
  END IF;

  -- Si existe un dispositivo, asignar automáticamente su idDispositivo
  SET NEW.Dispositivo_idDispositivo = (
    SELECT idDispositivo FROM Dispositivo LIMIT 1
  );
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sensor`
--

CREATE TABLE `sensor` (
  `idSensor` int(11) NOT NULL,
  `Tipo_Sensor` varchar(45) NOT NULL,
  `Modelo` varchar(45) DEFAULT NULL,
  `Rango_Medicion` varchar(45) DEFAULT NULL,
  `Estado` enum('activo','inactivo') NOT NULL,
  `Dispositivo_idDispositivo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sensor`
--

INSERT INTO `sensor` (`idSensor`, `Tipo_Sensor`, `Modelo`, `Rango_Medicion`, `Estado`, `Dispositivo_idDispositivo`) VALUES
(1, 'Temperatura', 'Modelo_TemperatureX', '35.0°C - 42.0°C', 'activo', 1),
(2, 'Frec. Resp.', 'Modelo_FrecRespX', '20 - 40 resp/min', 'activo', 1),
(3, 'Humedad', 'DHT22 (AM2302)', '0% a 100% RH', 'activo', 1),
(4, 'ITH', 'DHT11 / AM2302', '15 - 80 ', 'activo', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `signos_vitales`
--

CREATE TABLE `signos_vitales` (
  `idSignos_Vitales` int(11) NOT NULL,
  `Fecha_Hora` datetime NOT NULL,
  `Medicion` decimal(5,2) DEFAULT NULL,
  `Estado` enum('Normal','Anormal','Crítico') NOT NULL,
  `Sensor_idSensor` int(11) NOT NULL,
  `Historial_idHistorial` int(11) DEFAULT NULL,
  `Lactante_idLactante` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `signos_vitales`
--

INSERT INTO `signos_vitales` (`idSignos_Vitales`, `Fecha_Hora`, `Medicion`, `Estado`, `Sensor_idSensor`, `Historial_idHistorial`, `Lactante_idLactante`) VALUES
(1, '2024-12-03 07:30:01', 38.00, 'Normal', 1, 12, 15),
(2, '2024-12-03 07:32:15', 37.00, 'Normal', 2, 12, 15),
(3, '2024-12-03 07:34:12', 38.00, 'Normal', 3, 12, 15),
(4, '2024-12-03 07:36:07', 37.00, 'Normal', 4, 12, 15),
(5, '2024-12-03 07:38:55', 38.00, 'Normal', 1, 12, 15),
(6, '2024-12-03 07:40:01', 37.00, 'Normal', 2, 12, 15),
(7, '2024-12-03 07:42:11', 38.00, 'Normal', 3, 12, 15),
(8, '2024-12-03 07:44:21', 37.00, 'Normal', 4, 12, 15),
(9, '2024-12-03 07:46:25', 38.00, 'Normal', 1, 12, 15),
(10, '2024-12-03 07:48:08', 37.00, 'Normal', 2, 12, 15),
(11, '2024-12-03 07:50:23', 38.00, 'Normal', 3, 12, 15),
(12, '2024-12-03 07:52:12', 37.00, 'Normal', 4, 12, 15),
(13, '2024-12-03 07:54:36', 38.00, 'Normal', 1, 12, 15),
(14, '2024-12-03 07:56:45', 37.00, 'Normal', 2, 12, 15),
(15, '2024-12-03 07:58:25', 38.00, 'Normal', 3, 12, 15),
(16, '2024-12-03 08:00:32', 37.00, 'Normal', 4, 12, 15),
(17, '2024-12-03 08:02:18', 38.00, 'Normal', 1, 12, 15),
(18, '2024-12-03 08:04:14', 37.00, 'Normal', 2, 12, 15),
(19, '2024-12-03 08:06:25', 38.00, 'Normal', 3, 12, 15),
(20, '2024-12-03 08:08:36', 37.00, 'Normal', 4, 12, 15),
(21, '2024-12-03 08:10:52', 38.00, 'Normal', 1, 12, 15),
(22, '2024-12-03 08:12:41', 37.00, 'Normal', 2, 12, 15),
(23, '2024-12-03 08:14:47', 38.00, 'Normal', 3, 12, 15),
(24, '2024-12-03 08:16:12', 37.00, 'Normal', 4, 12, 15),
(25, '2024-12-03 08:18:14', 38.00, 'Normal', 1, 12, 15),
(26, '2024-12-03 08:20:05', 37.00, 'Normal', 1, 12, 15),
(27, '2024-12-03 08:22:09', 38.00, 'Normal', 2, 12, 15),
(28, '2024-12-03 08:24:14', 37.00, 'Normal', 3, 12, 15),
(29, '2024-12-03 08:26:00', 38.00, 'Normal', 4, 12, 15),
(30, '2024-12-03 08:28:05', 37.00, 'Normal', 1, 12, 15),
(31, '2024-12-03 08:30:14', 38.00, 'Normal', 2, 12, 15),
(32, '2024-12-03 08:32:45', 37.00, 'Normal', 3, 12, 15),
(33, '2024-12-03 08:34:25', 38.00, 'Normal', 4, 12, 15),
(34, '2024-12-03 08:36:36', 37.00, 'Normal', 1, 12, 15),
(35, '2024-12-03 08:38:18', 38.00, 'Normal', 2, 12, 15),
(36, '2024-12-03 08:40:01', 37.00, 'Normal', 3, 12, 15),
(37, '2024-12-03 08:42:04', 38.00, 'Normal', 4, 12, 15),
(38, '2024-12-03 08:44:25', 37.00, 'Normal', 1, 12, 15),
(39, '2024-12-03 08:46:36', 38.00, 'Normal', 2, 12, 15),
(40, '2024-12-03 08:48:25', 37.00, 'Normal', 3, 12, 15),
(41, '2024-12-03 08:50:58', 38.00, 'Normal', 4, 12, 15),
(42, '2024-12-03 08:52:00', 37.00, 'Normal', 1, 12, 15),
(43, '2024-12-03 08:54:14', 38.00, 'Normal', 2, 12, 15),
(44, '2024-12-03 08:56:25', 37.00, 'Normal', 3, 12, 15),
(45, '2024-12-03 08:58:36', 38.00, 'Normal', 4, 12, 15),
(46, '2024-12-03 09:00:38', 37.00, 'Normal', 1, 12, 15),
(47, '2024-12-03 09:02:19', 38.00, 'Normal', 2, 12, 15),
(48, '2024-12-03 09:04:01', 37.00, 'Normal', 3, 12, 15),
(49, '2024-12-03 09:06:05', 38.00, 'Normal', 4, 12, 15),
(50, '2024-12-03 09:08:07', 37.00, 'Normal', 1, 12, 15),
(51, '2024-12-03 09:10:23', 38.00, 'Normal', 1, 12, 15),
(52, '2024-12-03 09:12:28', 37.00, 'Normal', 2, 12, 15),
(53, '2024-12-03 09:14:15', 38.00, 'Normal', 3, 12, 15),
(54, '2024-12-03 09:16:42', 37.00, 'Normal', 4, 12, 15),
(55, '2024-12-03 09:18:45', 38.00, 'Normal', 1, 12, 15),
(56, '2024-12-03 09:20:26', 37.00, 'Normal', 2, 12, 15),
(57, '2024-12-03 09:22:58', 38.00, 'Normal', 3, 12, 15),
(58, '2024-12-03 09:24:25', 37.00, 'Normal', 4, 12, 15),
(59, '2024-12-03 09:26:26', 38.00, 'Normal', 1, 12, 15),
(60, '2024-12-03 09:28:36', 37.00, 'Normal', 2, 12, 15),
(61, '2024-12-03 09:30:24', 38.00, 'Normal', 3, 12, 15),
(62, '2024-12-03 09:32:02', 37.00, 'Normal', 4, 12, 15),
(63, '2024-12-03 09:34:00', 38.00, 'Normal', 1, 12, 15),
(64, '2024-12-03 09:36:01', 37.00, 'Normal', 2, 12, 15),
(65, '2024-12-03 09:38:54', 38.00, 'Normal', 3, 12, 15),
(66, '2024-12-03 09:40:46', 37.00, 'Normal', 4, 12, 15),
(67, '2024-12-03 09:42:44', 38.00, 'Normal', 1, 12, 15),
(68, '2024-12-03 09:44:41', 37.00, 'Normal', 2, 12, 15),
(69, '2024-12-03 09:46:25', 38.00, 'Normal', 3, 12, 15),
(70, '2024-12-03 09:48:19', 37.00, 'Normal', 4, 12, 15),
(71, '2024-12-03 09:50:26', 38.00, 'Normal', 1, 12, 15),
(72, '2024-12-03 09:52:24', 37.00, 'Normal', 2, 12, 15),
(73, '2024-12-03 09:54:26', 38.00, 'Normal', 3, 12, 15),
(74, '2024-12-03 09:56:36', 37.00, 'Normal', 4, 12, 15),
(75, '2024-12-03 09:58:02', 38.00, 'Normal', 1, 12, 15),
(76, '2024-12-03 10:00:12', 37.00, 'Normal', 1, 12, 15),
(77, '2024-12-03 10:02:25', 38.00, 'Normal', 2, 12, 15),
(78, '2024-12-03 10:04:14', 37.00, 'Normal', 1, 12, 15),
(79, '2024-12-03 10:06:36', 38.00, 'Normal', 1, 12, 15),
(80, '2024-12-03 10:08:24', 37.00, 'Normal', 1, 12, 15),
(81, '2024-12-03 10:10:20', 38.00, 'Normal', 2, 12, 15),
(82, '2024-12-03 10:12:30', 37.00, 'Normal', 1, 12, 15),
(83, '2024-12-03 10:14:24', 38.00, 'Normal', 1, 12, 15),
(84, '2024-12-03 10:16:28', 37.00, 'Normal', 1, 12, 15),
(85, '2024-12-03 10:18:47', 38.00, 'Normal', 2, 12, 15),
(86, '2024-12-03 10:20:51', 37.00, 'Normal', 1, 12, 15),
(87, '2024-12-03 10:22:03', 38.00, 'Normal', 1, 12, 15),
(88, '2024-12-03 10:24:08', 37.00, 'Normal', 1, 12, 15),
(89, '2024-12-03 10:26:45', 38.00, 'Normal', 2, 12, 15),
(90, '2024-12-03 10:28:13', 37.00, 'Normal', 1, 12, 15),
(91, '2024-12-03 10:30:25', 38.00, 'Normal', 1, 12, 15),
(92, '2024-12-03 10:32:14', 37.00, 'Normal', 1, 12, 15),
(93, '2024-12-03 10:34:34', 38.00, 'Normal', 2, 12, 15),
(94, '2024-12-03 10:36:12', 37.00, 'Normal', 1, 12, 15),
(95, '2024-12-03 10:38:03', 38.00, 'Normal', 1, 12, 15),
(96, '2024-12-03 10:40:28', 37.00, 'Normal', 1, 12, 15),
(97, '2024-12-03 10:42:44', 38.00, 'Normal', 2, 12, 15),
(98, '2024-12-03 10:44:14', 37.00, 'Normal', 1, 12, 15),
(99, '2024-12-03 10:46:00', 38.00, 'Normal', 1, 12, 15),
(100, '2024-12-03 10:48:01', 37.00, 'Normal', 1, 12, 15),
(101, '2024-12-03 10:50:25', 38.00, 'Normal', 1, 12, 15),
(102, '2024-12-03 10:52:14', 37.00, 'Normal', 2, 12, 15),
(103, '2024-12-03 10:54:45', 38.00, 'Normal', 3, 12, 15),
(104, '2024-12-03 10:56:18', 37.00, 'Normal', 4, 12, 15),
(105, '2024-12-03 10:58:32', 38.00, 'Normal', 1, 12, 15),
(106, '2024-12-03 11:00:44', 37.00, 'Normal', 2, 12, 15),
(107, '2024-12-03 11:02:01', 38.00, 'Normal', 3, 12, 15),
(108, '2024-12-03 11:04:15', 37.00, 'Normal', 4, 12, 15),
(109, '2024-12-03 11:06:29', 38.00, 'Normal', 1, 12, 15),
(110, '2024-12-03 11:08:07', 37.00, 'Normal', 2, 12, 15),
(111, '2024-12-03 11:10:14', 38.00, 'Normal', 3, 12, 15),
(112, '2024-12-03 11:12:45', 37.00, 'Normal', 4, 12, 15),
(113, '2024-12-03 11:14:12', 38.00, 'Normal', 1, 12, 15),
(114, '2024-12-03 11:16:25', 37.00, 'Normal', 2, 12, 15),
(115, '2024-12-03 11:18:36', 38.00, 'Normal', 3, 12, 15),
(116, '2024-12-03 11:20:16', 37.00, 'Normal', 4, 12, 15),
(117, '2024-12-03 11:22:24', 38.00, 'Normal', 1, 12, 15),
(118, '2024-12-03 11:24:03', 37.00, 'Normal', 2, 12, 15),
(119, '2024-12-03 11:26:24', 38.00, 'Normal', 3, 12, 15),
(120, '2024-12-03 08:20:01', 37.00, 'Normal', 4, 12, 15),
(121, '2024-12-03 11:32:01', 37.00, 'Crítico', 1, 12, 15),
(122, '2024-12-03 11:34:01', 38.00, 'Normal', 2, 12, 15),
(123, '2024-12-03 11:36:01', 37.00, 'Normal', 3, 12, 15),
(124, '2024-12-03 11:38:01', 39.00, 'Anormal', 1, 12, 15),
(125, '2024-12-03 11:40:01', 37.00, 'Normal', 1, 12, 15),
(126, '2024-12-03 11:42:01', 38.00, 'Anormal', 1, 12, 15),
(127, '2024-12-03 11:44:01', 37.00, 'Normal', 1, 12, 15),
(128, '2024-12-03 11:46:01', 38.00, 'Crítico', 1, 12, 15),
(129, '2024-12-03 11:50:01', 39.00, 'Normal', 2, 12, 15),
(130, '2024-12-03 11:52:01', 39.00, 'Normal', 3, 12, 15),
(131, '2024-12-03 11:54:01', 39.00, 'Anormal', 4, 12, 15),
(132, '2024-12-03 11:56:01', 39.00, 'Normal', 1, 12, 15),
(133, '2024-12-03 11:58:01', 36.80, 'Normal', 1, 12, 15),
(134, '2024-12-03 12:00:01', 72.00, 'Normal', 2, 12, 15),
(135, '2024-12-03 12:02:01', 95.00, 'Anormal', 3, 12, 15),
(136, '2024-12-03 12:04:01', 10.00, 'Crítico', 4, 12, 15),
(137, '2024-12-12 12:14:01', 38.00, 'Normal', 1, 12, 15),
(138, '2024-12-12 13:00:01', 38.00, 'Normal', 2, NULL, 15);

--
-- Disparadores `signos_vitales`
--
DELIMITER $$
CREATE TRIGGER `Trigger_Cambio_Estado_UPDATE` AFTER UPDATE ON `signos_vitales` FOR EACH ROW BEGIN
    DECLARE ultimoEstado VARCHAR(50);
    DECLARE idHistorialAnterior INT;
    DECLARE idNuevaAlerta INT;

    -- Obtener el último estado registrado en Historial para este signo vital
    SELECT Estado, idHistorial
    INTO ultimoEstado, idHistorialAnterior
    FROM Historial
    WHERE idHistorial = NEW.Historial_idHistorial
    LIMIT 1;

    -- Caso 1: Si el estado cambió
    IF ultimoEstado IS NULL OR ultimoEstado != NEW.Estado THEN
        -- Cerrar el estado anterior en Historial
        UPDATE Historial
        SET Fecha_Fin = NOW()
        WHERE idHistorial = idHistorialAnterior;

        -- Si el nuevo estado es "Crítico", buscar una alerta asociada
        IF NEW.Estado = 'Crítico' THEN
            SELECT idAlerta
            INTO idNuevaAlerta
            FROM Alerta
            WHERE Sensor_idSensor = NEW.Sensor_idSensor
              AND Fecha_Hora BETWEEN NOW() - INTERVAL 1 HOUR AND NOW()
            LIMIT 1;
        ELSE
            SET idNuevaAlerta = NULL;
        END IF;

        -- Insertar el nuevo estado en Historial
        INSERT INTO Historial (Estado, Fecha_Inicio, Fecha_Fin, Alerta_idAlerta)
        VALUES (NEW.Estado, NOW(), NULL, idNuevaAlerta);

        -- Actualizar Signos_Vitales con el nuevo Historial_idHistorial
        UPDATE Signos_Vitales
        SET Historial_idHistorial = LAST_INSERT_ID()
        WHERE idSignos_Vitales = NEW.idSignos_Vitales;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `Usuario` varchar(45) NOT NULL,
  `Clave` varchar(100) NOT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `Contacto_idContacto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `Usuario`, `Clave`, `Email`, `Contacto_idContacto`) VALUES
(43, 'joha', '$2b$10$5MLhK9Pyg/fj4ah7WnF72Oq4cOgxSpVcWJkCK3SP3iJnKdsR3k7IK', 'joha@gmail.com', 60),
(47, 'juanperez', '$2b$10$sWeOlGsaLT/Pcyq/M9IsP.REpN1HuIJOhFjvE6zzbdD.ckyplVzgy', 'juan.perez@email.com', 64),
(48, 'mariaperez', '$2b$10$fFb2gcQwFEQkL/9Ctqf4bOrLC0r6K4VpaChSdelfYjnpoEAzTusZq', 'maria.perez@email.com', 65),
(49, 'carloslopez', '$2b$10$lJFYfUBN57vNzsapNMK4deRmoSdnx/70MCfkLikns7p3PLtKALGAa', 'carlos.lopez@email.com', 66),
(50, 'analopez', '$2b$10$MX/D5T1xCOIpg7gMoyK42e40DFAQUlbA/5Zic9MxUDF7obY5gbkea', 'ana.lopez@email.com', 67),
(51, 'lauragomez', '$2b$10$ffxmnmmvvOtNqMErPf6KFuRp1JuJrNPXE7gLsKUWsPe8913DdfLdO', 'laura.gomez@email.com', 68);

--
-- Disparadores `usuario`
--
DELIMITER $$
CREATE TRIGGER `after_usuario_delete` AFTER DELETE ON `usuario` FOR EACH ROW BEGIN
  -- Verificar si el idContacto existe en el registro eliminado
  IF OLD.Contacto_idContacto IS NOT NULL THEN
    -- Eliminar el contacto relacionado
    DELETE FROM Contacto WHERE idContacto = OLD.Contacto_idContacto;
  END IF;
END
$$
DELIMITER ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alerta`
--
ALTER TABLE `alerta`
  ADD PRIMARY KEY (`idAlerta`),
  ADD UNIQUE KEY `idAlerta_UNIQUE` (`idAlerta`),
  ADD KEY `fk_Alerta_Sensor1_idx` (`Sensor_idSensor`),
  ADD KEY `idAlerta` (`idAlerta`);

--
-- Indices de la tabla `antecedente_medico`
--
ALTER TABLE `antecedente_medico`
  ADD PRIMARY KEY (`idAntecedente_Medico`),
  ADD UNIQUE KEY `idAntecedente_Medico_UNIQUE` (`idAntecedente_Medico`),
  ADD KEY `fk_Antecedente_Medico_Lactante` (`Lactante_idLactante`);

--
-- Indices de la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`idContacto`),
  ADD UNIQUE KEY `idContacto_UNIQUE` (`idContacto`),
  ADD KEY `fk_Contacto_Progenitor1_idx` (`Lactante_idLactante`);

--
-- Indices de la tabla `dispositivo`
--
ALTER TABLE `dispositivo`
  ADD PRIMARY KEY (`idDispositivo`),
  ADD UNIQUE KEY `idDispositivo_UNIQUE` (`idDispositivo`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`idHistorial`),
  ADD UNIQUE KEY `idHistorial_UNIQUE` (`idHistorial`),
  ADD KEY `fk_Historial_Alerta1_idx` (`Alerta_idAlerta`) USING BTREE;

--
-- Indices de la tabla `lactante`
--
ALTER TABLE `lactante`
  ADD PRIMARY KEY (`idLactante`),
  ADD UNIQUE KEY `DNI_UNIQUE` (`DNI`),
  ADD UNIQUE KEY `idLactante_UNIQUE` (`idLactante`),
  ADD KEY `fk_Lactante_Dispositivo1_idx` (`Dispositivo_idDispositivo`);

--
-- Indices de la tabla `sensor`
--
ALTER TABLE `sensor`
  ADD PRIMARY KEY (`idSensor`),
  ADD UNIQUE KEY `idSensor_UNIQUE` (`idSensor`),
  ADD KEY `fk_Sensor_Dispositivo1_idx` (`Dispositivo_idDispositivo`);

--
-- Indices de la tabla `signos_vitales`
--
ALTER TABLE `signos_vitales`
  ADD PRIMARY KEY (`idSignos_Vitales`),
  ADD UNIQUE KEY `idSignos_Vitales_UNIQUE` (`idSignos_Vitales`),
  ADD KEY `Sensor_idSensor` (`Sensor_idSensor`),
  ADD KEY `fk_Signos_Vitales_Historial1_idx` (`Historial_idHistorial`),
  ADD KEY `fk_Signos_Vitales_Lactante1_idx` (`Lactante_idLactante`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `Clave_UNIQUE` (`Clave`),
  ADD UNIQUE KEY `Usuario_UNIQUE` (`Usuario`),
  ADD UNIQUE KEY `idUsuario_UNIQUE` (`idUsuario`),
  ADD UNIQUE KEY `Email_UNIQUE` (`Email`),
  ADD KEY `fk_Usuario_Contacto1_idx` (`Contacto_idContacto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alerta`
--
ALTER TABLE `alerta`
  MODIFY `idAlerta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT de la tabla `antecedente_medico`
--
ALTER TABLE `antecedente_medico`
  MODIFY `idAntecedente_Medico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `contacto`
--
ALTER TABLE `contacto`
  MODIFY `idContacto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT de la tabla `dispositivo`
--
ALTER TABLE `dispositivo`
  MODIFY `idDispositivo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `idHistorial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `lactante`
--
ALTER TABLE `lactante`
  MODIFY `idLactante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `sensor`
--
ALTER TABLE `sensor`
  MODIFY `idSensor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `signos_vitales`
--
ALTER TABLE `signos_vitales`
  MODIFY `idSignos_Vitales` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alerta`
--
ALTER TABLE `alerta`
  ADD CONSTRAINT `fk_Alerta_Sensor` FOREIGN KEY (`Sensor_idSensor`) REFERENCES `sensor` (`idSensor`);

--
-- Filtros para la tabla `antecedente_medico`
--
ALTER TABLE `antecedente_medico`
  ADD CONSTRAINT `fk_Antecedente_Medico_Lactante` FOREIGN KEY (`Lactante_idLactante`) REFERENCES `lactante` (`idLactante`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD CONSTRAINT `fk_Contacto_Progenitor` FOREIGN KEY (`Lactante_idLactante`) REFERENCES `progenitor` (`idProgenitor`);

--
-- Filtros para la tabla `lactante`
--
ALTER TABLE `lactante`
  ADD CONSTRAINT `fk_Lactante_Dispositivo1` FOREIGN KEY (`Dispositivo_idDispositivo`) REFERENCES `dispositivo` (`idDispositivo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `sensor`
--
ALTER TABLE `sensor`
  ADD CONSTRAINT `fk_Sensor_Dispositivo1` FOREIGN KEY (`Dispositivo_idDispositivo`) REFERENCES `dispositivo` (`idDispositivo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `signos_vitales`
--
ALTER TABLE `signos_vitales`
  ADD CONSTRAINT `fk_Signos_Vitales_Historial` FOREIGN KEY (`Historial_idHistorial`) REFERENCES `historial` (`idHistorial`),
  ADD CONSTRAINT `fk_Signos_Vitales_Lactante` FOREIGN KEY (`Lactante_idLactante`) REFERENCES `lactante` (`idLactante`),
  ADD CONSTRAINT `fk_Signos_Vitales_Sensor` FOREIGN KEY (`Sensor_idSensor`) REFERENCES `sensor` (`idSensor`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_Usuario_Contacto` FOREIGN KEY (`Contacto_idContacto`) REFERENCES `contacto` (`idContacto`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
