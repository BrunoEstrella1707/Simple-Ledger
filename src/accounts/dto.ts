export interface AccountRequestDTO{
    id?: string | null;
    name?: string | null;
    direction: 'credit' | 'debit';
}

export interface AccountResponseDTO{
    id: string;
    name: string;
    balance: number;
    direction: 'credit' | 'debit';
}

export interface AccountWithBalanceDTO{
    id: string;
    name: string | null;
    balance: number;
    direction: 'credit' | 'debit';
}