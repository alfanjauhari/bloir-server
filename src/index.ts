import { config } from 'dotenv';
import app from './app';
import { database as connectDb, logger } from './libs';

config();

function normalizePort(port: string | undefined) {
  switch (typeof port) {
    case 'string':
      return parseInt(port, 10);
    case 'undefined':
      return 4000;
    default:
      return port;
  }
}

async function runServer(): Promise<void> {
  const port: number = normalizePort(process.env.PORT);

  await connectDb(process.env.DB_URL);

  app.listen(port, () =>
    logger.info(`Successfully running application on port ${port}`)
  );
}

runServer();
