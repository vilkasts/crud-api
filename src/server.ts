import { createServer } from 'node:http';
import { cpus } from 'node:os';
import { config } from 'dotenv';

import { requestHandler } from './helpers/request-handler';

config();

const coresQuantity = cpus().length;
const PORT = process.env.PORT ?? 4000;

console.log('coresQuantity', coresQuantity);

const server = createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
