import { NoTimestamps } from '../types';
import { IQueryRepository } from './query.repository.interface';

export abstract class IGenericRepository<T> extends IQueryRepository<T> {
  abstract create(data: Omit<NoTimestamps<T>, 'id'>): Promise<T>;
  abstract update(
    id: string | number,
    data: Partial<Omit<NoTimestamps<T>, 'id'>>,
  ): Promise<T>;
  abstract remove(id: string | number): Promise<T>;
}
