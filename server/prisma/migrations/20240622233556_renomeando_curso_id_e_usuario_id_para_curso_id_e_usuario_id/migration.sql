/*
  Warnings:

  - You are about to drop the column `curso_id` on the `usuario_curso` table. All the data in the column will be lost.
  - You are about to drop the column `usuario_id` on the `usuario_curso` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "usuario_curso" DROP CONSTRAINT "usuario_curso_curso_id_fkey";

-- DropForeignKey
ALTER TABLE "usuario_curso" DROP CONSTRAINT "usuario_curso_usuario_id_fkey";

-- AlterTable
ALTER TABLE "usuario_curso" DROP COLUMN "curso_id",
DROP COLUMN "usuario_id",
ADD COLUMN     "cursoId" SERIAL NOT NULL,
ADD COLUMN     "usuarioId" SERIAL NOT NULL;

-- AddForeignKey
ALTER TABLE "usuario_curso" ADD CONSTRAINT "usuario_curso_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuario_curso" ADD CONSTRAINT "usuario_curso_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "curso"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
