import { ServerResponse } from 'node:http';

import { ErrorMessages } from '../helpers/enums';
import { getError } from '../helpers/get-error';
import { usersData } from '../database';

type GetUserByIdProps = {
  res: ServerResponse;
  userId?: string;
};

const getUserById = ({ res, userId }: GetUserByIdProps): void => {
  try {
    const user = usersData.find((user) => user.id === userId);

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
