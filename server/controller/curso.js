import Database from "../config/database.js";
import { converterFormatoData } from "../config/utils.js";

// CADASTRAR NOVO CURSO --dev
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
        console.error(error.message);
        throw new Error('Erro ao cadastrar curso.');
    }
}

// BUSCAR CURSO(S)
export async function getCurso(identificador) {
    try {
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
    } catch (error) {
        console.error(error.message);
        throw new Error('Erro ao buscar cursos.');
    }

}

// BUSCAR CURSO POR USUÁRIO
export async function getCursoByUsuario(busca, currentUserId) {
    try {
        let cursosInscritos
        let cursosCancelados
        let cursosDisponiveis

        // cursos inscritos
        if (busca === "inscritos") {
            cursosInscritos = await Database.cursoUsuario.findMany({
                where: {
                    usuarioId: currentUserId,
                    status: "inscrito"
                },
                include: {
                    curso: true,
                },
            })
        }

        // cursos cancelados
        if (busca === "cancelados") {
            cursosCancelados = await Database.cursoUsuario.findMany({
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
        }

        // cursos disponiveis
        if (busca === "disponiveis") {
            cursosDisponiveis = await Database.curso.findMany({
                where: {
                    NOT: {
                        usuarios: {
                            some: {
                                usuarioId: currentUserId,
                            },
                        },
                    },
                },
            })
        }

        return { cursosInscritos, cursosCancelados, cursosDisponiveis };
    } catch (error) {
        console.error(error.message);
        throw new Error('Erro ao buscar cursos.');
    }
}

// FILTRAR CURSO
export async function filtrarCurso(busca) {
    let filter = {}

    filter = {
        nome: {
            contains: busca
        }
    }

    const result = await Database.curso.findMany({
        where: filter
    })

    return result
}
// INSCREVER USUÁRIO EM CURSO
export async function inscreverEmCurso(currentUserId, searchedCursoId) {
    try {
        const curso = await Database.curso.findUnique({
            where: { id: searchedCursoId },
        });

        if (!curso) {
            throw new Error(`Curso de ID ${searchedCursoId} não existe`);
        }

        const result = await Database.cursoUsuario.create({
            data: {
                status: "inscrito",
                usuario: {
                    connect: { id: currentUserId },
                },
                curso: {
                    connect: { id: searchedCursoId },
                }
            }
        })

        await Database.curso.update({
            where: {
                id: searchedCursoId
            },
            data: {
                inscricoes: {
                    increment: 1
                }
            }
        })

        return result;
    } catch (error) {
        console.error(error.message);
        throw new Error('Erro na inscrição.');
    }
}

// CANCELAR INSCRIÇÃO EM CURSO
export async function cancelarInscricaoEmCurso(currentUserId, searchedCursoId) {
    try {
        const cursoUsuarioEntry = await Database.cursoUsuario.findUnique({
            where: {
                usuarioId_cursoId: {
                    usuarioId: currentUserId,
                    cursoId: searchedCursoId,
                },
            },
        });

        if (!cursoUsuarioEntry) {
            throw new Error("Você não está inscrito(a) neste curso");
        }

        const result = await Database.cursoUsuario.update({
            where: {
                usuarioId_cursoId: {
                    usuarioId: currentUserId,
                    cursoId: searchedCursoId,
                },
            },
            data: {
                status: "cancelado"
            }
        })

        await Database.curso.update({
            where: {
                id: searchedCursoId
            },
            data: {
                inscricoes: {
                    decrement: 1
                }
            }
        })

        return result;
    } catch (error) {
        console.error(error.message);
        throw new Error('Erro no cancelamento.');
    }

}