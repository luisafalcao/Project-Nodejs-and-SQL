import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client"
import Router from "./routes/index.js"
import isAuth from "./config/auth.js";
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

app.get("/logado", isAuth, (req, res) => {
    res.status(200).json({
        message: "Você está logado!",
        username: req.user.username
    })
})

app.listen(port, () => {
    console.log(`Servidor em http://localhost:${port}`)
})