import { config } from 'dotenv';

config()

export const connectMongo = process.env.MONGO_CONNECT;