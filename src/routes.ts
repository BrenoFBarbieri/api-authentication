import { Router, Request, Response } from "express"
import { store, show, sign } from './controller/UserController'

const routes = Router()

routes.get('/', (request: Request, response: Response) => {
    return response.json({ message: 'Hello World!'})
})

routes.post('/sign', sign)

routes.get('/users', show)
routes.post('/users', store)

export default routes