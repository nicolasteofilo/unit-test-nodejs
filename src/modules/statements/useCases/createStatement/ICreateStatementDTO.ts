import { Statement } from "../../entities/Statement";

export type ICreateStatementDTO = {
    user_id: string;
    type: 'deposit' | 'withdraw';
    amount: number;
    description: string;
}

