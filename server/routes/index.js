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
    // param = passed in from {speakerService: speakerService}

    // const {speakerService} refers to the key that is being destructured!
    const { speakerService } = param;

    router.get('/', async (req, res, next) => {
        
        try {
        
            // two await statements here... some performance penalty
            //s olve w promises
            // const speakerslist = await speakerService.getListShort();
            // console.log(speakerslist)
            // const artwork = await speakerService.getAllArtwork();

            const promises = [];

            promises.push(speakerService.getListShort());
            promises.push(speakerService.getAllArtwork());

            //gives us all the arrays back 
            // promises has to be passed into the results
            // otherwise how else would .all recognize what to push 
            const results = await Promise.all(promises);


            return res.render('index.pug', {
                //every time this index file is rendered, we will
                //have a varaible page set to Home to use!
                page: 'Home',
                speakerslist: results[0],
                artwork: results[1]
            });
        } catch(err) {
            return next(err);
        }
    });

    // middleware? 
    // so localhost:3000/speakers/:name
    // this is where you pass in the param 
    router.use('/speakers', speakersRoute(param));
    router.use('/feedback', feedbackRoute(param));

    return router;
};