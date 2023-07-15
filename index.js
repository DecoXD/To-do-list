//initialize express
const express = require('express');
const exphbs = require('express-handlebars');
const app = express()
const flash = require('express-flash');
const session = require('express-session');
const FileStore = require('session-file-store')(session)
//db
const conn = require('./db/conn');
//models
const User = require('./models/User');

//controllers
const AuthControllers = require('./controllers/AuthControllers');
const AuthRoutes = require('./routes/AuthRoutes');
const { checkAuth } = require('./helpers/checkAuth');
//initialize handlebars
app.engine('handlebars',exphbs.engine());
app.set('view engine', 'handlebars');

//config styles dir
app.use(express.static('public'))

//allow json requests
app.use(express.urlencoded({extends:true}))
app.use(express.json())

app.use(session({
    name:'session',
    secret: 'my_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: function() {},
        path: require('path').join(require('os').tmpdir(),'sessions')
    }),
    cookie:{
        secure:false,
        maxAge:36000000,
        expires: new Date(Date.now() + this.maxAge),
        httpOnly:true
    }
}))

app.use(flash())

app.use((req,res,next) => {
    if(req.session.userid){
        res.locals.session = req.session
    }
    next()
})

app.get('/' ,checkAuth, AuthControllers.register)
app.use('/',AuthRoutes)

app.listen(3000)
