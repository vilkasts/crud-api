import { IncomingMessage, ServerResponse } from 'node:http';

import { usersData } from '../database';

const getAllUsers = (_req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(usersData));
};

export { getAllUsers };
