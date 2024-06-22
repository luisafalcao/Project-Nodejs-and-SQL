import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client"
import Router from "./routes/index.js"
import isAuth from "./config/auth.js";
import { getCursoByUsuario } from "./controller/curso.js";
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3001;
const prisma = new PrismaClient()

app.use(cors());
app.use(express.json())
app.use(cookieParser())

Router(app);

app.get("/", async (req, res) => {
    const cursos = await prisma.curso.findMany()

    res.status(200).json({
        data: cursos
    })
})

// GET CURSOS POR USUÁRIO "/:idUsuario"
app.get("/:idUsuario", isAuth, async (req, res) => {
    try {
        const searchedId = parseInt(req.params.idUsuario)

        const currentUserId = req.user.id
        const data = await getCursoByUsuario({ currentUserId })

        if (currentUserId !== searchedId) {
            res.status(403).json({ message: `Você não tem permissão para visualizar os cursos do usuário de ID ${searchedId}` })
            return
        }

        res.status(200).json({
            message: "Sucesso!",
            data: {
                cursos: data,
                usuario: {
                    name: req.user.nome
                }
            }
        })
        return
    } catch (error) {
        res.status(400).json({ message: error.message })
        return
    }
})

app.get("/logado", isAuth, (req, res) => {
    res.status(200).json({
        message: "Você está logado!",
        username: req.user.username
    })
})

app.listen(port, () => {
    console.log(`Servidor em http://localhost:${port}`)
})