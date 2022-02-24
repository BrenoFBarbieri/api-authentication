import { Router, Request, Response } from "express"
import { signup, show, signin } from './controller/UserController'

import { auth } from './middlewares/auth'

const routes = Router()

routes.get('/', (request: Request, response: Response) => {
    return response.json({ message: 'Hello World!'})
})

routes.post('/signup', signup)
routes.post('/signin', signin)

// Middleware para verificar o token, caso não tenha ficara sem acesso. ( PT-BR )
// Middleware to verify the token, in case you don't have it, you won't have access. ( ENG )
routes.use(auth)

routes.get('/users', show)

export default routes