const express = require('express');
const path = require('path')
const app = express();
const morgan = require('morgan'); //Logging module to provide more info in console
const bodyParser = require('body-parser'); //Parses the bodies of all incoming requests to make them easier to work with
const mongoose = require('mongoose'); //Provides an interface to connect to mongoDB for data persistence

//Connection to MongoDB
mongoose.connect(`mongodb+srv://${process.env.user}:${process.env.pwd}@cluster0.guyhc.mongodb.net/<dbname>?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
})

const modules = require('./api/routes/modules');
const users = require('./api/routes/users');
const public = path.join(__dirname, 'public');

app.use('/modules', modules);
app.use('/', users);
app.use(express.static(public));

app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        "error": {
            "message": err.message
        }
    })
});

module.exports = app;