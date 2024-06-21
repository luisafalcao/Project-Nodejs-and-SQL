import usuario from "./usuarios.js"
import cursos from "./cursos.js"

const UseRouter = app => {
    app.use("/usuario", usuario);
    app.use("/cursos", cursos);
}

export default UseRouter;