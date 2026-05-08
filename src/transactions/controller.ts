import { validateSchema } from "../middlewares/validateSchema";
import { TransactionService } from "./service";
import { TransactionSchema } from "./schema";
import { Response, Request, Router } from 'express'


export function transactionController(service: TransactionService) {
    const router = Router()

    router.post('/transactions', 
        validateSchema(TransactionSchema),
        (req: Request, res: Response) => {

            const { id, name, entries } = req.body
            const transaction = service.createTransaction({ id, name, entries })
            return res.status(201).json(transaction)
        }
    )

    router.get('/transactions',
        (_: Request, res: Response) => {
            const transactions = service.listTransactions()
            return res.status(200).json(transactions)
        }
    )

    return router
}