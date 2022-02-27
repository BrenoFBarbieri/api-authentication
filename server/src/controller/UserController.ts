// To manipulate the repository
// Para manipular o repositorio
import { getRepository } from "typeorm"
// To type input values
// Para tipar os valores de entrada
import { Request, Response } from "express" 
// Entity to be manipulated
// Entidade para ser manipulada
import { User } from "../entity/User" 
// Responsible for encryption      
// Responsavel pela criptografia 
import * as bcrypt from 'bcrypt' 
// Responsible for generating the web token
// Responsável por gerar o web token
import * as jwt from 'jsonwebtoken' 

// ******************************************************************************************************* \\
// !! Function arranged in user flow order
// !! Função organizada por ordem do fluxo de usuário


// Function responsible for creating the user
// Função responsável por criar o usuário
export const signup = async (request: Request, response: Response) => {
    // Getting values from the request body
    // Obtendo valores do body da requisição
    const { name, email, password } = request.body

    // Checks if it contains data, if it does not, it returns an error warning and does not proceed with the creation of the user
    // Verifica se contém dados, se não conter, ele retorna um erro avisando e não segue na criação do usuário
    if(!name) {
        return response.status(204).json({ message: 'name is required' })
    } else if (!email) {
        return response.status(204).json({ message: 'email is required' })
    } else if(!password) {
        return response.status(204).json({ message: 'password is required' })
    }

    const checkFirstLastName = name.split(' ')
    if(checkFirstLastName.length <= 1) {
        return response.status(204).json({ message: 'Full name is required' })
    }

    // Encrypting the password obtained in the body of the request
    // Criptografando a senha obtida no body da requisição
    const passwordHash = await bcrypt.hash(password, 8)

    // Saving object in "User" entity
    // Salvando objeto na entidade "User"
    const user = await getRepository(User).save({
        name,
        email,
        password: passwordHash
    })

    // Returning the created object
    // Retornando o objeto criado
    return response.status(201).json(user)
}

// Function responsible for validating credentials
// Função responsável por validar ás credenciais
export const signin = async (request: Request, response: Response) => {
    // Getting values from the request body
    // Obtendo valores do body da requisição
    const { email, password } = request.body

    // Fetching user
    // Buscando usuario
    const user = await getRepository(User).find({
        where: {
            email
        }
    })

    // Checking if found result
    // Verificando se encontrou resultado
    if(user.length === 1) {
        // Comparing the sent password with the encrypted saved password
        // Comparando a senha enviada com a senha salva criptografada
        if(await bcrypt.compare(password, user[0].password)) {
            // Generating a token
            // Gerando um token
            const token = jwt.sign({ id: user[0].id }, process.env.APP_SECRET, {
                expiresIn: '1d'
            })

            // Building return object
            // Construindo objeto de retorno
            const data = {
                id: user[0].id,
                name: user[0].name,
                email: user[0].email,
                token
            }

            // Return if all goes well
            // Retorno se tudo der certo
            return response.json(data)
        } else {
            // Return if password is wrong
            // Retorno se a senha estiver errada
            return response.status(404).json({ message: 'Invalid password' })
        }
    } else {
        // Return if not found user
        // Retorno se não achar o usuario
        return response.status(404).json({ message: 'User not found' })
    }
}

// Role responsible for listing all users
// Função responsável por listar todos os usuários
export const show = async (request: Request, response: Response) => {
    // Search all users
    // Busca todos os usuarios
    const user = await getRepository(User).find()

    // Return search result
    // Retorna resultado da busca
    return response.json(user)
}
