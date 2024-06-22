// import JWT from "jsonwebtoken";
import { Router } from "express";
import { readCurso, getCursoByUsuario } from "../controller/curso.js"
import isAuth from "../config/auth.js"

const router = Router();

// GET
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

router.get("/meus-cursos", isAuth, async (req, res) => {
    try {
        const data = await getCursoByUsuario(req.user.id)

        res.status(200).json({ message: "Sucesso!", data })
        return
    } catch (error) {
        res.status(500).json({ message: error.message })
        return
    }
})
// GET BY ID
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

// GET BY USER
router.get("")
// POST
// router.post("/", async (req, res) => {
//     try {
//         const data = req.body;

//         if (!data.name) {
//             res.status(400).json({ message: "Por favor inclua um nome." })
//             return
//         }

//         const novoCurso = await createCurso(data);
//         res.status(200).json({ message: "Curso criado com sucesso!", data: novoCurso })

//         return
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//         return
//     }
// })

// PUT
// router.put("/:idCurso", async (req, res) => {
//     try {
//         const idCurso = req.params.idCurso;
//         const data = req.body

//         console.log("idCurso:", idCurso)
//         console.log("PUT request data:", data)

//         const curso = await readCurso(idCurso)

//         if (!curso.length) {
//             res.status(400).json({ message: "Curso não encontrado" })
//             return
//         }

//         console.log("Existing curso: ", curso)

//         const cursoAtualizado = await updateCurso({
//             id: idCurso,
//             name: data.name,
//             price: data.price,
//         })

//         console.log("Updated curso: ", cursoAtualizado)

//         res.status(200).json({ message: "Sucesso", data: cursoAtualizado })
//         return
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//         return
//     }
// })

// DELETE
// router.delete("/:idCurso", async (req, res) => {
//     try {
//         const idCurso = req.params.idCurso;

//         const curso = await readCurso(idCurso)

//         if (!curso.length) {
//             res.status(400).json({ message: "Curso não encontrado" })
//             return
//         }

//         await deleteCurso(idCurso)

//         res.status(200).json({ message: `Sucesso! Curso ${curso.name} removido` })
//         return
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//         return
//     }
// })

// PATCH
// router.patch("/:idCurso", async (req, res) => {
//     const idCurso = req.params.idCurso;

//     const curso = await readCurso(idCurso)

//     if (!curso.length) {
//         res.status(400).json({ message: "Curso não encontrado" })
//         return
//     }

//     const data = req.body

//     if (data.status === true || data.status === false) {
//         const cursoAtualizado = await changeStatus({
//             id: idCurso,
//             status: data.status,
//         })

//         res.status(200).json({ message: "Sucesso", data: cursoAtualizado })
//         return
//     } else {
//         res.status(400).json({ message: "Status inexistente" })
//         return
//     }
// })

export default router