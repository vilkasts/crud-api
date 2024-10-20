import { createServer } from 'node:http';
import { config } from 'dotenv';

import { requestHandler } from './helpers/request-handler';

config();

const PORT = process.env.PORT ?? 4000;

const server = createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
