import { Router } from "express";
import { createUsuario, getUsuario, changePassword, login } from "../controller/usuario.js"
import { sendMail, emailBody } from "../config/mailer.js";

const router = Router();

// CADASTRAR USUÁRIO "/usuarios"
router.post("/", async (req, res) => {
    try {
        const data = req.body;

        if (!data.username) {
            res.status(400).json({ message: "Insira um username." })
            return
        }

        if (!data.senha) {
            res.status(400).json({ message: "Insira uma senha." })
            return
        }

        if (!data.email) {
            res.status(400).json({ message: "Insira um email." })
            return
        }

        const novoUsuario = await createUsuario({
            username: data.username,
            senha: data.senha,
            email: data.email,
            nome: data.nome,
            nascimento: data.nascimento
        });

        const body = emailBody('Cadastro concluído!', `Olá ${data.nome}, seu cadastro foi concluído com sucesso!`)

        const emailSent = await sendMail({
            to: data.email,
            subject: "Bem vindo(a)!",
            ...body
        }).then(res => {
            return true
        }).catch(error => {
            console.error(error)
            return error.message
        })

        res.status(200).json({ message: "Usuário cadastrado com sucesso!", data: novoUsuario, emailSent })
        return
    } catch (error) {
        res.status(400).json({ message: error.message })
        return
    }
})

// FAZER LOGIN "/usuarios/login"
router.post("/login", async (req, res) => {
    try {
        const data = req.body

        if (!data.email) {
            res.status(400).json({ message: "Insira seu email." })
            return
        }

        if (!data.senha) {
            res.status(400).json({ message: "Insira sua senha." })
            return
        }

        if (data.senha.length < 6) {
            res.status(400).json({ message: "Sua senha deve ter no mínimo 6 caracteres." })
            return
        }

        const user = await login({
            email: data.email,
            senha: data.senha,
        })

        if (!user) {
            res.status(400).json({ message: "Email ou senha inválidos." })
            return
        }

        res.cookie('x-auth', user)

        res.status(200).json({
            message: "Login feito com sucesso!"
        })

    } catch (error) {
        res.status(400).json({ message: error.message })
        return
    }
})

// RECUPERAR SENHA "/usuarios/recuperar-senha"
router.post("/recuperar-senha", async (req, res) => {
    try {
        const data = req.body

        if (!data.email) {
            res.status(400).json({ message: "Insira seu email." })
            return
        }

        const user = await getUsuario({ email: data.email })

        if (!user) {
            res.status(400).json({ message: "Username não cadastrado" })
            return
        }

        const novaSenha = "12345678"

        await changePassword(user.id, novaSenha)

        const body = emailBody('Recuperação de senha', `Olá ${user.name}, você solicitou uma recuperação de senha! Sua nova senha é <strong>${novaSenha}</strong>.`)

        const emailSent = await sendMail({
            to: user.email,
            subject: "Recuperação de senha",
            ...body
        }).then(() => {
            return true
        }).catch(error => {
            console.error(error)
            return error.message
        })

        res.status(200).json({ message: `Nova senha enviada para ${user.email}.`, emailSent })
        return
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Ocorreu um erro no servidor." });
    }
})

export default router