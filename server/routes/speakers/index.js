const express = require('express');
const router = express.Router();

module.exports = (param) => {

    const { speakerService } = param;

    router.get('/', async (req, res, next) => {

        const speakerslist  = await speakerService.getList();
        console.log(speakerslist);
        return res.render("speakers", {
            // what does page refer to again?
            // look at layout, provides vraible forlayout
            page: 'All Speakers',
            speakerslist
        });
        // res.send text, res.render the tempalte
    });

    router.get('/:name', (req, res, next) => {
        // return res.send(`Speakesr detail page for ${req.params.name}`)
        return res.render("speakers/detail", {
            page: req.params.name,
        })
        // follows the folder directory
    });

    return router
};