import { getRepository } from "typeorm"
import { Request, Response } from "express"
import { User } from "../entity/User"
import * as bcrypt from 'bcrypt'

export const show = async (request: Request, response: Response) => {
    const user = await getRepository(User).find()

    return response.json(user)
}

export const store = async (request: Request, response: Response) => {
    const { name, email, password } = request.body

    const passwordHash = await bcrypt.hash(password, 8)

    const user = await getRepository(User).save({
        name,
        email,
        password: passwordHash
    })

    return response.json(user)
}