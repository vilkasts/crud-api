import { ServerResponse } from 'node:http';

import { ErrorMessages } from '../helpers/enums';
import { getError } from '../helpers/get-error';
import { usersData } from '../database';

type DeleteUserProps = {
  res: ServerResponse;
  userId?: string;
};

const deleteUser = ({ res, userId }: DeleteUserProps): void => {
  try {
    const index = usersData.findIndex((user) => user.id === userId);

    if (index !== -1) {
      usersData.splice(index, 1);
      res.writeHead(204).end();
    } else {
      getError({ res, code: 404, message: ErrorMessages.UserNotFound });
    }
  } catch {
    getError({ res, code: 500, message: ErrorMessages.InternalError });
  }
};

export { deleteUser };
