import { Router } from "express";
import criarSlug from "../config/utils.js"
import { createUsuario, login } from "../controller/usuario.js"

const router = Router();

// CRIAR USUÁRIO
router.post("/", async (req, res) => {
    try {
        const data = req.body;

        if (!data.username) {
            res.status(400).json({ message: "Username necessário" })
            return
        }

        if (!data.password) {
            res.status(400).json({ message: "Senha necessária" })
            return
        }

        if (!data.email) {
            res.status(400).json({ message: "Email necessário" })
            return
        }

        const novoUsuario = await createUsuario({
            username: data.username,
            password: data.password,
            email: data.email,
            name: data.name,
            age: data.age
        });

        res.status(200).json({ message: "Usuário criado com sucesso!", data: novoUsuario })
        return
    } catch (error) {
        res.status(500).json({ message: error.message })
        return
    }
})

// FAZER AUTENTICAÇÃO
router.post("/login", async (req, res) => {
    try {
        const data = req.body

        if (!data.username) {
            res.status(400).json({ message: "Username necessário" })
            return
        }

        if (!data.password) {
            res.status(400).json({ message: "Senha necessária" })
            return
        }

        if (data.password.length < 6) {
            res.status(400).json({ message: "Senha deve ter no mínimo 6 caracteres" })
            return
        }

        const user = await login({
            username: data.username,
            password: data.password,
        })

        if (!user) {
            res.status(400).json({ message: "Usuário ou senha inválidos" })
            return
        }

        res.status(200).json({
            message: "Sucesso",
            data: {
                token: user
            }
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
        return
    }
})

export default router