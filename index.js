import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';
import pgPromise from 'pg-promise';
import 'dotenv/config';
import regNumQuery from './services/query.js';
import RegistrationNumbers from './registration_factory.js';
//need to still import factory function and query file
//import routes
import showHome from './routes/indexRoutes.js';
import AddRegNums from './routes/regNumRoutes.js';


//use pgppromise to cnnect to the databse
const connectionString = process.env.DATABASE_URL;
const pgp = pgPromise({})

const db = pgp(connectionString);

//this creates an instance of your express app
const app = express();
//need nstance of factory function and query file
const dbLogic = regNumQuery(db);
const frontEndLogic = RegistrationNumbers(dbLogic);
//create instance for routes
const indexRoute = showHome(dbLogic);
const regNumRoute = AddRegNums(dbLogic,frontEndLogic)

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

app.get('/', indexRoute.home);
app.post('/registrations',regNumRoute.add);
app.post('/clear',regNumRoute.clearAll);
app.post('/filter',regNumRoute.filterTowns)



//make PORT a variable so that it can be chnaged in terminal
const PORT = process.env.PORT || 3012;

app.listen(PORT, function () {
    console.log("App started at port", PORT);
});