import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepository: InMemoryUsersRepository;
let createUsersUseCase: CreateUserUseCase;

describe('Auth User Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        createUsersUseCase = new CreateUserUseCase(usersRepository);
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)
    })

    it('should be able to auth a user', async () => {
        await createUsersUseCase.execute({
            name: 'John Doe',
            email: 'john@gmail.com',
            password: '123456'
        })

        const authUser = await authenticateUserUseCase.execute({
            email: 'john@gmail.com',
            password: '123456'
        })

        expect(authUser).toHaveProperty('token')
    })

    it('should not be able to auth a user if incorrect email or password', async () => {
        expect(async () => await authenticateUserUseCase.execute({
            email: 'john@gmail.com',
            password: '123456'
        })).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError)
    })
})