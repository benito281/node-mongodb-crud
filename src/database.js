import { connect } from 'mongoose';
import { connectMongo } from './config'

(
    async () => {
        try{
            const db = await connect(connectMongo);
            console.log('Database connected', db.connection.name);
        }
        catch(error){
            console.log(error);
        }
    }
)();


