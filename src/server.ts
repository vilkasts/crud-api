import { createServer } from 'node:http';

import { requestHandler } from './helpers/request-handler';

const PORT = 4000;

const server = createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
