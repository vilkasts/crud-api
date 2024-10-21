import { ServerResponse } from 'node:http';

import type { User } from '../helpers/models';
import { ErrorMessages } from '../helpers/enums';
import { getError } from '../helpers/get-error';

type GetAllUsersProps = {
  res: ServerResponse;
  database: User[];
};

const getAllUsers = ({ res, database }: GetAllUsersProps): void => {
  try {
    res
      .writeHead(200, { 'Content-Type': 'application/json' })
      .end(JSON.stringify(database));
  } catch {
    getError({ res, code: 500, message: ErrorMessages.InternalError });
  }
};

export { getAllUsers };
