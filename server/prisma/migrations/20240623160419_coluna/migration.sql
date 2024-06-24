/*
  Warnings:

  - Made the column `inicio` on table `curso` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "curso" ALTER COLUMN "inicio" SET NOT NULL,
ALTER COLUMN "inicio" SET DATA TYPE TEXT;
