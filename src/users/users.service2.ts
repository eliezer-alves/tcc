/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { ShowUserDto } from './dto/show-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { IUserRepository } from './repositories';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private repository: IUserRepository) {}

  private async encryptPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    return hash;
  }

  async create(data: CreateUserDto) {
    // data.password = await this.encryptPassword(data.password);

    // Simulando uma resposta constante para evitar o acesso ao banco
    return {
      id: 'mockId',
      name: 'mockName',
      username: data.email,
      email: data.email,
    };
  }

  async findOne(id: string): Promise<ShowUserDto | undefined> {
    // Simulando uma resposta constante para evitar o acesso ao banco
    return {
      id: 'mockId',
      name: 'mockName',
      username: 'mockUsername',
      email: 'mockEmail@example.com',
    };
  }

  async findForAuth(username: string): Promise<User | undefined> {
    // Simulando uma resposta constante para evitar o acesso ao banco
    return { id: 'mockId', username, password: 'mockPassword' } as User;
  }

  async findUniqueByEmail(email: string): Promise<ShowUserDto | undefined> {
    // Simulando uma resposta constante para evitar o acesso ao banco
    return { id: 'mockId', name: 'mockName', username: 'mockUsername', email };
  }

  async search(term: string): Promise<Array<ShowUserDto> | undefined> {
    // Simulando uma resposta constante para evitar o acesso ao banco
    return [
      {
        id: 'mockId1',
        name: 'mockName1',
        username: 'mockUsername1',
        email: 'mockEmail1@example.com',
      },
      {
        id: 'mockId2',
        name: 'mockName2',
        username: 'mockUsername2',
        email: 'mockEmail2@example.com',
      },
    ];
  }

  async countUsers(): Promise<number> {
    // Simulando uma resposta constante para evitar o acesso ao banco
    return 42;
  }
}
