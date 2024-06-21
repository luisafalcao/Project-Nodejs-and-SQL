import { Router } from "express";
import { createUsuario, login } from "../controller/usuario.js"
import { sendMail, emailBody } from "../config/mailer.js";

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
            date_of_birth: data.date_of_birth
        });

        const body = emailBody('Cadastro concluído!', `Olá ${data.name}, seu cadastro foi concluído com sucesso!`)

        const emailSent = await sendMail({
            to: data.email,
            subject: "Bem vindo(a)",
            ...body
        }).then(res => {
            return true
        }).catch(error => {
            console.error(error)
            return error.message
        })

        res.status(200).json({ message: "Usuário criado com sucesso!", data: novoUsuario, emailSent })
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

        res.cookie('x-auth', user)

        res.status(200).json({
            message: "Login feito com sucesso!"
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
        return
    }
})

export default router