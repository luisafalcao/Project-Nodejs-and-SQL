-- DropForeignKey
ALTER TABLE "usuario_curso" DROP CONSTRAINT "usuario_curso_cursoId_fkey";

-- DropForeignKey
ALTER TABLE "usuario_curso" DROP CONSTRAINT "usuario_curso_usuarioId_fkey";

-- CreateTable
CREATE TABLE "_cursoTousuario" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_cursoTousuario_AB_unique" ON "_cursoTousuario"("A", "B");

-- CreateIndex
CREATE INDEX "_cursoTousuario_B_index" ON "_cursoTousuario"("B");

-- AddForeignKey
ALTER TABLE "_cursoTousuario" ADD CONSTRAINT "_cursoTousuario_A_fkey" FOREIGN KEY ("A") REFERENCES "curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_cursoTousuario" ADD CONSTRAINT "_cursoTousuario_B_fkey" FOREIGN KEY ("B") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
