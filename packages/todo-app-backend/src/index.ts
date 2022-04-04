import dotenv from 'dotenv';
import app from './app';
import { MongoClientInstance } from './database/mongo-client-instance';

dotenv.config();

const port = process.env.APP_PORT ?? 4000;
const mongoUri = process.env.MONGO_URI ?? '';
const dbName = process.env.DDBB_NAME ?? '';

/**
 * Starts the database pool connection, saving it into the app
 */
MongoClientInstance.getInstance(mongoUri, dbName)
    .then(instance => {
        app.locals.db = instance?.db;
        app.listen(port, () => console.log(`⚡️[server]: Server listening in port ${port}`));
    });