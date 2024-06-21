import { Router } from "express";
import criarSlug from "../config/utils.js"
import { createAluno, readAluno, updateAluno, deleteAluno } from "../controller/aluno.js"

const router = Router();

// GET
router.get("/", async (req, res) => {
    try {
        const alunos = await readAluno();
        res.status(200).send({ alunos });

        return
    } catch (err) {
        res.status(500).json({ message: err.message })
        return
    }
});

// GET BY ID
router.get("/:idAluno", async (req, res) => {
    try {
        const idAluno = req.params.idAluno;

        const aluno = await readAluno(idAluno)

        if (!aluno.length) {
            res.status(400).json({ message: "Aluno não encontrado" })
            return
        }

        res.status(200).json({ message: "Sucesso", data: aluno })
        return
    } catch (err) {
        res.status(500).json({ message: err.message })
        return
    }
})

// POST
router.post("/", async (req, res) => {
    try {
        const data = req.body;

        if (!data.name) {
            res.status(400).json({ message: "Por favor inclua um nome." })
            return
        }

        if (!data.email) {
            res.status(400).json({ message: "Por favor inclua um email." })
            return
        }

        if (!data.slug) {
            data.slug = criarSlug(data.name)
        }

        const novoAluno = await createAluno(data);
        res.status(200).json({ message: "Aluno criado com sucesso!", data: novoAluno })

        return
    } catch (err) {
        res.status(500).json({ message: err.message })
        return
    }
})

// PUT
router.put("/:idAluno", async (req, res) => {
    try {
        const idAluno = req.params.idAluno;
        const data = req.body

        const aluno = await readAluno(idAluno)

        if (!aluno.length) {
            res.status(400).json({ message: "Aluno não encontrado" })
            return
        }

        const alunoAtualizado = await updateAluno({
            id: idAluno,
            name: data.name,
            age: data.age,
            email: aluno.email,
            slug: criarSlug(data.name)
        })

        res.status(200).json({ message: "Sucesso", data: alunoAtualizado })
        return
    } catch (err) {
        res.status(500).json({ message: err.message })
        return
    }
})

// DELETE
router.delete("/:idAluno", async (req, res) => {
    try {
        const idAluno = req.params.idAluno;

        const aluno = await readAluno(idAluno)

        if (!aluno.length) {
            res.status(400).json({ message: "Aluno não encontrado" })
            return
        }

        await deleteAluno(idAluno)

        res.status(200).json({ message: `Sucesso! Aluno ${aluno.name} removido` })
        return
    } catch (err) {
        res.status(500).json({ message: err.message })
        return
    }
})

export default router