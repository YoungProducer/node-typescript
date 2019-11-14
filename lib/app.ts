import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as cors from 'cors';
import * as csrf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

// Custom imports
import { handleError } from './utils/errorHandler';
import mainRouter from './routes';
import { DataBaseController } from './utils/dataBaseController';

// Get env congif
dotenv.config();

const app: express.Application = express();
const { PORT = 8080 } = process.env;

// Set up CORS policy
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ["POST"],
    credentials: true,
    maxAge: 3600,
};

// Set up CSRF protection
export const csrfProtection = csrf({ cookie: true });

// Set up port
app.set('port', PORT);

// Enable cookie parser
app.use(cookieParser());

app.all('/auth/signin', csrfProtection, async (req: Request, res: Response, next: NextFunction) => {
    res.cookie('CSRF-Token', req.csrfToken(), { httpOnly: true, domain: null });
    res.send('ok');
    next();
});

// Include all routes
app.use('/', mainRouter);

// Allows to override express methods
app.use(methodOverride());

// Enable body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(csrf({ cookie: true }));

// Enable express json parsing
app.use(express.json());

// Set up cors policy
app.use(cors(corsOptions));

app.get('/auth/protected', csrfProtection, async (req: Request, res: Response, next: NextFunction) => {
    res.cookie('CSRF-Token', req.csrfToken(), { httpOnly: true, domain: null });
    res.send('ok');
});

app.post('/auth/protected', csrfProtection, async (req: Request, res: Response, next: NextFunction) => {
    res.send('Ok');
});

// Enable custom error handler
app.use((
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.log(req.cookies);
    console.log(err);
    handleError(err, res);
});

if (require.main === module) {
    DataBaseController.connect('users');

    app.listen(app.get('port'), () => {
        console.log(`App listening to ${app.get('port')}...`, app.get('env'));
    });
}

export default app;
