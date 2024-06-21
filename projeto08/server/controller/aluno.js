import Query from "../config/database.js";

export async function createAluno({ name, email, age, slug }) {
    const novoAluno = await Query(
        "INSERT INTO alunos(name,email,age,slug) VALUES($1,$2,$3,$4) RETURNING *",
        [name, email, age, slug],
    );
    return novoAluno;
}

export async function readAluno(id = null) {
    if (!id) {
        const alunos = await Query("SELECT * FROM alunos")
        return alunos
    } else {
        const aluno = await Query("SELECT * FROM alunos WHERE id = $1", [id])
        return aluno
    }
}

export async function updateAluno({ id, name, age, email, slug }) {
    const aluno = await Query(
        "UPDATE alunos SET name = $1, age = $2, email = $3, slug = $4, WHERE id = $5",
        [name, age, email, slug, id],
    );
    return aluno;
}

export async function deleteAluno(id) {
    const aluno = await Query("DELETE FROM alunos WHERE id = $1 RETURNING *", [
        id,
    ]);
    return aluno;
}