const express = require('express')
const app = express();
const createError = require('http-errors');
const routes = require('./routes'); // automatic index
const path = require('path'); // what is path? 
const bodyParser = require('body-parser');
const configs = require('./config') // configuraiton file! 

const config = configs[app.get('env')] // loads the environment 

//services /json
const SpeakerService = require('./services/SpeakerService');
const FeedbackService = require('./services/FeedbackService');
// draws from the config file
// DRAWS FROM THE CONFIG FILE configfile.data.PATHOFFILENAME
const speakerService = new SpeakerService(config.data.speakers);
const feedbackService = new FeedbackService(config.data.feedback);
// after creating this variable.. how do you use it? pass it in thru app use

//pug, then we have to tell it where to look for template, create a new folder called views, insider
//inside server bc it has to b on the server lmfao? not clicnet
app.set('view engine', 'pug');

//not sure
if(app.get('env') === 'development') {
		app.locals.pretty = true;
}


//sets the new views into views directory folder
app.set('views', path.join(__dirname, './views'));


// title dilemma
app.locals.title = config.sitename; //refer above for config env 
// sets the title default. + the configuration file! 

app.use((req,res,next) => {
		res.locals.rendertime = new Date();
		return next() // must ALWAYS use next, so it doens't hang. 
});

//middleware!! 
// routes

// connects static files to public
app.use(express.static('public'));


// put body parser after static files, ud ont want it to run for those
app.use(bodyParser.urlencoded({ extended: true }))
// if it finds that variables are being stored on data through a RQEUEStr, it will parse it

app.get('/favicon.ico', (req,res,next) => {
		return res.sendStatus(204);
});

//### next 2 app.use gives the data in by calling it 

// add middlewar efo rhandling json. after the express static because 
// those files wiwll never change. u don't need to run them there
app.use(async (req,res,next) => {
		try {
				const names = await speakerService.getNames();
				// console.log(names);
				// create a new var speakerNames
				res.locals.speakerNames = names;
				return next();
		} catch(err) {
				 return next(err);
		}
});

// connects to the routes file
// can add param to routes now
//THIS SI WHERE WE CONNECT THE SPEAKER SERVICE TO THE INDEX 
app.use('/',routes({
		// speakerService: speakerService
		speakerService,
		feedbackService
}));

// error
app.use((req, res, next) => {
		return next(createError(404, 'File not found'));
});

// error , pug uses the status and error from here
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