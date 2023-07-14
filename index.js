const express = require('express');
const exphbs = require('express-handlebars');
const app = express()
const flash = require('express-flash');
const session = require('express-session');
const Store = require('session-file-store')(session)


app.engine('handlebars',exphbs.engine());

app.set('view engine', 'handlebars');

app.use(express.urlencoded({extends:true}))