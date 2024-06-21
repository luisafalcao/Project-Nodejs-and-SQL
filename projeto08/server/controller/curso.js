import Query from "../config/database.js";

export async function createCurso({ name, price, available = true, slug }) {
    const novoCurso = await Query(
        "INSERT INTO cursos(name,price,available,slug) VALUES($1,$2,$3,$4) RETURNING *",
        [name, price, available, slug],
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

export async function changeStatus({ id, status }) {
    const curso = await Query(
        "UPDATE cursos SET status = $1 WHERE id = $2",
        [status, id]
    );
    return curso
}

export async function updateCurso({ id, name, price }) {
    const curso = await Query(
        "UPDATE cursos SET name = $1, price = $2 WHERE id = $3",
        [name, price, id],
    );
    return curso;
}

export async function deleteCurso(id) {
    const curso = await Query("DELETE FROM cursos WHERE id = $1 RETURNING *", [
        id,
    ]);
    return curso;
}