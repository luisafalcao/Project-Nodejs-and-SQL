// import JWT from "jsonwebtoken";
import { Router } from "express";
import { readCurso, getCursoByUsuario } from "../controller/curso.js"
import isAuth from "../config/auth.js"

const router = Router();

// EXIBIR CURSOS "/cursos"
router.get("/", async (req, res) => {
    try {
        const cursos = await readCurso();
        res.status(200).send({ cursos });

        return
    } catch (err) {
        res.status(500).json({ message: err.message })
        return
    }
});

// EXIBIR CURSOS POR USUÁRIO "/cursos/meus-cursos"
router.get("/meus-cursos", isAuth, async (req, res) => {
    try {
        const data = await getCursoByUsuario(req.user.id)

        res.status(200).json({
            message: "Sucesso!",
            data: {
                cursos: data,
                usuario: {
                    name: req.user.name
                }
            }
        })
        return
    } catch (error) {
        res.status(500).json({ message: error.message })
        return
    }
})

// EXIBIR CURSO POR ID "/cursos/:id"
router.get("/:idCurso", async (req, res) => {
    try {
        const idCurso = req.params.idCurso;

        const curso = await readCurso(idCurso)

        if (!curso.length) {
            res.status(400).json({ message: "Curso não encontrado" })
            return
        }

        res.status(200).json({ message: "Sucesso", data: curso })
        return
    } catch (err) {
        res.status(500).json({ message: err.message })
        return
    }
})

export default router