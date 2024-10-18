import { IncomingMessage, ServerResponse } from 'node:http';
import { validate } from 'uuid';

import { getAllUsers, getUserById } from '../utils';
import { RequestMethods } from './enums';

const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;

  if (method === RequestMethods.GET && url?.startsWith('/api/users')) {
    const userId = url.split('/')[3];

    if (userId) {
      if (!validate(userId)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Invalid userId format' }));
      }
      return getUserById(req, res, userId);
    } else {
      return getAllUsers(req, res);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: 'Not Found' }));
  }
};

export { requestHandler };
