import express from "express"

import __dirname from "./path"

const app = express()
const PORT = 8080
app.listen(PORT, () => console.log(`Escuchando en el puerto: ${PORT}`))