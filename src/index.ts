import express, { Response, Request, NextFunction } from 'express'
import { accountController } from './accounts/controller'
import { AccountService } from './accounts/service'
import { transactionController } from './transactions/controller'
import { TransactionService } from './transactions/service'

const app = express()

app.use(express.json()) 

const accountService = new AccountService()
app.use(accountController(accountService)) 

const transactionService = new TransactionService()
app.use(transactionController(transactionService))

app.use((error: Error, _: Request, res: Response, __: NextFunction) => {
    if (error instanceof Error) {
        return res.status(400).json({ error: error.message })
    }
    return res.status(500).json({ error: "Internal Server Error" })
})

app.listen(3333, () => {
    console.log(`Server running on port 3333...`)
})