import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase";

let createStatementUseCase: CreateStatementUseCase;
let usersRepository: InMemoryUsersRepository;
let statementRepository: InMemoryStatementsRepository;

describe('Create Statement UseCase', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        statementRepository = new InMemoryStatementsRepository();
        createStatementUseCase = new CreateStatementUseCase(usersRepository, statementRepository);
    })

    it('should be able to create a statement', async () => {
        const user = await usersRepository.create({
            name: 'John Doe',
            email: 'John@gmail.com',
            password: '123456'
        });

        const statement = await createStatementUseCase.execute({
            user_id: String(user.id),
            type: 'deposit',
            amount: 100,
            description: 'deposit'
        })

        expect(statement).toHaveProperty('id');
    })
})