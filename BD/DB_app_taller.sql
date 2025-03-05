-- PostgreSQL Database Schema
-- Created on: 04/03/2025 10:44:59 p. m.

-- Drop existing tables and constraints if they exist
DROP TABLE IF EXISTS CHECADORES CASCADE;
DROP TABLE IF EXISTS CONDUCTOR CASCADE;
DROP TABLE IF EXISTS DUENOS CASCADE;
DROP TABLE IF EXISTS PARADAS CASCADE;
DROP TABLE IF EXISTS PERSONAS CASCADE;
DROP TABLE IF EXISTS RUTAS CASCADE;
DROP TABLE IF EXISTS RUTAS_PARADAS_ORDEN CASCADE;
DROP TABLE IF EXISTS TIPO_USUARIO CASCADE;
DROP TABLE IF EXISTS USUARIOS CASCADE;
DROP TABLE IF EXISTS VEHICULOS CASCADE;

-- Create PERSONAS table
CREATE TABLE PERSONAS (
   ID_PERSONA SERIAL PRIMARY KEY,
   NOMBRE VARCHAR(255),
   APELLIDO_PAT VARCHAR(255),
   APELLIDO_MAT VARCHAR(255),
   SEXO SMALLINT,
   FECHA_NAC DATE,
   CURP VARCHAR(255),
   RFC VARCHAR(255)
);

-- Create TIPO_USUARIO table
CREATE TABLE TIPO_USUARIO (
   ID_TIPO_USUARIO SERIAL PRIMARY KEY,
   NOMBRE VARCHAR(255),
   DESCRIPCION VARCHAR(255)
);

-- Create USUARIOS table
CREATE TABLE USUARIOS (
   ID_USUARIO SERIAL PRIMARY KEY,
   ID_PERSONA INT,
   ID_TIPO_USUARIO INT,
   USUARIO VARCHAR(255),
   CONTRASENA VARCHAR(255),
   CORREO VARCHAR(255),
   ACTIVO SMALLINT,
   CONSTRAINT FK_USUARIOS_PERSONAS FOREIGN KEY (ID_PERSONA) 
      REFERENCES PERSONAS (ID_PERSONA),
   CONSTRAINT FK_USUARIOS_TIPO_USUARIO FOREIGN KEY (ID_TIPO_USUARIO) 
      REFERENCES TIPO_USUARIO (ID_TIPO_USUARIO)
);

-- Create PARADAS table
CREATE TABLE PARADAS (
   ID_PARADA SERIAL PRIMARY KEY,
   LATITUD DECIMAL,
   LONGITUD DECIMAL,
   ACTIVO SMALLINT,
   NOMBRE VARCHAR(255)
);

-- Create DUENOS table
CREATE TABLE DUENOS (
   ID_DUENO SERIAL PRIMARY KEY,
   ID_USUARIO INT,
   CONSTRAINT FK_DUENOS_USUARIOS FOREIGN KEY (ID_USUARIO) 
      REFERENCES USUARIOS (ID_USUARIO)
);

-- Create VEHICULOS table
CREATE TABLE VEHICULOS (
   ID_VEHICULOS SERIAL PRIMARY KEY,
   ID_DUENO INT,
   NUMERO VARCHAR(255),
   MATRICULA VARCHAR(255),
   ACTIVO VARCHAR(255),
   CONSTRAINT FK_VEHICULOS_DUENOS FOREIGN KEY (ID_DUENO) 
      REFERENCES DUENOS (ID_DUENO)
);

-- Create RUTAS table
CREATE TABLE RUTAS (
   ID_RUTA SERIAL PRIMARY KEY,
   NOMBRE VARCHAR(255),
   ACTIVO SMALLINT
);

-- Create RUTAS_PARADAS_ORDEN table
CREATE TABLE RUTAS_PARADAS_ORDEN (
   ID_ORDEN SERIAL PRIMARY KEY,
   ID_RUTA INT,
   ID_PARADA INT,
   ID_VEHICULOS INT,
   ORDEN INT,
   ACTIVO SMALLINT,
   CONSTRAINT FK_RUTAS_PARADAS_ORDEN_RUTAS FOREIGN KEY (ID_RUTA) 
      REFERENCES RUTAS (ID_RUTA),
   CONSTRAINT FK_RUTAS_PARADAS_ORDEN_PARADAS FOREIGN KEY (ID_PARADA) 
      REFERENCES PARADAS (ID_PARADA),
   CONSTRAINT FK_RUTAS_PARADAS_ORDEN_VEHICULOS FOREIGN KEY (ID_VEHICULOS) 
      REFERENCES VEHICULOS (ID_VEHICULOS)
);

-- Create CONDUCTOR table
CREATE TABLE CONDUCTOR (
   ID_CONDUCTOR SERIAL PRIMARY KEY,
   ID_VEHICULOS INT,
   ID_USUARIO INT,
   CONSTRAINT FK_CONDUCTOR_VEHICULOS FOREIGN KEY (ID_VEHICULOS) 
      REFERENCES VEHICULOS (ID_VEHICULOS),
   CONSTRAINT FK_CONDUCTOR_USUARIOS FOREIGN KEY (ID_USUARIO) 
      REFERENCES USUARIOS (ID_USUARIO)
);

-- Create CHECADORES table
CREATE TABLE CHECADORES (
   ID_CHECADOR SERIAL PRIMARY KEY,
   ID_USUARIO INT,
   ID_PARADA INT,
   CONSTRAINT FK_CHECADORES_USUARIOS FOREIGN KEY (ID_USUARIO) 
      REFERENCES USUARIOS (ID_USUARIO),
   CONSTRAINT FK_CHECADORES_PARADAS FOREIGN KEY (ID_PARADA) 
      REFERENCES PARADAS (ID_PARADA)
);