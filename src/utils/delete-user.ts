import { IncomingMessage, ServerResponse } from 'node:http';

import { usersData } from '../database';

const deleteUser = (
  _req: IncomingMessage,
  res: ServerResponse,
  userId: string,
) => {
  const index = usersData.findIndex((user) => user.id === userId);

  if (index !== -1) {
    usersData.splice(index, 1);
    res.writeHead(204);
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found.' }));
  }
};

export { deleteUser };
