import { Router, Request, Response } from "express"
import { store, show } from './controller/UserController'

const routes = Router()

routes.get('/', (request: Request, response: Response) => {
    return response.json({ message: 'Hello World!'})
})

routes.post('/users', store)
routes.get('/users', show)

export default routes