import express from "express";
import cors from "cors";
import Router from "./routes/index.js"
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json())

Router(app);

app.listen(port, () => {
    console.log(`Servidor em http://localhost:${port}`)
})