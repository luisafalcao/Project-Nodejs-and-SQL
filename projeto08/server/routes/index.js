import alunos from "./alunos.js"
import cursos from "./cursos.js"

const UseRouter = app => {
    app.use("/alunos", alunos);
    app.use("/cursos", cursos);
}

export default UseRouter;