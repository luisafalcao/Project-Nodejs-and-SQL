/*
  Warnings:

  - The `inicio` column on the `curso` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `nascimento` column on the `usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "curso" DROP COLUMN "inicio",
ADD COLUMN     "inicio" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "nascimento",
ADD COLUMN     "nascimento" TIMESTAMP(3);
