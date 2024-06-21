import { Router } from "express";
// import { createAluno, readAluno, updateAluno, deleteAluno } from "../controller/aluno.js"

const router = Router();

router.get("/", (req, res) => {
    res.status(501).send({ message: "todo" })
})

export default router