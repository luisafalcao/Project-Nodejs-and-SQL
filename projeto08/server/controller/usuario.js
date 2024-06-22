import Query from "../config/database.js";
import BCrypt from "bcrypt";
import JWT from "jsonwebtoken";
import 'dotenv/config'

// CADASTRAR USUÁRIO
export async function createUsuario({ username, senha, email, nome, nascimento }) {
    const hash_password = BCrypt.hashSync(senha, 10);


    const novoUsuario = await Query(
        "INSERT INTO usuario(username, senha, email, nome, nascimento) VALUES($1,$2,$3,$4,$5) RETURNING *",
        [username, hash_password, email, nome, nascimento],
    );
    return novoUsuario;
}

// EXIBIR USUARIO POR ID
export async function getUsuarioById(id) {
    try {
        const user = await Query(
            "SELECT * FROM usuario WHERE id = $1",
            [id]
        )
        return user[0]
    } catch (error) {
        return null
    }
}

// EXIBIR USUARIO POR USERNAME
export async function getUsuario({ email }) {
    const user = await Query(
        "SELECT * FROM usuario WHERE email = $1",
        [email]
    )
    try {
        return user[0]
    } catch (err) {
        return null;
    }
}

// ALTERAR SENHA
export async function changePassword(id, senha) {
    const hash_password = BCrypt.hashSync(senha, 10);

    const novaSenha = await Query(
        "UPDATE usuario SET senha = $1 WHERE id = $2 RETURNING *",
        [hash_password, id],
    );
    return novaSenha;
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

