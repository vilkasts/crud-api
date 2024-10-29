import { ServerResponse } from 'node:http';

import type { User } from '../helpers/models';
import { ErrorMessages } from '../helpers/enums';
import { getError } from '../helpers/get-error';

type DeleteUserProps = {
  res: ServerResponse;
  userId?: string;
  database: User[];
};

const deleteUser = ({ res, userId, database }: DeleteUserProps): void => {
  try {
    const index = database.findIndex((user) => user.id === userId);

    if (index !== -1) {
      database.splice(index, 1);
      res.writeHead(204).end();
    } else {
      getError({ res, code: 404, message: ErrorMessages.UserNotFound });
    }
  } catch {
    getError({ res, code: 500, message: ErrorMessages.InternalError });
  }
};

export { deleteUser };
