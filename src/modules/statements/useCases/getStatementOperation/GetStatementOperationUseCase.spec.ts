import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase"
import { GetStatementOperationError } from './GetStatementOperationError'

let getStatementOperationUseCase: GetStatementOperationUseCase;
let usersRepository: InMemoryUsersRepository;
let statementRepository: InMemoryStatementsRepository;

describe('Get Statement Operation UseCase', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        statementRepository = new InMemoryStatementsRepository();
        getStatementOperationUseCase = new GetStatementOperationUseCase(usersRepository, statementRepository);
    })

    it('should be able to return a statement operation', async () => {
        const user = await usersRepository.create({
            name: 'Nicolas',
            email: 'nicolasteofilodecastro@gmail.com',
            password: '123456'
        });

        const statement = await statementRepository.create({
            user_id: String(user.id),
            description: 'Salaries',
            amount: 1000,
            type: "deposit"
        });

        const statementOperation = await getStatementOperationUseCase.execute({
            user_id: String(user.id),
            statement_id: String(statement.id)
        });

        expect(statementOperation).toHaveProperty('id');
        expect(statementOperation).toHaveProperty('user_id');
        expect(statementOperation).toHaveProperty('description');
    })

    it('should not be able to return a statement operation if user not exists', async () => {
        expect(getStatementOperationUseCase.execute({
            user_id: '123',
            statement_id: '123'
        })).rejects.toBeInstanceOf(GetStatementOperationError.UserNotFound);
    })

    it('should not be able to return a statement operation if statement not exists', async () => {
        expect(async () => {
            const user = await usersRepository.create({
                name: 'Nicolas',
                email: 'nicolasteofilodecastro@gmail.com',
                password: '123456'
            });

            await getStatementOperationUseCase.execute({
                user_id: String(user.id),
                statement_id: '123'
            });
        }).rejects.toBeInstanceOf(GetStatementOperationError.StatementNotFound);
    })
})
        