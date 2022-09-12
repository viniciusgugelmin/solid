interface IFactory<T> {
  generate(): T;

  generateMany(amount: number): T[];

  save(items: T[]): Promise<void>;
}

export { IFactory };
