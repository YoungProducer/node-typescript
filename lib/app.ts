import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as cors from 'cors';
import { HttpError } from 'http-errors';

// Custom imports
import { handleError } from './utils/errorHandler';
import mainRouter from './routes';
import { DataBaseController } from './utils/dataBaseController';

const app: express.Application = express();
const { PORT = 8080 } = process.env;

dotenv.config();
const corsOptions = {
    origin: '*',
    methods: ["POST"],
    credentials: true,
    maxAge: 3600,
};

app.set('port', PORT);
app.use(express.json());
app.use(methodOverride());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', mainRouter);
app.use((
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    handleError(err, res);
});

if (require.main === module) {
    DataBaseController.connect('users');

    app.listen(app.get('port'), () => {
        console.log(`App listening to ${app.get('port')}...`, app.get('env'));
    });
}

export default app;
