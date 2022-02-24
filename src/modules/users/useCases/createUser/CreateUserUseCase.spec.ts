import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepository: InMemoryUsersRepository;

describe('Create User Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        createUserUseCase = new CreateUserUseCase(usersRepository)
    })

    it('should be able to create a new user', async () => {
        const user = await createUserUseCase.execute({
            name: 'John Doe',
            email: 'john@gmail.com',
            password: '123456'
        })

        expect(user).toHaveProperty('id')
    })

    it('should not be able to create a new user if user already exists', async () => {
        expect(async () => {
            await createUserUseCase.execute({
                name: 'John Doe',
                email: 'john@gmail.com',
                password: '123456'
            })
    
            const user = await createUserUseCase.execute({
                name: 'John Doe',
                email: 'john@gmail.com',
                password: '123456'
            })
        }).rejects.toBeInstanceOf(CreateUserError)
    })
})