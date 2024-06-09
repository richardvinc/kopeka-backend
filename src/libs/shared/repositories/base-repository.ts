export interface BaseRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(report: T): Promise<T>;
  update(report: T): Promise<T>;
  delete(id: string): Promise<void>;
}
