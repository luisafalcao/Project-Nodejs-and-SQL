import Database from "../config/database.js";

// CADASTRAR CURSO
export async function createCurso({ nome, descricao, capa, inscricoes, inicio }) {
    const inicio_formatado = new Date(inicio).toISOString();

    const novoCurso = await Database.curso.create({
        data: {
            nome,
            descricao,
            capa,
            inscricoes: Number(inscricoes),
            inicio: inicio_formatado
        }
    })

    return novoCurso;
}

// GET CURSO POR ID
export async function getCurso(identificador) {
    if (!identificador || Object.keys(identificador).length === 0) {
        const cursos = await Database.curso.findMany();
        return cursos
    } else {
        const [key, value] = Object.entries(identificador)[0]
        const curso = await Database.curso.findUnique({
            where: {
                [key]: value
            }
        })
        return curso
    }
}

// GET CURSO POR USUÁRIO
export async function getCursoByUsuario({ usuarioId }) {
    try {
        const cursos = await Database.curso.findMany({
            where: {
                usuario_curso: {
                    some: {
                        usuario: {
                            id: usuarioId
                        }
                    }
                }
            }
        })

        console.log(cursos)
        return cursos
    } catch (error) {
        console.error(error)
        throw error
    }
}
