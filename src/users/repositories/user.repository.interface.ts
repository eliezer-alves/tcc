import { IGenericRepository } from 'src/shared/repositories';
import { User } from '../entities/user.entity';

export abstract class IUserRepository extends IGenericRepository<User> {
  abstract findByUsername(username: string): Promise<User | null>;
  abstract findUniqueByEmail(email: string): Promise<User | null>;
}
