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
    data.password = await this.encryptPassword(data.password);

    return this.repository.create({ ...data, username: data.email });
  }

  async show(id: string): Promise<ShowUserDto | undefined> {
    return this.repository.find(id);
  }

  async findForAuth(username: string): Promise<User | undefined> {
    return this.repository.findByUsername(username);
  }

  async findUniqueByEmail(email: string): Promise<ShowUserDto | undefined> {
    return this.repository.findUniqueByEmail(email);
  }
}
