export abstract class IQueryRepository<T> {
  abstract find(id: string | number): Promise<T | null>;

  abstract list(): Promise<T[]>;
}
