type IResponseHandlerDTO = {
  message: string;
  status: number;
  data?: {} | [];
};

type IResponse = {
  message: string;
  status: string;
  statusCode: number;
  data: {} | [];
};

export function responseHandler({
  message,
  status = 200,
  data = {},
}: IResponseHandlerDTO): IResponse {
  const response: IResponse = {
    message,
    status: "",
    statusCode: status,
    data,
  };

  if (status >= 500) {
    response.status = "INTERNAL_SERVER_ERROR";
  } else if (status >= 400) {
    response.status = "BAD_REQUEST";
  } else if (status >= 300) {
    response.status = "REDIRECT";
  } else if (status >= 200) {
    response.status = "OK";
  } else {
    response.status = "UNKNOWN";
  }

  return response;
}
