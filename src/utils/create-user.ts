import { IncomingMessage, ServerResponse } from 'node:http';
import { randomUUID } from 'node:crypto';

import { User, usersData } from '../database';
import { mockedUser } from './mockedData';

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

const createUser = (req: IncomingMessage, res: ServerResponse) => {
  let body = '';
  req
    .on('data', (chunk) => {
      body += chunk.toString();
    })
    .on('end', () => {
      try {
        const data = JSON.parse(body);
        const handledData = [];

        if (Array.isArray(data)) {
          for (const element of data) {
            const errorMessage = dataValidator(element);
            if (errorMessage) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({ message: errorMessage }));
            } else {
              element.id = randomUUID();
              handledData.push(element);
            }
          }
        } else {
          const errorMessage = dataValidator(data);
          if (errorMessage) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: errorMessage }));
          } else {
            data.id = randomUUID();
            handledData.push(data);
          }
        }
        usersData.push(...handledData);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(data));
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Invalid JSON format.' }));
      }
    });
};

export { createUser };
