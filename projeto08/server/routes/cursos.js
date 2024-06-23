// import JWT from "jsonwebtoken";
import { Router } from "express";
import Database from "../config/database.js"
import { getCurso } from "../controller/curso.js"
import isAuth from "../config/auth.js"
import { getUsuario } from "../controller/usuario.js";

const router = Router();

// GET CURSOS "/cursos"
router.get("/", async (req, res) => {
    try {
        const cursos = await Database.curso.findMany()

        res.status(200).json({
            data: cursos
        });

        return
    } catch (err) {
        res.status(500).json({ message: err.message })
        return
    }
});

// FAZER INSCRIÇÃO "/cursos/:idCurso"
router.post("/:idCurso", isAuth, async (req, res) => {
    try {
        const searchedCursoId = parseInt(req.params.idCurso)
        const currentUserId = req.user.id

        const curso = await getCurso({ id: searchedCursoId })

        if (!curso) {
            res.status(404).json({ message: "O curso procurado não existe." })
            return
        }

        const usuario = await getUsuario({ id: currentUserId })

        if (!usuario) {
            res.status(404).json({ message: "O usuário não existe." })
            return
        }

        const updatedUsuario = await Database.usuario.update({
            where: { id: currentUserId },
            data: {
                cursos: {
                    connect: { id: searchedCursoId },
                },
            },
        });

        res.status(200).json({
            message: "Sucesso! Inscrição realizada.",
            usuario: updatedUsuario,
            curso: curso,
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
})

// CADASTRAR CURSOS "/cursos"
// router.post("/", async (req, res) => {
//     try {
//         const data = req.body;

//         if (!data.nome) {
//             res.status(400).json({ message: "Insira um nome." })
//             return
//         }

//         const nomeExistente = await Database.curso.findMany({
//             where: {
//                 nome: data.nome
//             }
//         })

//         if (nomeExistente.length) {
//             res.status(400).json({ message: "O username inserido já está sendo utilizado." })
//             return
//         }

//         const novoCurso = await createCurso({
//             nome: data.nome,
//             descricao: data.descricao,
//             capa: data.capa,
//             inscricoes: data.inscricoes,
//             inicio: data.inicio
//         });

//         res.status(200).json({ message: "Curso cadastrado com sucesso!", data: novoCurso })
//         return
//     } catch (error) {
//         res.status(400).json({ message: error.message })
//         return
//     }
// })

export default router