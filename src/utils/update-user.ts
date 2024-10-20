import { IncomingMessage, ServerResponse } from 'node:http';

import { User, usersData } from '../database';
import { mockedUser } from './mockedData';

const dataValidator = (data: User): string => {
  if (typeof data !== 'object' || Array.isArray(data)) {
    return 'Incorrect data format';
  }

  for (const key in data) {
    if (!(key in mockedUser)) {
      return '';
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

const updateUser = (
  req: IncomingMessage,
  res: ServerResponse,
  userId: string,
) => {
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
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: errorMessage }));
          } else {
            const updatedUser = { ...usersData[index], ...data };
            usersData[index] = updatedUser;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(updatedUser));
          }
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ message: 'User not found' }));
        }
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Invalid JSON format' }));
      }
    });
};

export { updateUser };
