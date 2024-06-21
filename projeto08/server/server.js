const express = require("express");
const cors = require("cors")
const pg = require("pg")

require('dotenv').config()

const app = express();
const port = process.env.DB_PORT;

app.use(cors());

async function bancodedados() {
    const client = new pg.Client({
        connectionString: process.env.DB_URL
    })

    await client.connect();

    const resultado = await client.query("SELECT * FROM alunos;")

    await client.end();

    return resultado.rows
}

// app.get("/", (req, res) => {
//     res.json({ message: "Hello", people: ["John", "Joe", "Jim"] })
// })

app.get("/", async (req, res) => {
    const alunos = await bancodedados();
    console.log(alunos)
    res.send({ alunos });
});

app.listen(port, () => {
    console.log(`Servidor em http://localhost:${port}`)
})