import Query from "../config/database.js";

export async function createAluno({ name, email, age }) {
    const novoAluno = await Query(
        "INSERT INTO alunos(name,email,age) VALUES($1,$2,$3) RETURNING *",
        [name, email, age],
    );
    return novoAluno;
}

export async function readAluno(id = null) {
    if (!id) {
        const alunos = await Query("SELECT * FROM alunos")
        return alunos
    } else {
        const aluno = await Query("SELECT * FROM aluno WHERE id = $1", [id])
        return aluno
    }
}