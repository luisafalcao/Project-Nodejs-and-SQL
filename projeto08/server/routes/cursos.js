import { Router } from "express";
import Database from "../config/database.js"
import { inscreverEmCurso, cancelarInscricaoEmCurso, createCurso } from "../controller/curso.js"
import isAuth from "../config/auth.js"
import { converterFormatoData } from "../config/utils.js";

const router = Router();

// GET CURSOS "/cursos"
router.get("/", isAuth, async (req, res) => {
    try {
        const currentUserId = req.user.id

        const data = await Database.curso.findMany({
            where: {
                inicio: {
                    gte: new Date()
                }
            },
            select: {
                nome: true,
                descricao: true,
                inicio: true,
                inscricoes: true,
                usuarios: {
                    where: {
                        id: currentUserId,
                    },
                    select: {
                        id: true,
                    },
                },
            },
            orderBy: {
                nome: 'asc'
            }
        })

        const cursosDisponiveis = await Promise.all(data.map(async (curso) => {
            const { usuarios, inicio, created_at, updated_at, ...rest } = curso;
            const data_inicio = await converterFormatoData(inicio)

            return {
                ...rest,
                inicio: data_inicio,
                inscrito: usuarios.length > 0,
            }
        }));

        res.status(200).json({
            data: cursosDisponiveis
        });
    } catch (err) {
        res.status(500).json({ message: err.message })
        return
    }
});

// CRIAR CURSO "/cursos/criar-curso" ---- comentar
// router.post("/criar-curso", async (req, res) => {
//     try {
//         const { nome, descricao, capa, inscricoes, inicio } = req.body;

//         const novoCurso = await createCurso({ nome, descricao, capa, inscricoes, inicio });

//         res.status(201).json({ message: "Curso criado com sucesso!", curso: novoCurso });
//     } catch (error) {
//         console.log("erro:", error.message)
//         res.status(400).json({ message: error.message });
//     }
// })

// FAZER INSCRIÇÃO "/cursos/:idCurso"
router.post("/:idCurso", isAuth, async (req, res) => {
    try {
        const searchedCursoId = parseInt(req.params.idCurso)
        const currentUserId = req.user.id

        const inscricao = await inscreverEmCurso(currentUserId, searchedCursoId)

        res.status(200).json({
            message: "Inscrição realizada!",
            inscricao
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ message: "Você já está inscrito(a) neste curso." })
    }
})

// CANCELAR INSCRIÇÃO "/cursos/:idCurso"
router.patch("/:idCurso", isAuth, async (req, res) => {
    try {
        const searchedCursoId = parseInt(req.params.idCurso)
        const currentUserId = req.user.id

        const cancelamento = await cancelarInscricaoEmCurso(currentUserId, searchedCursoId)

        res.status(200).json({
            message: "Inscrição cancelada.",
            cancelamento
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ message: error.message })
    }
})

export default router

