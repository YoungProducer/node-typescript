import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import { prop, Typegoose, ModelType, InstanceType } from 'typegoose';

// Custom imports
import mainRouter from './routes';
import { connectToDb } from './dbconnect';
import UserController from './models/user';

const app: express.Application = express();
const { PORT = 8080 } = process.env;

dotenv.config();

connectToDb();

const dataBase: mongoose.Connection = mongoose.connection;
dataBase.on('error', console.error.bind(console, 'connection error:'));
dataBase.once('open', () => {
    console.log('connected');
});

// class User extends Typegoose {
//     @prop({ index: true })
//     id: number;

//     @prop()
//     email?: string;

//     @prop({
//         required: true,
//         index: true,
//     })
//     userName!: string;

//     @prop({ required: true })
//     password!: string;
// }

// const UserModel = new User().getModelForClass(User);

// (async () => {
//     const u = await UserModel.create({ userName: "heep", password: "hello" });
// })();
const user = new UserController({ userName: 'heep', password: 'as' });
user.plugin
user.save((err, user) => {
    if (err) return console.error(err);
});

app.set('port', PORT);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', mainRouter);

if (require.main === module) {
    app.listen(app.get('port'), () => {
        console.log(`App listening to ${app.get('port')}...`, app.get('env'));
    });
}

export default app;
