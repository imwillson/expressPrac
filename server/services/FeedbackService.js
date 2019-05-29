const fs = require('fs');
const util = require('util');


// use readFile() if u wanna ctiviate
//otherwise we leave it otu because we are just 
// passing it into the const 
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class FeedbackService {
  constructor(datafile) {
    // datafile is a property of this class
    this.datafile = datafile;
  }

  async getList() {
    const data = await this.getData(); 
    return data;
  }

  async addEntry(name, title, message) {
    const data = await this.getData();
    data.unshift({ name, title, message });
    return writeFile(this.datafile, JSON.stringify(data))
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