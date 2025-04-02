/*
  Warnings:

  - You are about to drop the column `id_vehiculos` on the `rutas_paradas_orden` table. All the data in the column will be lost.
  - You are about to drop the column `activo` on the `vehiculos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "rutas_paradas_orden" DROP CONSTRAINT "fk_rutas_paradas_orden_vehiculos";

-- AlterTable
ALTER TABLE "rutas_paradas_orden" DROP COLUMN "id_vehiculos";

-- AlterTable
ALTER TABLE "vehiculos" DROP COLUMN "activo",
ADD COLUMN     "id_ruta" INTEGER;

-- AddForeignKey
ALTER TABLE "vehiculos" ADD CONSTRAINT "fk_vehiculos_rutas" FOREIGN KEY ("id_ruta") REFERENCES "rutas"("id_ruta") ON DELETE NO ACTION ON UPDATE NO ACTION;
