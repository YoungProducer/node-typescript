import * as path from 'path';
import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as cors from 'cors';
import * as csrf from 'csurf';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

// Custom imports
import { handleError } from './utils/errorHandler';
import mainRouter from './routes';

// Get env congif
dotenv.config();

const app: express.Application = express();
const { PORT = 4000 } = process.env;

// Set up CORS policy
const corsOptions = {
    origin: 'http://localhost:8080',
    methods: ["POST", "PATCH"],
    credentials: true,
    maxAge: 3600,
};

// Set up CSRF protection
export const csrfProtection = csrf({ cookie: true });

// Set up port
app.set('port', PORT);

// Enable cookie parser
app.use(cookieParser());

// Enable body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allows to override express methods
app.use(methodOverride());

// Enable express json parsing
app.use(express.json());

// Set up cors policy
app.use(cors(corsOptions));

// Include all routes
app.use('/', mainRouter);

// Enable custom error handler
app.use((
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    handleError(err, res);
});

// Enable Helmet
app.use(helmet({
    xssFilter: true,
    hidePoweredBy: true,
    // contentSecurityPolicy: true,
    ieNoOpen: true,
    referrerPolicy: true,
    permittedCrossDomainPolicies: true,
    frameguard: true,
}));

if (require.main === module) {
    app.listen(app.get('port'), () => {
        console.log(`App listening to ${app.get('port')}...`, app.get('env'));
    });
}

export default app;
