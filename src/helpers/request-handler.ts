import { IncomingMessage, ServerResponse } from 'node:http';
import { validate } from 'uuid';

import { createUser, getAllUsers, getUserById } from '../utils';
import { RequestMethods } from './enums';

const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;

  if (url?.startsWith('/api/users')) {
    const userId = url.split('/')[3];

    switch (method) {
      case RequestMethods.GET:
        if (userId) {
          if (!validate(userId)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(
              JSON.stringify({ message: 'Invalid userId format' }),
            );
          }
          return getUserById(req, res, userId);
        } else {
          return getAllUsers(req, res);
        }

      case RequestMethods.POST:
        return createUser(req, res);

      default:
        res.writeHead(405, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Method Not Allowed' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: 'Not Found' }));
  }
};

export { requestHandler };
