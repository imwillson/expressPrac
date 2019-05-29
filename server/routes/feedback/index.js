const express = require('express');
const router = express.Router();


// param was passed in through app.use 
module.exports = (param) => {

	const { feedbackService } = param; 

	router.get('/', async (req, res, next) => {
		try {
			const feedbacklist = await feedbackService.getList();
			

			return res.render("feedback", {
			    // asing the page value to feed back
			    page: "Feedback",
					feedbacklist,
					success: req.query.success,
			});

			

		} catch(err) {
			return next(err);
		}
		
		
	});

	router.post('/', async (req, res, next) => {
		try {

			const feedbacklist = await feedbackService.getList();
			// console.log(req.body);
			// trim makes sure to get rid of white space
			const fbName = req.body.fbName.trim();
			const fbTitle = req.body.fbTitle.trim();
			const fbMessage = req.body.fbMessage.trim();

			if (!fbName || !fbTitle || !fbMessage) {
				return res.render('feedback', {
					page: 'feedback',
					error: true, 
					// u can alter an error thing and adjust in pug

					// store these variables so theyd ont have to wriet it again
					// jic they forget one part of the form 
					fbName,
					fbMessage,
					fbTitle,
					feedbacklist
				});
			}

			await feedbackService.addEntry(fbName, fbTitle, fbMessage)

			// ?success is a variable, where is it stored? in the get route above
			return res.redirect('/feedback?success=true');
			// return res.send("Form sent") 
		} catch(err) {
			return next(err)
		}
	
		
	});

	return router
};