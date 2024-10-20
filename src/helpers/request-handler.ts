import { IncomingMessage, ServerResponse } from 'node:http';
import { validate } from 'uuid';

import { ErrorMessages, RequestMethods } from './enums';
import { getError } from './get-error';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '../utils';

const requestHandler = (req: IncomingMessage, res: ServerResponse): void => {
  try {
    const { method, url } = req;

    if (method && url?.startsWith('/api/users')) {
      const userId: string = url.split('/')[3] ?? '';

      switch (method) {
        case RequestMethods.GET:
          if (userId) {
            if (!validate(userId)) {
              getError({
                res,
                code: 400,
                message: ErrorMessages.InvalidUserId,
              });
              break;
            }
            getUserById({ res, userId });
          } else {
            getAllUsers({ res });
          }
          break;

        case RequestMethods.POST:
          createUser({ req, res });
          break;

        case RequestMethods.PUT:
          if (userId) {
            if (!validate(userId)) {
              getError({
                res,
                code: 400,
                message: ErrorMessages.InvalidUserId,
              });
              break;
            }
          } else {
            getError({ res, code: 400, message: ErrorMessages.NoUserId });
            break;
          }
          updateUser({ req, res, userId });
          break;

        case RequestMethods.DELETE:
          if (userId) {
            if (!validate(userId)) {
              getError({
                res,
                code: 400,
                message: ErrorMessages.InvalidUserId,
              });
              break;
            }
          } else {
            getError({ res, code: 400, message: ErrorMessages.NoUserId });
            break;
          }
          deleteUser({ res, userId });
          break;

        default:
          getError({ res, code: 405, message: ErrorMessages.InvalidMethod });
      }
    } else {
      getError({ res, code: 404, message: ErrorMessages.NotFoundError });
    }
  } catch {
    getError({ res, code: 500, message: ErrorMessages.InternalError });
  }
};

export { requestHandler };
