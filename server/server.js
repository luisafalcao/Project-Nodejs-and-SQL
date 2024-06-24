import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client"
import Router from "./routes/index.js"
import isAuth from "./config/auth.js";
import { getCursoByUsuario } from "./controller/curso.js";
import { converterFormatoData } from "./config/utils.js";
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3001;
const prisma = new PrismaClient()

app.use(cors());
app.use(express.json())
app.use(cookieParser())

Router(app);

// ROTA DE TODOS OS CURSOS (HOME) "/"
app.get("/", async (req, res) => {
    const data = await prisma.curso.findMany({
        where: {
            inicio: {
                gte: new Date()
            }
        }
    })

    const cursos = await Promise.all(data.map(async (curso) => {
        const { usuarios, inicio, created_at, updated_at, ...rest } = curso;
        const data_inicio = await converterFormatoData(inicio)

        return {
            ...rest,
            inicio: data_inicio,
        }
    }));

    res.status(200).json({
        message: "Todos os cursos disponíveis",
        cursos
    })
})

// ROTA DOS CURSOS POR USUÁRIO "/:idUsuario"
app.get("/:idUsuario", isAuth, async (req, res) => {
    try {
        const searchedId = parseInt(req.params.idUsuario)
        const currentUserId = req.user.id

        const data = await getCursoByUsuario(searchedId)

        if (currentUserId !== searchedId) {
            res.status(403).json({ message: `Você não tem permissão para visualizar os cursos do usuário deste usuário` })
            return
        }

        res.status(200).json({
            data,
            usuario: {
                name: req.user.nome
            }
        })
        return
    } catch (error) {
        res.status(400).json({ message: error.message })
        return
    }
})

// ROTA PARA CONFIRMAR SE USUÁRIO ESTÁ LOGADO
app.get("/logado", isAuth, (req, res) => {
    res.status(200).json({
        message: "Você está logado!",
        username: req.user.username
    })
})

app.listen(port, () => {
    console.log(`Servidor em http://localhost:${port}`)
})

// LIMPAR DATABASE "/" --dev
// app.delete("/", async (req, res) => {
//     const cursoUsuarioDeletados = await prisma.cursoUsuario.deleteMany({})
//     const cursosDeletados = await prisma.curso.deleteMany({})
//     const usuariosDeletados = await prisma.usuario.deleteMany({})

//     res.status(200).json({
//         cursoUsuarios: cursoUsuarioDeletados,
//         cursos: cursosDeletados,
//         usuarios: usuariosDeletados
//     })
// })