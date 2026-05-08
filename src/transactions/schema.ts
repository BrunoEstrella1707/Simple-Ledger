import { z } from 'zod'


export const EntrySchema = z.object({
    id: z.uuidv4().optional(),
    accountId: z.uuidv4(),
    amount: z.number().positive(),
    direction: z.enum(['credit', 'debit']),
})


export const TransactionSchema = z.object({
    body: z.object({
        id: z.uuidv4().optional(),
        name: z.string().optional(),
        entries: z.array(EntrySchema).nonempty()
    })
})