-- CreateTable
CREATE TABLE "checadores" (
    "id_checador" SERIAL NOT NULL,
    "id_usuario" INTEGER,
    "id_parada" INTEGER,

    CONSTRAINT "checadores_pkey" PRIMARY KEY ("id_checador")
);

-- CreateTable
CREATE TABLE "conductores" (
    "id_conductor" SERIAL NOT NULL,
    "id_vehiculo" INTEGER,
    "id_usuario" INTEGER,

    CONSTRAINT "conductores_pkey" PRIMARY KEY ("id_conductor")
);

-- CreateTable
CREATE TABLE "duenos" (
    "id_dueno" SERIAL NOT NULL,
    "id_vehiculo" INTEGER,
    "id_usuario" INTEGER,

    CONSTRAINT "duenos_pkey" PRIMARY KEY ("id_dueno")
);

-- CreateTable
CREATE TABLE "paradas" (
    "id_parada" SERIAL NOT NULL,
    "latitud" DECIMAL,
    "longitud" DECIMAL,
    "activo" SMALLINT,
    "nombre" VARCHAR(255),

    CONSTRAINT "paradas_pkey" PRIMARY KEY ("id_parada")
);

-- CreateTable
CREATE TABLE "pasajaeros" (
    "id_pasajero" INTEGER NOT NULL,
    "id_usuario" INTEGER,

    CONSTRAINT "pasajaeros_pkey" PRIMARY KEY ("id_pasajero")
);

-- CreateTable
CREATE TABLE "personas" (
    "id_persona" SERIAL NOT NULL,
    "nombre" VARCHAR(255),
    "apellido_pat" VARCHAR(255),
    "apellido_mat" VARCHAR(255),
    "sexo" SMALLINT,
    "fecha_nac" DATE,
    "curp" VARCHAR(255),
    "rfc" VARCHAR(255),
    "activo" SMALLINT,

    CONSTRAINT "personas_pkey" PRIMARY KEY ("id_persona")
);

-- CreateTable
CREATE TABLE "rutas" (
    "id_ruta" SERIAL NOT NULL,
    "nombre" VARCHAR(255),
    "activo" SMALLINT,

    CONSTRAINT "rutas_pkey" PRIMARY KEY ("id_ruta")
);

-- CreateTable
CREATE TABLE "rutas_paradas_ordenes" (
    "id_rutas_paradas_orden" SERIAL NOT NULL,
    "id_ruta" INTEGER,
    "id_parada" INTEGER,
    "id_vehiculo" INTEGER,
    "orden" INTEGER,
    "activo" SMALLINT,

    CONSTRAINT "rutas_paradas_ordenes_pkey" PRIMARY KEY ("id_rutas_paradas_orden")
);

-- CreateTable
CREATE TABLE "tipo_usuarios" (
    "id_tipo_usuario" SERIAL NOT NULL,
    "nombre" VARCHAR(255),
    "descripcion" VARCHAR(255),
    "activo" SMALLINT,

    CONSTRAINT "tipo_usuarios_pkey" PRIMARY KEY ("id_tipo_usuario")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id_usuario" SERIAL NOT NULL,
    "id_persona" INTEGER,
    "id_tipo_usuario" INTEGER,
    "usuario" VARCHAR(255),
    "contrasena" VARCHAR(255),
    "correo" VARCHAR(255),
    "activo" SMALLINT,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "vehiculos" (
    "id_vehiculo" SERIAL NOT NULL,
    "numero" VARCHAR(255),
    "matricula" VARCHAR(255),
    "activo" VARCHAR(255),

    CONSTRAINT "vehiculos_pkey" PRIMARY KEY ("id_vehiculo")
);

-- AddForeignKey
ALTER TABLE "checadores" ADD CONSTRAINT "fk_checador_parada" FOREIGN KEY ("id_parada") REFERENCES "paradas"("id_parada") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checadores" ADD CONSTRAINT "fk_checador_usuario" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conductores" ADD CONSTRAINT "fk_conductor_usuario" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conductores" ADD CONSTRAINT "fk_conductor_vehiculo" FOREIGN KEY ("id_vehiculo") REFERENCES "vehiculos"("id_vehiculo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "duenos" ADD CONSTRAINT "fk_dueno_usuario" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "duenos" ADD CONSTRAINT "fk_dueno_vehiculo" FOREIGN KEY ("id_vehiculo") REFERENCES "vehiculos"("id_vehiculo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pasajaeros" ADD CONSTRAINT "fk_pasajero_usuario" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rutas_paradas_ordenes" ADD CONSTRAINT "fk_rutas_paradas_parada" FOREIGN KEY ("id_parada") REFERENCES "paradas"("id_parada") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rutas_paradas_ordenes" ADD CONSTRAINT "fk_rutas_paradas_ruta" FOREIGN KEY ("id_ruta") REFERENCES "rutas"("id_ruta") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rutas_paradas_ordenes" ADD CONSTRAINT "fk_rutas_paradas_vehiculo" FOREIGN KEY ("id_vehiculo") REFERENCES "vehiculos"("id_vehiculo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "fk_usuario_persona" FOREIGN KEY ("id_persona") REFERENCES "personas"("id_persona") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "fk_usuario_tipo" FOREIGN KEY ("id_tipo_usuario") REFERENCES "tipo_usuarios"("id_tipo_usuario") ON DELETE CASCADE ON UPDATE CASCADE;
