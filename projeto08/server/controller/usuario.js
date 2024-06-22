import Database from "../config/database.js"
import BCrypt from "bcrypt";
import JWT from "jsonwebtoken";
import 'dotenv/config'

// CADASTRAR USUÁRIO
export async function createUsuario({ username, senha, email, nome, nascimento }) {
    const hash_password = BCrypt.hashSync(senha, 10);
    const nascimento_formatado = new Date(nascimento).toISOString();

    const novoUsuario = await Database.usuario.create({
        data: {
            username,
            senha: hash_password,
            email,
            nome,
            nascimento: nascimento_formatado
        }
    })

    return novoUsuario;
}

// GET USUARIO(s)
export async function getUsuario(identificador) {
    if (!identificador || Object.keys(identificador).length === 0) {
        const usuarios = await Database.usuario.findMany();
        return usuarios
    } else {
        const [key, value] = Object.entries(identificador)[0]
        const usuario = await Database.usuario.findUnique({
            where: {
                [key]: value
            }
        })
        return usuario
    }
}

// FAZER LOGIN
export async function login({ email, senha }) {
    const user = await getUsuario({ email })

    if (!user) {
        return false;
    }

    const passwordMatch = BCrypt.compareSync(senha, user.senha);

    if (!passwordMatch) {
        return false;
    }

    const token = JWT.sign({
        id: user.id,
        username: user.username,
        email: user.email,
        nome: user.name,
        status: user.status

    }, process.env.SECRET, { expiresIn: '1h' })

    return token;
}

// ALTERAR SENHA
export async function changePassword(id, senha) {
    const hash_password = BCrypt.hashSync(senha, 10);

    const novaSenha = await Database.usuario.update({
        where: {
            id: id
        },
        data: {
            senha: hash_password
        }
    })
    return novaSenha;
}