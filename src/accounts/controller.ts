import { validateSchema } from "../middlewares/validateSchema"
import { AccountService } from "./service"
import { AccountSchema } from "./schema"
import { Response, Request, Router } from 'express'


export function accountController(service: AccountService) {
    const router = Router()

    router.post('/accounts', 
        validateSchema(AccountSchema), 
        (req: Request, res: Response) => {

            const { id, name, direction } = req.body
            const accounts = service.createAccount({ id, name, direction})
            return res.status(201).json(accounts)

    })

    router.get('/accounts', 
        (_: Request, res: Response) => {
            
            const accounts = service.listAccounts()
            return res.status(200).json(accounts)

    })

    return router
}