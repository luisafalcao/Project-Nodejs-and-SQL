import Query from "../config/database.js";
import BCrypt from "bcrypt";
import JWT from "jsonwebtoken";

const SECRET = "FFD349477A258D2ECAB3CD397E252"

export async function createUsuario({ username, password, email, name, age }) {
    const hash_password = BCrypt.hashSync(password, 10);

    const novoUsuario = await Query(
        "INSERT INTO usuario(username, password, email, name, age) VALUES($1,$2,$3,$4,$5) RETURNING *",
        [username, hash_password, email, name, age],
    );
    return novoUsuario;
}

export async function getUsuario({ username }) {
    const user = await Query(
        "SELECT * FROM usuario WHERE username = $1",
        [username]
    )
    try {
        return user[0]
    } catch (err) {
        return null;
    }
}

export async function login({ username, password }) {
    const user = await getUsuario({ username })

    if (!user) {
        return false;
    }

    const passwordMatch = BCrypt.compareSync(password, user.password);

    if (!passwordMatch) {
        return false;
    }

    const token = JWT.sign({
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        status: user.status

    }, SECRET, { expiresIn: '1h' })

    return token;
}

// export async function readUsuario(id = null) {
//     if (!id) {
//         const usuarios = await Query("SELECT * FROM usuario")
//         return usuarios
//     } else {
//         const usuario = await Query("SELECT * FROM usuario WHERE id = $1", [id])
//         return usuario
//     }
// }

// export async function updateUsuario({ id, name, age, email, slug }) {
//     const usuario = await Query(
//         "UPDATE usuario SET name = $1, age = $2, email = $3, slug = $4 WHERE id = $5",
//         [name, age, email, slug, id],
//     );
//     return usuario;
// }

// export async function deleteUsuario(id) {
//     const usuario = await Query("DELETE FROM usuario WHERE id = $1 RETURNING *", [
//         id,
//     ]);
//     return usuario;
// }