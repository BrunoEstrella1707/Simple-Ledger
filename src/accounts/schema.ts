import { z } from 'zod'


export const AccountSchema = z.object({
    body: z.object({
        id: z.uuidv4().optional(),
        name: z.string().optional(),
        direction: z.enum(['credit', 'debit'])
    })
})