import { getRepository } from "typeorm" // Para manipular o repositorio
import { Request, Response } from "express" // Para tipar os valores de entrada
import { User } from "../entity/User" // Entidade para ser manipulada
import * as bcrypt from 'bcrypt' // Responsavel pela cryptografia 
import * as jwt from 'jsonwebtoken' // Responsavel por gerar o web token

// ******************************************************************************************************* \\
// !! Função organizada por order do fluxo de usuário


// Função responsável por criar o usuário
export const signup = async (request: Request, response: Response) => {
    // Obtendo valores do body da requisição
    const { name, email, password } = request.body

    // Cryptografando a senha obtida no body da requisição
    const passwordHash = await bcrypt.hash(password, 8)

    // Savando objeto na ententidade "User"
    const user = await getRepository(User).save({
        name,
        email,
        password: passwordHash
    })

    // Retornando o objeto criado
    return response.json(user)
}

// Função responsável por validar ás credencias
export const signin = async (request: Request, response: Response) => {
    // Obtendo valores do body da requisição
    const { email, password } = request.body

    // Buscando usuario
    const user = await getRepository(User).find({
        where: {
            email
        }
    })

    // Verificando se encontrou resultado
    if(user.length === 1) {
        // Comparando a senha enviada com a senha salva cryptografada
        if(await bcrypt.compare(password, user[0].password)) {
            // Gerando um token
            const token = jwt.sign({ id: user[0].id }, process.env.APP_SECRET, {
                expiresIn: '1d'
            })

            // Construindo objeto de retorno
            const data = {
                id: user[0].id,
                name: user[0].name,
                email: user[0].email,
                token
            }

            // Retorno se tudo der certo
            return response.json(data)
        } else {
            // Retorno se a senha estiver errada
            return response.status(404).json({ message: 'Invalid password' })
        }
    } else {
        // Retorno se não achar o usuario
        return response.status(404).json({ message: 'User not found' })
    }
}

// Função responsável por listar todos os usuários
export const show = async (request: Request, response: Response) => {
    // Busca todos os usuarios
    const user = await getRepository(User).find()

    // Retorna resultado da busca
    return response.json(user)
}
