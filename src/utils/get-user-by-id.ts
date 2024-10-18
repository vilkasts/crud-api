import { IncomingMessage, ServerResponse } from 'node:http';

import { usersData } from '../database';

const getUserById = (
  _req: IncomingMessage,
  res: ServerResponse,
  userId?: string,
) => {
  const user = usersData.find((user) => user.id === userId);
  if (user) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
  }
};

export { getUserById };
