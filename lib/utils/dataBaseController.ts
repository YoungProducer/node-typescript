import * as mongoose from 'mongoose';

export namespace DataBaseController {
    export const connect = async (db_name: string) => {
        try {
            await mongoose.connect(`mongodb://localhost:27017/${db_name}`, { useNewUrlParser: true, useUnifiedTopology: true });
        } catch (error) {
            throw error;
        }
    };

    export const disconnect = async() => {
        try {
            await mongoose.disconnect();
            console.log('disconnect');
        } catch (error) {
            throw error;
        }
    };
}
