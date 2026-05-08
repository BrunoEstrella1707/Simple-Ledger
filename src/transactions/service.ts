// import { TransactionRequest, TransactionResponse } from "./dto";
import { Transaction, TransactionRequest } from "./dto"; 
import { transactionStore, accountStore, entryStore } from "../db/database";


export class TransactionService{
    createTransaction({id, name, entries}: TransactionRequest): Transaction {
        id = id || crypto.randomUUID()
        name = name || ''
        const transaction = new Transaction(id, name, entries)
        
        entries.map((entry) => {
            const account = accountStore.findById(entry.accountId)
            if (!account) {
                throw new Error(`Account not found: ${entry.accountId}`)
            }
            entryStore.create(
                entry.id || crypto.randomUUID(), 
                entry.amount, 
                entry.direction, 
                entry.accountId)
        })

        return transactionStore.create(transaction)
    }

    listTransactions(): Transaction[] {
        return transactionStore.findAll()
    }
}