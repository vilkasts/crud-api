import { IncomingMessage, ServerResponse } from 'node:http';
import { randomUUID } from 'node:crypto';

import type { User } from '../helpers/models';
import { ErrorMessages } from '../helpers/enums';
import { mockedUser } from '../helpers/mocks';
import { getError } from '../helpers/get-error';
import { usersData } from '../database';

type CreateUserProps = {
  req: IncomingMessage;
  res: ServerResponse;
};

const dataValidator = (data: User): string => {
  for (const key in mockedUser) {
    if (!(key in data)) {
      return `Field '${key}' is required.`;
    }
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

const createUser = ({ req, res }: CreateUserProps): void => {
  try {
    let body = '';

    req
      .on('data', (chunk) => {
        body += chunk.toString();
      })
      .on('end', () => {
        try {
          const users = JSON.parse(body);
          const handledUsers = [];

          if (Array.isArray(users)) {
            for (const user of users) {
              const errorMessage = dataValidator(user);
              if (errorMessage) {
                getError({ res, code: 400, message: errorMessage });
                return;
              } else {
                user.id = randomUUID();
                handledUsers.push(user);
              }
            }
          } else {
            const errorMessage = dataValidator(users);
            if (errorMessage) {
              getError({ res, code: 400, message: errorMessage });
              return;
            } else {
              users.id = randomUUID();
              handledUsers.push(users);
            }
          }
          usersData.push(...handledUsers);
          res
            .writeHead(201, { 'Content-Type': 'application/json' })
            .end(JSON.stringify(users));
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

export { createUser };
