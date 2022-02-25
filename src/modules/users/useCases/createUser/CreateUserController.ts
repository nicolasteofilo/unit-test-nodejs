import { Request, Response } from 'express';
import { UsersRepository } from '../../repositories/UsersRepository';

import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async execute(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const usersRepository = new UsersRepository()
    const createUserUseCase = new CreateUserUseCase(usersRepository);

    const user = await createUserUseCase.execute({
      name,
      email,
      password
    });

    return response.status(201).json(user);
  }
}
