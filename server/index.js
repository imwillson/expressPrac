const express = require('express')
const app = express();
const routes = require('./routes'); // automatic index

//pug 
app.set('view engine', pug);

//middleware!! 
// routes

// connects static files to public
app.use(express.static('public'));
app.get('/favicon.ico', (req,res,next) => {
    return res.sendStatus(204);
});
// connects to the routes file
app.use('/',routes());




// app.get('/', (req, res,next)  => {
//     res.send("hello world")
// });

app.listen(3000, () => {
    console.log("Server started")
});

module.exports = app 