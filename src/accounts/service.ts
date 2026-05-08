import { AccountRequestDTO, AccountResponseDTO } from './dto'
import { accountStore, entryStore } from '../db/database'


export class AccountService {
    
    createAccount({id, name, direction}: AccountRequestDTO): AccountResponseDTO {

        id = id || crypto.randomUUID()
        name = name || ''
        return accountStore.create(id, name, direction)
    }

    listAccounts(): AccountResponseDTO[] {
        const accounts = accountStore.findAll().map((account) => {
            const balance = this.getBalance(account.id, account.direction)
            account['balance'] = balance
            return account
        })
        return accounts
    }

    getAccount(id: string): AccountResponseDTO | undefined {
        return accountStore.findById(id)
    }

    private getBalance(accountId: string, accountDirection: 'credit' | 'debit'): number {
        const entries = entryStore.findByAccount(accountId)
        const balance = entries
        .map((entry) => {
            const amount = entry.amount
            return entry.direction === accountDirection ? amount : -amount
        })
        .reduce((total, cents) => total + cents, 0)
        return balance
    }
    
}