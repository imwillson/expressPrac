const fs = require('fs');
const util = require('util');


// use readFile() if u wanna ctiviate
//otherwise we leave it otu because we are just 
// passing it into the const 
const readFile = util.promisify(fs.readFile);

class SpeakerService {
  constructor(datafile) {
    // datafile is a property of this class
    this.datafile = datafile;
  }

  async getNames() {
    const data = await this.getData();

    return data.map((speaker) => {
      return {name: speaker.name, short: speaker.shortname}
    });
  };

  async getListShort() {
    const data = await this.getData();
    return data.map((speaker) => {
      return {name: speaker.name, shortname: speaker.shortname, title: speaker.title};  
    })
  }

  async getList() {
    const data = await this.getData();
    return data.map((speaker) => {
      return {name: speaker.name, shortname: speaker.shortname, title: speaker.title, summary: speaker.summary};  
    })
  }
  
  // uses util module
  async getData() {
    const data = await readFile(this.datafile, 'utf8');

    // if empty, return empty array
    if(!data) return [];
    return JSON.parse(data).speakers;
  };

  

};

module.exports = SpeakerService;