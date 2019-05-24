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
      return {name: speaker.name, shortname: speaker.shortname}
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

  async getAllArtwork() {
    const data = await this.getData()
    // reduce has 4 parameters in its callback
    // acc is the the returend value
    // elm is the current value bieng worked on
    const artwork = data.reduce((acc, elm) => {
      if(elm.artwork) {
        // concatenate two arrays
        acc = [...acc, ...elm.artwork];
      }

      //returns all the artwork into one array
      return acc;
    }, []);
    return artwork;
  }

  //this has shortname parameter 
  // because it'll take the speaker in the link or 
  //in the route we click / the route is also defined int he pug file 
  async getDetail(shortname) {
    const data = await this.getData() 
    // will search into the data array, for the shortname link 

    const speakerName = data.find((speaker) => {
      return speaker.shortname === shortname;
    }); 

    // console.log("speaker service: "+JSON.stringify(speakerName))

    // console.log("speakerName var:   " + typeof(speakerName));

    if(!speakerName) return null 
    return  {
        title: speakerName.title, 
        name: speakerName.name, 
        shortname: speakerName.shortname, 
        // profilePic: speaker.artwork[0], 
        description: speakerName.description
    }
  }

  //shortname is the req.params.name
  async getSpeakerArtwork(shortname) {
    const data = await this.getData() 
    const speaker = data.find((speaker) => {
      return speaker.shortname === shortname
    })

    console.log("speaker service: "+ typeof(data))
    if (!speaker || !speaker.artwork) return null
    return speaker.artwork;
  }
  
  // uses util module, to pull the json file
  async getData() {
    const data = await readFile(this.datafile, 'utf8');

    // if empty, return empty array
    if(!data) return [];
    return JSON.parse(data).speakers;
  };

  

};

module.exports = SpeakerService;