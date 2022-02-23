import { getRepository } from "typeorm"
import { Request, Response } from "express"
import { User } from "../entity/User"
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

export const sign = async (request: Request, response: Response) => {
    const { email, password } = request.body

    const user = await getRepository(User).find({
        where: {
            email
        }
    })

    if(user.length === 1) {
        if(await bcrypt.compare(password, user[0].password)) {
            const token = jwt.sign({ id: user[0].id }, process.env.APP_SECRET, {
                expiresIn: '1d'
            })

            const data = {
                id: user[0].id,
                name: user[0].name,
                email: user[0].email,
                token
            }

            return response.json(data)
        } else {
            return response.status(404).json({ message: 'Invalid password' })
        }
    } else {
        return response.status(404).json({ message: 'User not found' })
    }

    return response.json(user)
}

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