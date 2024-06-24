import Database from "../config/database.js";
import { converterFormatoData } from "../config/utils.js";

// CADASTRAR CURSO
export async function createCurso({ nome, descricao, capa, inscricoes, inicio }) {
    try {
        const data_inicio = await converterFormatoData(inicio)

        const novoCurso = await Database.curso.create({
            data: {
                nome,
                descricao,
                capa,
                inscricoes,
                inicio: new Date(data_inicio)
            }
        })

        return novoCurso
    } catch (error) {
        console.error('Erro ao criar curso.', error);
        throw new Error('Erro ao criar curso.');
    }
}

// GET CURSO
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
export async function getCursoByUsuario(id) {
    try {
        const cursosInscritos = await Database.cursoUsuario.findMany({
            where: {
                AND: {
                    usuarioId: {
                        equals: id
                    },
                    status: {
                        equals: "inscrito"
                    }
                }
            }
        });

        const cursosCancelados = await Database.cursoUsuario.findMany({
            where: {
                AND: {
                    usuarioId: {
                        equals: id
                    },
                    status: {
                        equals: "cancelado"
                    }
                }
            }
        })

        return { cursosInscritos, cursosCancelados };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// INSCREVER EM CURSO
export async function inscreverEmCurso(currentUserId, searchedCursoId) {
    try {
        const result = await Database.cursoUsuario.create({
            data: {
                usuarioId: currentUserId,
                cursoId: searchedCursoId,
                status: "inscrito",
            },
            select: {
                usuarioId: true,
                cursoId: true,
                status: true,
                created_at: true
            }
        })

        const updatedCurso = await Database.curso.update({
            where: {
                id: searchedCursoId
            },
            data: {
                inscricoes: {
                    increment: 1
                }
            }
        })


        return { result, updatedCurso };
    } catch (error) {
        console.error('Erro na inscrição. Tente novamente.', error);
        throw error;
    }
}

// CANCELAR INSCRIÇÃO EM CURSO
export async function cancelarInscricaoEmCurso(currentUserId, searchedCursoId) {
    const result = await Database.cursoUsuario.updateMany({
        where: {
            usuarioId: currentUserId,
            cursoId: searchedCursoId
        },
        data: {
            status: "cancelado"
        }
    })

    const updatedCursoUsuario = await Database.cursoUsuario.findMany({
        where: {
            usuarioId: currentUserId,
            cursoId: searchedCursoId
        },
        select: {
            usuarioId: true,
            cursoId: true,
            status: true,
            updated_at: true
        }
    });

    const updatedCurso = await Database.curso.update({
        where: {
            id: searchedCursoId
        },
        data: {
            inscricoes: {
                decrement: 1
            }
        }
    })
    return { updatedCursoUsuario, updatedCurso }
}