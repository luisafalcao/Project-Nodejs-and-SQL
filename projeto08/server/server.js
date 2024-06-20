const express = require("express");
const cors = require("cors")

require('dotenv').config()

const app = express();
const PORT = process.env.PORT;

app.use(cors());


app.get("/", (req, res) => {
    res.json({ message: "Hello", people: ["John", "Joe", "Jim"] })
})

app.listen(PORT, () => {
    console.log(`Servidor em http://localhost:${PORT}`)
})