import type { IncomingMessage, ServerResponse, Server } from 'node:http';
import { createServer } from 'node:http';
import { cpus } from 'node:os';
import { config } from 'dotenv';

import { requestHandler } from './helpers/request-handler';
import { usersData } from './database';

config();

const coresQuantity: number = cpus().length;
const PORT: string = process.env.PORT ?? '4000';

console.log('coresQuantity', coresQuantity);

const server: Server<typeof IncomingMessage, typeof ServerResponse> =
  createServer((req: IncomingMessage, res: ServerResponse): void =>
    requestHandler(req, res, usersData),
  );

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
