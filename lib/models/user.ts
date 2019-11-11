import * as mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import { prop, Typegoose, plugin } from 'typegoose';

export interface IUserModel {
    id: number;
    userName: string;
    password: string;
}

export interface Credentials {
    userName: string;
    password: string;
}

@plugin(uniqueValidator)
class UserModel extends Typegoose implements IUserModel {
    @prop({ index: true })
    public id: number;

    @prop({
        required: true,
        unique: true,
    })
    public userName!: string;

    @prop({ required: true })
    public password!: string;
}

export default new UserModel().getModelForClass(UserModel);

// export interface IUser extends Document {
//     id: number;
//     userName?: string;
//     password?: string;
// }

// const UserSchema: Schema = new Schema({
//     id: {
//         type: mongoose.Types.ObjectId,
//         index: true,
//     },
//     userName: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
// });

// UserSchema.plugin(uniqueValidator);

// export default mongoose.model<IUser>('User', UserSchema);
