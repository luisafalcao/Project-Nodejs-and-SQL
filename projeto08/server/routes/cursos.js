import { Router } from "express";
import { Prisma } from '@prisma/client'
import { inscreverEmCurso, cancelarInscricaoEmCurso, createCurso, getCursoByUsuario, filtrarCurso } from "../controller/curso.js"
import isAuth from "../config/auth.js"

const router = Router();

// ROTA DE CURSOS INSCRITOS E DISPONIVEIS "/cursos"
router.get("/", isAuth, async (req, res) => {
    try {
        const currentUserId = req.user.id
        let filter

        if (req.query.filter) {
            filter = await filtrarCurso(req.query.filter)

            res.status(200).json({
                filter
            });

            return
        }

        const busca = await getCursoByUsuario("inscritos", currentUserId)
        const inscritos = await Promise.all(busca.cursosInscritos.map(cursoUsuario => cursoUsuario.curso))

        const disponiveis = await getCursoByUsuario("disponiveis", currentUserId)

        res.status(200).json({
            inscritos,
            disponiveis
        });

    } catch (error) {
        console.error(error.message)
        res.status(400).json({ message: "Ocorreu um erro no servidor." })
        return
    }
});

// ROTA DE CADASTRO DE CURSO "/cursos/criar-curso" --dev
router.post("/criar-curso", async (req, res) => {
    try {
        const { nome, descricao, capa, inscricoes, inicio } = req.body;

        const novoCurso = await createCurso({ nome, descricao, capa, inscricoes, inicio });

        res.status(200).json({
            message: "Curso criado com sucesso!",
            novoCurso
        });
    } catch (error) {
        console.error(error.message)
        res.status(400).json({ message: "Ocorreu um erro no servidor." });
    }
})

// ROTA DE INSCRIÇÃO EM CURSO "/cursos/:idCurso"
router.post("/:idCurso", isAuth, async (req, res) => {
    try {
        const searchedCursoId = parseInt(req.params.idCurso)
        const currentUserId = req.user.id

        const inscricao = await inscreverEmCurso(currentUserId, searchedCursoId)

        res.status(200).json({
            message: "Inscrição realizada com sucesso!",
            inscricao
        })
    } catch (error) {
        console.error(error.message)
        res.status(400).json({ message: "Ocorreu um erro no servidor." })
    }
})

// ROTA DE CANCELAMENTO DE INSCRIÇÃO "/cursos/:idCurso"
router.patch("/:idCurso", isAuth, async (req, res) => {
    try {
        const searchedCursoId = parseInt(req.params.idCurso)
        const currentUserId = req.user.id

        const cancelamento = await cancelarInscricaoEmCurso(currentUserId, searchedCursoId)

        res.status(200).json({
            message: "Inscrição cancelada com sucesso",
            data: cancelamento.updatedCursoUsuario
        })
    } catch (error) {
        console.error(error.message)
        res.status(400).json({ message: "Ocorreu um erro no servidor." })
    }
})

export default router