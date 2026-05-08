import { Transaction } from "../transactions/dto";

export interface Account {
  id: string;
  name: string;
  balance: number;
  direction: 'credit' | 'debit';
}

interface Entry {
  id: string;
  amount: number;
  direction: 'credit' | 'debit';
  accountId: string;
}


class AccountStore {
  private store: Map<string, Account> = new Map();

  create(id: string, name: string, direction: 'credit' | 'debit'): Account {

    const account: Account = {
      id,
      name,
      balance: 0,
      direction,
    };

    this.store.set(account.id, account);
    return account;
  }

  findById(id: string): Account | undefined {
    return this.store.get(id);
  }

  findAll(): Account[] {
    return [...this.store.values()];
  }

  delete(id: string): boolean {
    return this.store.delete(id);
  }

  get size(): number {
    return this.store.size;
  }
}


class TransactionStore {
  private store: Map<string, Transaction> = new Map();

  create(transaction: Transaction): Transaction {
    // const trasaction =  Transaction = {
    //   id,
    //   name,
    //   entries,
    // }
    // const transaction = new Transaction(id, name, entries)

    this.store.set(transaction.id, transaction);
    return transaction;
  }

  findAll(): Transaction[] {
    return [...this.store.values()];
  }

}

class EntryStore {
  private store: Map<string, Entry> = new Map();

  create(id: string, amount: number, direction: 'credit' | 'debit', accountId: string): Entry {
    const entry: Entry = {
      id,
      amount,
      direction,
      accountId,
    }
    this.store.set(entry.id, entry)
    return entry
  }

  findByAccount(accountId: string): Entry[] {
    //console.log(this.findAll())
    //console.log([...this.store.values()].filter((entry) => entry.accountId === accountId))
    return [...this.store.values()].filter((entry) => entry.accountId === accountId)
  }

  findAll(): Entry[] {
    return [...this.store.values()];
  }

}

export const accountStore = new AccountStore()
export const transactionStore = new TransactionStore()
export const entryStore = new EntryStore()