import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';

// Custom imports
import mainRouter from './routes';

const app: express.Application = express();

dotenv.config();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', mainRouter);

app.listen(app.get('port'), () => {
    console.log(`App listening to ${app.get('port')}...`, app.get('env'));
});

export default app;
