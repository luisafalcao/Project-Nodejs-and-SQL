import express from "express";
import cors from "cors";
import 'dotenv/config'
import { readAluno, createAluno } from "./controller/aluno.js"

const app = express();
const port = process.env.PORT || 3001;  // Ensure this matches the port in your .env file

app.use(cors());
app.use(express.json())

app.get("/", async (req, res) => {
    const alunos = await readAluno();
    console.log(alunos)
    res.status(200).send({ alunos });
});

app.post("/", async (req, res) => {
    try {
        const data = req.body;

        console.log(data)

        const novo_aluno = await createAluno(data);
        res.status(200).json({ message: "Sucesso", data: novo_aluno })

        return
    } catch (err) {
        res.status(500).json({ message: err.message })
        return
    }
})

app.listen(port, () => {
    console.log(`Servidor em http://localhost:${port}`)
})