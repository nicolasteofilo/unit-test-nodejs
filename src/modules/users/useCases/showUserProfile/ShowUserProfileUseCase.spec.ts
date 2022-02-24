import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { ShowUserProfileError } from "./ShowUserProfileError";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let showUserProfileUseCase: ShowUserProfileUseCase;
let usersRepository: InMemoryUsersRepository;

describe('show user profile Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        showUserProfileUseCase = new ShowUserProfileUseCase(usersRepository)
    })

    it('should be able to view a user profile', async () => {
        const user = await usersRepository.create({
            name: 'test user',
            email: 'testuser@gmail.com',
            password: '123456'
        })

        const viewUser = await showUserProfileUseCase.execute(String(user.id))

        expect(viewUser.id).toBe(user.id)
    })

    it('should not be to view user if users not exists', () => {
        expect(showUserProfileUseCase.execute('123')).rejects.toBeInstanceOf(ShowUserProfileError)
    })
})