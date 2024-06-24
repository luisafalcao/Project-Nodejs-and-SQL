/*
  Warnings:

  - Made the column `nascimento` on table `usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "nascimento" SET NOT NULL,
ALTER COLUMN "nascimento" SET DATA TYPE TEXT;
