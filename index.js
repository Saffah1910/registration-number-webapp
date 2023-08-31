import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';
//import pgPromise from 'pg-promise';
import 'dotenv/config';
//need to still import factory function and query file
//import routes


//use pgppromise to cnnect to the databse
// const pgp = pgPromise({})
// const connectionString = process.env.DATABASE_URL;
// const db = pgp(connectionString);

//this creates an instance of your express app
const app = express();
//need nstance of factory function and query file

//create instance for routes

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

app.get('/', function (req, res){
    res.render('index')
})


//make PORT a variable so that it can be chnaged in terminal
const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log("App started at port", PORT);
});