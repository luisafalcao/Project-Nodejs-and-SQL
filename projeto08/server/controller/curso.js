import Query from "../config/database.js";

export async function createCurso({ name, email, age, slug }) {
    const novoCurso = await Query(
        "INSERT INTO cursos(name,email,age,slug) VALUES($1,$2,$3,$4) RETURNING *",
        [name, email, age, slug],
    );
    return novoCurso;
}

export async function readCurso(id = null) {
    if (!id) {
        const cursos = await Query("SELECT * FROM cursos")
        return cursos
    } else {
        const curso = await Query("SELECT * FROM cursos WHERE id = $1", [id])
        return curso
    }
}

export async function updateCurso({ id, name, age, email, slug }) {
    const curso = await Query(
        "UPDATE cursos SET name = $1, age = $2, email = $3, slug = $4, WHERE id = $5",
        [name, age, email, slug, id],
    );
    return curso;
}

export async function deleteCurso(id) {
    const curso = await Query("DELETE FROM cursos WHERE id = $1 RETURNING *", [
        id,
    ]);
    return curso;
}