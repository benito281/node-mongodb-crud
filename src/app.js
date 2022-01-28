import express from  'express';
import { create } from 'express-handlebars';
import path from 'path';
import morgan from 'morgan';
import flash from 'connect-flash';
import session from 'express-session';
import indexRoutes from './routes/index.routes';

//Inicialization
const app = express();

//setting
app.set('port', process.env.PORT || 4500);
app.set('views', path.join(__dirname, 'views'));
const exphbs = create({
    
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main',
    extname: '.hbs'

});
app.engine('.hbs', exphbs.engine);
app.set('view engine', '.hbs');


//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());


//Gloval variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next(); 
});

//static files
app.use(express.static(path.join(__dirname, 'public')));


//Routes
app.use(indexRoutes);


export default app; 