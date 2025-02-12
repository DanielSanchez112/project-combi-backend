CREATE TABLE checadores (
   id_checador SERIAL PRIMARY KEY,
   id_usuario INT NULL,
   id_parada INT NULL
);

CREATE TABLE conductores (
   id_conductor SERIAL PRIMARY KEY,
   id_vehiculo INT NULL,
   id_usuario INT NULL
);

CREATE TABLE duenos (
   id_dueno SERIAL PRIMARY KEY,
   id_vehiculo INT NULL,
   id_usuario INT NULL
);

CREATE TABLE paradas (
   id_parada SERIAL PRIMARY KEY,
   latitud DECIMAL NULL,
   longitud DECIMAL NULL,
   activo SMALLINT NULL,
   nombre VARCHAR(255) NULL
);

CREATE TABLE pasajaeros (
   id_pasajero INT PRIMARY KEY,
   id_usuario INT NULL
);

CREATE TABLE personas (
   id_persona SERIAL PRIMARY KEY,
   nombre VARCHAR(255) NULL,
   apellido_pat VARCHAR(255) NULL,
   apellido_mat VARCHAR(255) NULL,
   sexo SMALLINT NULL,
   fecha_nac DATE NULL,
   curp VARCHAR(255) NULL,
   rfc VARCHAR(255) NULL,
   activo SMALLINT NULL
);

CREATE TABLE rutas (
   id_ruta SERIAL PRIMARY KEY,
   nombre VARCHAR(255) NULL,
   activo SMALLINT NULL
);

CREATE TABLE rutas_paradas_ordenes (
   id_rutas_paradas_orden SERIAL PRIMARY KEY,
   id_ruta INT NULL,
   id_parada INT NULL,
   id_vehiculo INT NULL,
   orden INT NULL,
   activo SMALLINT NULL
);

CREATE TABLE tipo_usuarios (
   id_tipo_usuario SERIAL PRIMARY KEY,
   nombre VARCHAR(255) NULL,
   descripcion VARCHAR(255) NULL,
   activo SMALLINT NULL
);

CREATE TABLE usuarios (
   id_usuario SERIAL PRIMARY KEY,
   id_persona INT NULL,
   id_tipo_usuario INT NULL,
   usuario VARCHAR(255) NULL,
   contrasena VARCHAR(255) NULL,
   correo VARCHAR(255) NULL,
   activo SMALLINT NULL
);

CREATE TABLE vehiculos (
   id_vehiculo SERIAL PRIMARY KEY,
   numero VARCHAR(255) NULL,
   matricula VARCHAR(255) NULL,
   activo VARCHAR(255) NULL
);

-- Agregar claves foráneas con CASCADE
ALTER TABLE checadores ADD CONSTRAINT fk_checador_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE checadores ADD CONSTRAINT fk_checador_parada FOREIGN KEY (id_parada) REFERENCES paradas (id_parada) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE conductores ADD CONSTRAINT fk_conductor_vehiculo FOREIGN KEY (id_vehiculo) REFERENCES vehiculos (id_vehiculo) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE conductores ADD CONSTRAINT fk_conductor_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE duenos ADD CONSTRAINT fk_dueno_vehiculo FOREIGN KEY (id_vehiculo) REFERENCES vehiculos (id_vehiculo) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE duenos ADD CONSTRAINT fk_dueno_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE pasajaeros ADD CONSTRAINT fk_pasajero_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE rutas_paradas_ordenes ADD CONSTRAINT fk_rutas_paradas_vehiculo FOREIGN KEY (id_vehiculo) REFERENCES vehiculos (id_vehiculo) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE rutas_paradas_ordenes ADD CONSTRAINT fk_rutas_paradas_ruta FOREIGN KEY (id_ruta) REFERENCES rutas (id_ruta) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE rutas_paradas_ordenes ADD CONSTRAINT fk_rutas_paradas_parada FOREIGN KEY (id_parada) REFERENCES paradas (id_parada) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE usuarios ADD CONSTRAINT fk_usuario_persona FOREIGN KEY (id_persona) REFERENCES personas (id_persona) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE usuarios ADD CONSTRAINT fk_usuario_tipo FOREIGN KEY (id_tipo_usuario) REFERENCES tipo_usuarios (id_tipo_usuario) ON UPDATE CASCADE ON DELETE CASCADE;
