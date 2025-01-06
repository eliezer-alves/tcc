import { Injectable } from '@nestjs/common';
import { ShowUserDto } from './dto/show-user.dto';
import { User } from './entities/user.entity';
import { IUserRepository } from './repositories';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private repository: IUserRepository) {}

  async create(data: CreateUserDto) {
    return this.repository.create({ ...data, username: data.email });
  }

  async findOne(id: string): Promise<ShowUserDto | undefined> {
    return this.repository.find(id);
  }

  async findForAuth(username: string): Promise<User | undefined> {
    return this.repository.findByUsername(username);
  }

  async findUniqueByEmail(email: string): Promise<ShowUserDto | undefined> {
    return this.repository.findUniqueByEmail(email);
  }

  async search(term: string): Promise<Array<ShowUserDto> | undefined> {
    return this.repository.search(term);
  }

  async countUsers(): Promise<number> {
    return this.repository.count();
  }
}
