import dotenv from 'dotenv';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_CLUSTER_NAME = process.env.MONGO_CLUSTER_NAME || '';
const MONGO_CLUSTER_ID = process.env.MONGO_CLUSTER_ID || '';
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || '';
const MONGO_URL =
    NODE_ENV === 'production'
        ? `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER_NAME}.${MONGO_CLUSTER_ID}.mongodb.net/`
        : 'mongodb://localhost:27017';
const SERVER_PORT = process.env.SERVER_PORT
    ? Number(process.env.SERVER_PORT)
    : 1337;

export const config = {
    mongo: {
        url: MONGO_URL,
        dbName: MONGO_DB_NAME
    },
    server: {
        port: SERVER_PORT,
        env: NODE_ENV
    }
};
