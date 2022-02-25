import './config/env'
import "reflect-metadata"
import { createConnection } from "typeorm"
import * as express from "express"
import routes from "./routes"

// Creating an instance
// Criando uma instância 
const app = express()

// Creating a connection
// Criando uma conexão
createConnection()

// Configuring requests to json
// Configurando as requisições para json
app.use(express.json())

// Configuring the routes
// Configurando as rotas
app.use(routes)

// Setting the connection port
// Configurando a porta da conexão
app.listen(process.env.PORT)