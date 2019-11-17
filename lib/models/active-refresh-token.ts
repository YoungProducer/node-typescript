import * as mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export interface IRefreshToken extends Document {
    id: number;
    token: string;
    tokenId: string;
}

const RefreshTokenSchema: Schema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        index: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    token: {
        type: String,
        required: true,
    },
    tokenId: {
        type: String,
        required: true,
        unique: true,
    },
});

RefreshTokenSchema.plugin(uniqueValidator);

export default mongoose.model<IRefreshToken>('RefreshToken', RefreshTokenSchema);
