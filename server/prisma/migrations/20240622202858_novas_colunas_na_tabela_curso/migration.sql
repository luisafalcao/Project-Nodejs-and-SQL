/*
  Warnings:

  - You are about to drop the column `name` on the `curso` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `curso` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nome]` on the table `curso` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `capa` to the `curso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `curso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inscricoes` to the `curso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `curso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "curso" DROP COLUMN "name",
DROP COLUMN "price",
ADD COLUMN     "capa" TEXT NOT NULL,
ADD COLUMN     "descricao" TEXT NOT NULL,
ADD COLUMN     "inicio" DATE,
ADD COLUMN     "inscricoes" INTEGER NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "curso_nome_key" ON "curso"("nome");
