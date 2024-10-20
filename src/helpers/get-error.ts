import type { ServerResponse } from 'node:http';

import { ErrorMessages } from './enums';

type GetErrorProps = {
  res: ServerResponse;
  code?: number;
  message?: string;
};

const getError = ({
  res,
  code = 500,
  message = ErrorMessages.InternalError,
}: GetErrorProps): void => {
  res
    .writeHead(code, { 'Content-Type': 'application/json' })
    .end(JSON.stringify({ message: message }));
};

export { getError };
