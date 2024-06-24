/*
  Warnings:

  - A unique constraint covering the columns `[usuarioId]` on the table `CursoUsuario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cursoId]` on the table `CursoUsuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CursoUsuario_usuarioId_key" ON "CursoUsuario"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "CursoUsuario_cursoId_key" ON "CursoUsuario"("cursoId");
