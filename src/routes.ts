import { Router, Request, Response } from "express"
import { store, show, sign } from './controller/UserController'

import { auth } from './middlewares/auth'

const routes = Router()

routes.get('/', (request: Request, response: Response) => {
    return response.json({ message: 'Hello World!'})
})

routes.post('/sign', sign)

// Middleware para verificar o token, caso não tenha ficara sem acesso. ( PT-BR )
// Middleware to verify the token, in case you don't have it, you won't have access. ( ENG )
routes.use(auth)

routes.get('/users', show)
routes.post('/users', store)

export default routes