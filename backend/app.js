// require mongoose
const express = require('express');
// create a instance of express
const app = express();
// require path
const path = require('path');
// require cookieParser
const cookieParser = require('cookie-parser');
// require dotenv
require('dotenv').config({path:path.join(__dirname, 'config/config.env')});
const cors = require('cors');

// use body parser
app.use(express.json());

// use cookie-parser
app.use(cookieParser());

// use cors
app.use(cors());

// test route
app.use('/api/v1/test', require('./routes/test'));

//auth route
app.use('/api/v1/auth', require('./routes/auth'));

//question route
app.use('/api/v1/question', require('./routes/question'));

// user routes
app.use('/api/v1/user', require('./routes/user'));

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

// use error middleware
app.use(require('./middleware/error'));

// export app
module.exports = app;