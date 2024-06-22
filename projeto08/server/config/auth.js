import JWT from "jsonwebtoken";
import 'dotenv/config'
import { getUsuario } from "../controller/usuario.js";

export default async function isAuth(req, res, next) {
    try {
        const token = req.headers["authorization"] || "";

        if (!token) {
            res.status(401).json({ message: "Token inválido" })
            res.end();
            return
        }

        const decoded = JWT.verify(token.replace("Bearer ", ""), process.env.SECRET);

        const user = await getUsuario({ id: decoded.id });

        if (!user) {
            res.status(401).json({ message: "Token inválido" })
            res.end()
            return
        }

        req.user = user;

        next()
    } catch (error) {
        res.status(401).json({ message: error })
        res.end()
        return
    }
}