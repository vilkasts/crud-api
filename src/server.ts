import type { IncomingMessage, ServerResponse, Server } from 'node:http';
import { createServer } from 'node:http';
import { cpus } from 'node:os';
import { config } from 'dotenv';

import { requestHandler } from './helpers/request-handler';

config();

const coresQuantity: number = cpus().length;
const PORT: string = process.env.PORT ?? '4000';

// TODO: @@@ Remove after
console.log('coresQuantity', coresQuantity);

const server: Server<typeof IncomingMessage, typeof ServerResponse> =
  createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
