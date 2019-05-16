const express = require('express');
const router = express.Router();
const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

module.exports = () => {
    router.get('/', (req, res, next) => {
        return res.send("Hello World Index!");
    });

    // middleware? 
    // so localhost:3000/speakers/:name
    router.use('/speakers', speakersRoute());
    router.use('/feedback', feedbackRoute());

    return router;
};