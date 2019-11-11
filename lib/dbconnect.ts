import * as mongoose from 'mongoose';

export const connectToDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (error) {
        console.log(error);
    }
};
