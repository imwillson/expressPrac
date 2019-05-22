const express = require('express');
const router = express.Router();
const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');


// ### this file handles all of our routes
// this used to be a hello world
//the added param means that you can give the routes file something
module.exports = (param) => {

    // will pull the properties out of param
    // deconstruct it at assign to speakersErvice object, gotta
    // pass in ur param
    const { speakerService } = param;

    router.get('/', async (req, res, next) => {
        
        const speakerslist = await speakerService.getListShort();
        // console.log(speakerslist)

        return res.render('index.pug', {
            //every time this index file is rendered, we will
            //have a varaible page set to Home to use!
            page: 'Home',
            speakerslist,
        });
    });

    // middleware? 
    // so localhost:3000/speakers/:name
    // this is where you pass in the param 
    router.use('/speakers', speakersRoute(param));
    router.use('/feedback', feedbackRoute(param));

    return router;
};