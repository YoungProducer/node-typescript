import * as mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export interface IUser extends Document {
    id: number;
    userName?: string;
    password?: string;
}

const UserSchema: Schema = new Schema({
    id: {
        type: mongoose.Types.ObjectId,
        index: true,
    },
    userName: {
        type: String,
        required: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.plugin(uniqueValidator);

export default mongoose.model<IUser>('User', UserSchema);
