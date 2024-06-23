import Database from "../config/database.js";
import { converterFormatoData } from "../config/utils.js";

// CADASTRAR CURSO
export async function createCurso({ nome, descricao, capa, inscricoes, inicio }) {

    const data_inicio = await converterFormatoData(inicio)
        .then(timestamp => {
            return timestamp
        })
        .catch(error => {
            console.error
        });

    const novoCurso = await Database.curso.create({
        data: {
            nome,
            descricao,
            capa,
            inscricoes,
            inicio: data_inicio
        }
    })

    return novoCurso;
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
export async function getCursoByUsuario({ usuarioId }) {
    try {
        const cursos = await Database.curso.findMany({
            where: {
                usuarios: {
                    some: {
                        id: usuarioId
                    }
                }
            }
        });

        return cursos;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// ALTERAR INSCRIÇÃO
// export async function alterarInscricao(currentUserId, searchedCursoId, tableAction, colAction) {
//     const result = await Database.$transaction(async (Database) => {
//         const updatedUsuario = await Database.usuario.update({
//             where: {
//                 id: currentUserId
//             },
//             data: {
//                 cursos: {
//                     [tableAction]: {
//                         id: searchedCursoId
//                     }
//                 }
//             },
//             select: {
//                 nome: true
//             }
//         })

//         const updatedCurso = await Database.curso.update({
//             where: {
//                 id: searchedCursoId
//             },
//             data: {
//                 inscricoes: {
//                     [colAction]: 1
//                 }
//             }
//         })

//         return { updatedUsuario, updatedCurso }
//     })

//     return result
// }


// INSCREVER EM CURSO
export async function inscreverEmCurso(currentUserId, searchedCursoId) {
    const result = await Database.cursoUsuario.create({
        data: {
            usuarioId: currentUserId,
            cursoId: searchedCursoId,
            status: "inscrito"
        }
    })

    return result;
}

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

    return result
}