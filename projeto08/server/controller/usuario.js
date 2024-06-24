import Database from "../config/database.js"
import { converterFormatoData } from "../config/utils.js";
import BCrypt from "bcrypt";
import JWT from "jsonwebtoken";
import 'dotenv/config'

// CADASTRAR NOVO USUÁRIO
export async function createUsuario({ username, senha, email, nome, nascimento }) {
    try {
        const hash_password = BCrypt.hashSync(senha, 10);

        const data_nascimento = await converterFormatoData(nascimento)
            .then(timestamp => {
                return timestamp
            })
            .catch(error => {
                console.error(error.message)
            });

        const novoUsuario = await Database.usuario.create({
            data: {
                username,
                senha: hash_password,
                email,
                nome,
                nascimento: new Date(data_nascimento)
            },
            select: {
                nome: true,
                email: true,
                username: true
            }
        })

        return novoUsuario;
    } catch (error) {
        console.error(error.message);
        throw new Error('Erro no cadastro.');
    }
}

// BUSCAR USUARIO(s)
export async function getUsuario(identificador) {
    try {
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
    } catch (error) {
        console.error(error.message);
        throw new Error('Erro ao buscar usuario.');
    }
}

// FAZER LOGIN
export async function login({ email, senha }) {
    try {
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

        }, process.env.SECRET, { expiresIn: '1h' })

        return token;
    } catch (error) {
        console.error(error.message);
        throw new Error('Erro ao efetuar login.');
    }
}

// ALTERAR SENHA
export async function changePassword(id, senha) {
    try {
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
    } catch (error) {
        console.error(error.message);
        throw new Error('Erro ao alterar senha.');
    }
}
