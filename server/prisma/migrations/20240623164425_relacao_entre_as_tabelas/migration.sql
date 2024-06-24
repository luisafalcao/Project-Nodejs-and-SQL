/*
  Warnings:

  - You are about to drop the `_cursoTousuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_cursoTousuario" DROP CONSTRAINT "_cursoTousuario_A_fkey";

-- DropForeignKey
ALTER TABLE "_cursoTousuario" DROP CONSTRAINT "_cursoTousuario_B_fkey";

-- DropTable
DROP TABLE "_cursoTousuario";

-- CreateTable
CREATE TABLE "_CursoUsuarios" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CursoUsuarios_AB_unique" ON "_CursoUsuarios"("A", "B");

-- CreateIndex
CREATE INDEX "_CursoUsuarios_B_index" ON "_CursoUsuarios"("B");

-- AddForeignKey
ALTER TABLE "_CursoUsuarios" ADD CONSTRAINT "_CursoUsuarios_A_fkey" FOREIGN KEY ("A") REFERENCES "curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CursoUsuarios" ADD CONSTRAINT "_CursoUsuarios_B_fkey" FOREIGN KEY ("B") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
