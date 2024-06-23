/*
  Warnings:

  - You are about to drop the `_CursoUsuarios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `curso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CursoUsuarios" DROP CONSTRAINT "_CursoUsuarios_A_fkey";

-- DropForeignKey
ALTER TABLE "_CursoUsuarios" DROP CONSTRAINT "_CursoUsuarios_B_fkey";

-- DropTable
DROP TABLE "_CursoUsuarios";

-- DropTable
DROP TABLE "curso";

-- DropTable
DROP TABLE "usuario";

-- CreateTable
CREATE TABLE "Curso" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "capa" TEXT NOT NULL,
    "inscricoes" INTEGER NOT NULL,
    "inicio" TIMESTAMP(3),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3),
    "status" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CursoUsuario" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "cursoId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',

    CONSTRAINT "CursoUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Curso_nome_key" ON "Curso"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_username_key" ON "Usuario"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CursoUsuario_usuarioId_cursoId_key" ON "CursoUsuario"("usuarioId", "cursoId");

-- AddForeignKey
ALTER TABLE "CursoUsuario" ADD CONSTRAINT "CursoUsuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CursoUsuario" ADD CONSTRAINT "CursoUsuario_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
