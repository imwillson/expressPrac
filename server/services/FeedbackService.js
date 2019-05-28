const fs = require('fs');
const util = require('util');


// use readFile() if u wanna ctiviate
//otherwise we leave it otu because we are just 
// passing it into the const 
const readFile = util.promisify(fs.readFile);

class FeedbackService {
  constructor(datafile) {
    // datafile is a property of this class
    this.datafile = datafile;
  }

  
  
  // uses util module, to pull the json file
  async getData() {
    const data = await readFile(this.datafile, 'utf8');

    // if empty, return empty array
    if(!data) return [];
    return JSON.parse(data);
  };

  

};

module.exports = FeedbackService;