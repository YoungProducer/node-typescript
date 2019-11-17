import * as mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import { prop, Typegoose, plugin } from 'typegoose';

export interface IUserModel extends Document {
    id: number;
    email: string;
    userName: string;
    password: string;
}

export interface Credentials {
    email: string;
    password: string;
}

// @plugin(uniqueValidator)
// class UserModel extends Typegoose implements IUserModel {
//     @prop({ index: true })
//     public id: number;

//     @prop({
//         required: true,
//         unique: true,
//     })
//     public email!: string;

//     @prop({ required: true })
//     public userName!: string;

//     @prop({ required: true })
//     public password!: string;
// }

// export default new UserModel().getModelForClass(UserModel);

// export interface IUser extends Document {
//     id: number;
//     userName?: string;
//     password?: string;
// }

const UserSchema: Schema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        index: true,
    },
    userId: {
        type: Number,
        auto: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshTokens: [
        { type: Schema.Types.ObjectId, ref: 'RefreshToken' },
    ],
});

UserSchema.plugin(uniqueValidator);

export default mongoose.model<IUserModel>('User', UserSchema);
