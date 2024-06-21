import Query from "../config/database.js";

export async function createCurso({ name, price, available = true, slug }) {
    const novoCurso = await Query(
        "INSERT INTO curso(name,price,available,slug) VALUES($1,$2,$3,$4) RETURNING *",
        [name, price, available, slug],
    );
    return novoCurso;
}

export async function readCurso(id = null) {
    if (!id) {
        const cursos = await Query("SELECT * FROM curso")
        return cursos
    } else {
        const curso = await Query("SELECT * FROM curso WHERE id = $1", [id])
        return curso
    }
}

export async function changeStatus({ id, status }) {
    const curso = await Query(
        "UPDATE curso SET status = $1 WHERE id = $2",
        [status, id]
    );
    return curso
}

export async function updateCurso({ id, name, price }) {
    const curso = await Query(
        "UPDATE curso SET name = $1, price = $2 WHERE id = $3",
        [name, price, id],
    );
    return curso;
}

export async function deleteCurso(id) {
    const curso = await Query("DELETE FROM curso WHERE id = $1 RETURNING *", [
        id,
    ]);
    return curso;
}