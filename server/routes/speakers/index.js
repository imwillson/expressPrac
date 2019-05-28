const express = require('express');
const router = express.Router();

module.exports = (param) => {

    const { speakerService } = param;

    router.get('/', async (req, res, next) => {
        // took it out because we have proimses now
        // const speakerslist  = await speakerService.getList();
        // console.log(speakerslist);

        try {
            const promises = [];

            promises.push(speakerService.getList());
            promises.push(speakerService.getAllArtwork());

            const results = await Promise.all(promises);

            return res.render("speakers", {
                // what does page refer to again?
                // look at layout, provides vraible forlayout
                page: 'All Speakers',
                speakerslist: results[0],
                artwork: results[1]
            });
        // res.send text, res.render the tempalte
        } catch(err) {
            return next(err);
        }
    });

    router.get('/:name', async (req, res, next) => {
        // return res.send(`Speakesr detail page for ${req.params.name}`)
        
        try {
        
            const promises = [];
            // await can cause problems if stacked, so push into a promise
            // const detailsPage = await speakerService.getDetail(req.params.name);
            // const detailsArtwork = await speakerService.getSpeakerArtwork(req.params.name);

            promises.push(speakerService.getDetail(req.params.name));
            promises.push(speakerService.getSpeakerArtwork(req.params.name));

            

            const promisesResult = (await Promise.all(promises))

            const print = JSON.stringify(promisesResult)
            // console.log("PR0:" +  print);

            
            
            return res.render("speakers/detail", {
                // page is refers to the /:name bitch! 
                page: req.params.name,
                detailsPage: promisesResult[0],
                artwork: promisesResult[1]
            })
        // follows the folder director
        // adjust the link inside the pug page.

        
        } catch(err) {
            return next(err)
        }
       
    });

    return router
};