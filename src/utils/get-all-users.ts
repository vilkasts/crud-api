import { ServerResponse } from 'node:http';

import { ErrorMessages } from '../helpers/enums';
import { getError } from '../helpers/get-error';
import { usersData } from '../database';

type GetAllUsersProps = {
  res: ServerResponse;
};

const getAllUsers = ({ res }: GetAllUsersProps): void => {
  try {
    res
      .writeHead(200, { 'Content-Type': 'application/json' })
      .end(JSON.stringify(usersData));
  } catch {
    getError({ res, code: 500, message: ErrorMessages.InternalError });
  }
};

export { getAllUsers };
