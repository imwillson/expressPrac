const express = require('express');
const router = express.Router();
const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');


// ### this file handles all of our routes
// this used to be a hello world
module.exports = () => {
    router.get('/', (req, res, next) => {
        return res.render('index.pug');
    });

    // middleware? 
    // so localhost:3000/speakers/:name
    router.use('/speakers', speakersRoute());
    router.use('/feedback', feedbackRoute());

    return router;
};