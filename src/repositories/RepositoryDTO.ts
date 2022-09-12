interface IRepository<T> {
  findAll(): Promise<T[]>;

  create(item: T): Promise<void>;

  createMany(items: T[]): Promise<void>;
}

export { IRepository };
