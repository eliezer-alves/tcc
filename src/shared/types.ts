export type NoTimestamps<T> = Omit<T, 'createdAt' | 'updatedAt'>;
