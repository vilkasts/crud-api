import type { IncomingMessage, ServerResponse, Server } from 'node:http';
import { createServer } from 'node:http';
import { config } from 'dotenv';

import { requestHandler } from './helpers/request-handler';
import { usersData } from './database';

config();

const PORT: number = parseInt(process.env.PORT ?? '4000');

const server: Server<typeof IncomingMessage, typeof ServerResponse> =
  createServer((req: IncomingMessage, res: ServerResponse): void =>
    requestHandler(req, res, usersData),
  );

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
