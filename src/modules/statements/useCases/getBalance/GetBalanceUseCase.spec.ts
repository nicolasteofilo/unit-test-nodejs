import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { GetBalanceError } from "./GetBalanceError";
import { GetBalanceUseCase } from "./GetBalanceUseCase"

let getBalanceUseCase: GetBalanceUseCase;
let usersRepository: InMemoryUsersRepository;
let statementRepository: InMemoryStatementsRepository;

describe('Get Balance Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        statementRepository = new InMemoryStatementsRepository();
        getBalanceUseCase = new GetBalanceUseCase(statementRepository, usersRepository);
    })

    it('should be able to return a balance user', async () => {
        const user = await usersRepository.create({
            name: 'Nicolas',
            email: 'nicolasteofilo@gmail.com',
            password: '123456'
        });

        const statement = await statementRepository.create({
            user_id: String(user.id),
            description: 'Salaries',
            amount: 1000,
            type: "deposit"
        });

        const balance = await getBalanceUseCase.execute({
            user_id: String(user.id),
        });

        expect(balance).toHaveProperty('balance')
        expect(balance).toHaveProperty('statement')
    })

    it('should not be able to return balance if users not exists', () => {
        expect(getBalanceUseCase.execute({
            user_id: '123',
        })).rejects.toBeInstanceOf(GetBalanceError)
    })
})