export interface Entry {
  id: string;
  accountId: string;
  amount: number;
  direction: 'credit' | 'debit';
}

// TODO: Change both of the interfaces to a class and add validation to the balance of entries
export class Transaction{
  constructor(
    readonly id: string,
    readonly name: string | null,
    readonly entries: Entry[]
  ){
    if (entries.length === 0){
      throw new Error('A transaction must have at least one entry')
    }

    if (!this.isBalanced()){
      throw new Error('A transaction must be balanced')
    }
  }

  private isBalanced(): boolean {
    const balance = this.entries
    .map((entry) => {
      const amount = entry.amount
      return entry.direction === 'debit' ? amount : -amount
    })
    .reduce((total, amount) => total + amount, 0)
    
    return balance === 0
  }

}


export interface TransactionRequest {
  id?: string | null;
  name?: string | null;
  entries: Entry[];
}

export interface TransactionResponse {
  id: string;
  name: string;
  entries: Entry[];
}

