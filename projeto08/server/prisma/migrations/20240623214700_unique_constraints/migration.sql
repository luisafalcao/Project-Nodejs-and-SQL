/*
  Warnings:

  - A unique constraint covering the columns `[usuarioId,cursoId]` on the table `CursoUsuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CursoUsuario_usuarioId_cursoId_key" ON "CursoUsuario"("usuarioId", "cursoId");
