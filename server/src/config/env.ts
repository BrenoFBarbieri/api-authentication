// Module responsible for handling paths
// Módulo responsável por lidar com os caminhos
import { resolve } from "path"
// Module responsible for handling the .env
// Módulo responsável por lidar com o .env
import { config } from "dotenv"

// Setting path to .env
// Configurando caminho para o .env
config({ path: resolve(__dirname, '../../.env') })