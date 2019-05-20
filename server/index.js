const express = require('express')
const app = express();
const createError = require('http-errors');
const routes = require('./routes'); // automatic index
const path = require('path'); // what is path? 

//pug, then we have to tell it where to look for template, create a new folder called views, insider
//inside server bc it has to b on the server lmfao? not clicnet
app.set('view engine', 'pug');

//not sure
if(app.get('env') === 'development') {
    app.locals.pretty = true;
}

//sets the new views into views directory folder
app.set('views', path.join(__dirname, './views'));
//middleware!! 
// routes

// connects static files to public
app.use(express.static('public'));
app.get('/favicon.ico', (req,res,next) => {
    return res.sendStatus(204);
});
// connects to the routes file
app.use('/',routes());

// error
app.use((req, res, next) => {
    return next(createError(404, 'File not found'));
});

// error 
app.use((err, req, res, next) => {
    // displays locals message
    res.locals.message = err.message;
    const status = err.status || 500;
    res.locals.status = status;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(status);
    return res.render('error');
});

// app.get('/', (req, res,next)  => {
//     res.send("hello world")
// });

app.listen(3000, () => {
    console.log("Server started")
});

module.exports = app 