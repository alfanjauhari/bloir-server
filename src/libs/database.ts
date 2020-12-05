import { connect } from 'mongoose';
import logger from './logger';

async function connectDb(
  dbUrl: string | undefined = 'mongodb://localhost:27017'
): Promise<void> {
  try {
    await connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    logger.info('Successful connect to database');
  } catch (error) {
    logger.error('Failure connect to database', error);
  }
}

export default connectDb;
