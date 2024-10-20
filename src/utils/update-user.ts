import { IncomingMessage, ServerResponse } from 'node:http';

import type { User } from '../helpers/models';
import { ErrorMessages } from '../helpers/enums';
import { getError } from '../helpers/get-error';
import { mockedUser } from '../helpers/mocks';
import { usersData } from '../database';

type UpdateUserType = {
  req: IncomingMessage;
  res: ServerResponse;
  userId?: string;
};

const dataValidator = (data: User): string => {
  if (typeof data !== 'object' || Array.isArray(data)) {
    return 'Incorrect data format';
  }

  for (const key in data) {
    if (!(key in mockedUser)) return '';

    if (
      typeof data[key as keyof User] !== typeof mockedUser[key as keyof User]
    ) {
      return `Field '${key}' must be of type '${
        key === 'hobbies'
          ? 'Array of strings'
          : typeof mockedUser[key as keyof User]
      }'`;
    }
  }
  return '';
};

const updateUser = ({ req, res, userId }: UpdateUserType): void => {
  try {
    let body = '';

    req
      .on('data', (chunk) => {
        body += chunk.toString();
      })
      .on('end', () => {
        try {
          const index = usersData.findIndex((user) => user.id === userId);

          if (index !== -1) {
            const data = JSON.parse(body);
            const errorMessage = dataValidator(data);

            if (errorMessage) {
              getError({ res, code: 400, message: errorMessage });
              return;
            } else {
              const updatedUser = { ...usersData[index], ...data };
              usersData[index] = updatedUser;

              res
                .writeHead(200, { 'Content-Type': 'application/json' })
                .end(JSON.stringify(updatedUser));
            }
          } else {
            getError({ res, code: 404, message: ErrorMessages.UserNotFound });
            return;
          }
        } catch {
          getError({
            res,
            code: 400,
            message: ErrorMessages.InvalidJsonFormat,
          });
        }
      });
  } catch {
    getError({ res, code: 500, message: ErrorMessages.InternalError });
  }
};

export { updateUser };
