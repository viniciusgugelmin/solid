interface ICreateUserUseCase {
  execute(data: ICreateUserRequestDTO): Promise<void>;
}

type ICreateUserRequestDTO = {
  name: string;
  email: string;
  password: string;
};

export { ICreateUserUseCase, ICreateUserRequestDTO };
