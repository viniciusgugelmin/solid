interface ICreateUserUseCase {
  execute(data: ICreateUserRequestDTO): Promise<void>;
}

interface ICreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
}

export { ICreateUserUseCase, ICreateUserRequestDTO };
