import { ServerResponse } from 'node:http';

import type { User } from '../helpers/models';
import { ErrorMessages } from '../helpers/enums';
import { getError } from '../helpers/get-error';

type GetUserByIdProps = {
  res: ServerResponse;
  userId?: string;
  database: User[];
};

const getUserById = ({ res, userId, database }: GetUserByIdProps): void => {
  try {
    const user = database.find((user) => user.id === userId);

    if (user) {
      res
        .writeHead(200, { 'Content-Type': 'application/json' })
        .end(JSON.stringify(user));
    } else {
      getError({ res, code: 404, message: ErrorMessages.UserNotFound });
    }
  } catch {
    getError({ res, code: 500, message: ErrorMessages.InternalError });
  }
};

export { getUserById };
