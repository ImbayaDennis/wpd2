const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.user}:${process.env.pwd}@cluster0.guyhc.mongodb.net/<dbname>?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
})

const modules = require('./api/routes/modules');
const projects = require('./api/routes/projects');
const timelines = require('./api/routes/timelines');

app.use('/modules', modules);
app.use('/projects', projects);
app.use('/timelines', timelines);

app.use((req, res, next) =>{
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) =>{
    res.status(err.status || 500);
    res.json({
        "error": {
            "message": err.message
        }
    })
});

module.exports = app;