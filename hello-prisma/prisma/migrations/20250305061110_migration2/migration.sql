/*
  Warnings:

  - You are about to drop the column `id_vehiculo` on the `duenos` table. All the data in the column will be lost.
  - You are about to drop the column `activo` on the `personas` table. All the data in the column will be lost.
  - You are about to drop the column `activo` on the `tipo_usuarios` table. All the data in the column will be lost.
  - The primary key for the `vehiculos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_vehiculo` on the `vehiculos` table. All the data in the column will be lost.
  - You are about to drop the `conductores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pasajaeros` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rutas_paradas_ordenes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "checadores" DROP CONSTRAINT "fk_checador_parada";

-- DropForeignKey
ALTER TABLE "checadores" DROP CONSTRAINT "fk_checador_usuario";

-- DropForeignKey
ALTER TABLE "conductores" DROP CONSTRAINT "fk_conductor_usuario";

-- DropForeignKey
ALTER TABLE "conductores" DROP CONSTRAINT "fk_conductor_vehiculo";

-- DropForeignKey
ALTER TABLE "duenos" DROP CONSTRAINT "fk_dueno_usuario";

-- DropForeignKey
ALTER TABLE "duenos" DROP CONSTRAINT "fk_dueno_vehiculo";

-- DropForeignKey
ALTER TABLE "pasajaeros" DROP CONSTRAINT "fk_pasajero_usuario";

-- DropForeignKey
ALTER TABLE "rutas_paradas_ordenes" DROP CONSTRAINT "fk_rutas_paradas_parada";

-- DropForeignKey
ALTER TABLE "rutas_paradas_ordenes" DROP CONSTRAINT "fk_rutas_paradas_ruta";

-- DropForeignKey
ALTER TABLE "rutas_paradas_ordenes" DROP CONSTRAINT "fk_rutas_paradas_vehiculo";

-- DropForeignKey
ALTER TABLE "usuarios" DROP CONSTRAINT "fk_usuario_persona";

-- DropForeignKey
ALTER TABLE "usuarios" DROP CONSTRAINT "fk_usuario_tipo";

-- AlterTable
ALTER TABLE "duenos" DROP COLUMN "id_vehiculo";

-- AlterTable
ALTER TABLE "personas" DROP COLUMN "activo";

-- AlterTable
ALTER TABLE "tipo_usuarios" DROP COLUMN "activo";

-- AlterTable
ALTER TABLE "vehiculos" DROP CONSTRAINT "vehiculos_pkey",
DROP COLUMN "id_vehiculo",
ADD COLUMN     "id_dueno" INTEGER,
ADD COLUMN     "id_vehiculos" SERIAL NOT NULL,
ADD CONSTRAINT "vehiculos_pkey" PRIMARY KEY ("id_vehiculos");

-- DropTable
DROP TABLE "conductores";

-- DropTable
DROP TABLE "pasajaeros";

-- DropTable
DROP TABLE "rutas_paradas_ordenes";

-- CreateTable
CREATE TABLE "conductor" (
    "id_conductor" SERIAL NOT NULL,
    "id_vehiculos" INTEGER,
    "id_usuario" INTEGER,

    CONSTRAINT "conductor_pkey" PRIMARY KEY ("id_conductor")
);

-- CreateTable
CREATE TABLE "rutas_paradas_orden" (
    "id_orden" SERIAL NOT NULL,
    "id_ruta" INTEGER,
    "id_parada" INTEGER,
    "id_vehiculos" INTEGER,
    "orden" INTEGER,
    "activo" SMALLINT,

    CONSTRAINT "rutas_paradas_orden_pkey" PRIMARY KEY ("id_orden")
);

-- AddForeignKey
ALTER TABLE "checadores" ADD CONSTRAINT "fk_checador_parada" FOREIGN KEY ("id_parada") REFERENCES "paradas"("id_parada") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "checadores" ADD CONSTRAINT "fk_checador_usuario" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "duenos" ADD CONSTRAINT "fk_dueno_usuario" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "fk_usuario_persona" FOREIGN KEY ("id_persona") REFERENCES "personas"("id_persona") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "fk_usuario_tipo" FOREIGN KEY ("id_tipo_usuario") REFERENCES "tipo_usuarios"("id_tipo_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vehiculos" ADD CONSTRAINT "fk_vehiculos_duenos" FOREIGN KEY ("id_dueno") REFERENCES "duenos"("id_dueno") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "conductor" ADD CONSTRAINT "fk_conductor_usuarios" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "conductor" ADD CONSTRAINT "fk_conductor_vehiculos" FOREIGN KEY ("id_vehiculos") REFERENCES "vehiculos"("id_vehiculos") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rutas_paradas_orden" ADD CONSTRAINT "fk_rutas_paradas_orden_paradas" FOREIGN KEY ("id_parada") REFERENCES "paradas"("id_parada") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rutas_paradas_orden" ADD CONSTRAINT "fk_rutas_paradas_orden_rutas" FOREIGN KEY ("id_ruta") REFERENCES "rutas"("id_ruta") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rutas_paradas_orden" ADD CONSTRAINT "fk_rutas_paradas_orden_vehiculos" FOREIGN KEY ("id_vehiculos") REFERENCES "vehiculos"("id_vehiculos") ON DELETE NO ACTION ON UPDATE NO ACTION;
