const fs = require('fs');
const Command = require('command');
const names = require('./names');

module.exports = function Looks(dispatch) {
  
  let command = Command(dispatch);
  
  let self, 
    people = [];

  dispatch.hook('S_LOGIN', 9, event => {
    self = event;
  });

  dispatch.hook('S_SPAWN_USER', 10, event => {
    people.push(event);
  });

  dispatch.hook('S_DESPAWN_USER', 3, event => {

    people.forEach((player, index) => {
      if(player.guid.toString() === event.gameId.toString()) {
        people.splice(index, 1);
      }
    });

  });

  dispatch.hook('S_LOAD_TOPO', 'raw', event => {
    people = [];
  })

  command.add('looks', name => {
    if(name !== 'self') {
      let data = people.filter(i => i.name.toLowerCase() === name.toLowerCase());
      
      if(!data || !(data.length > 0)) {
        command.message(`(looks) Data for character ${name} was not found in your proximity.`);
        return;
      } else {
        saveDataToJson(
          formatCharacterData(
            getCharacterData( data[0] )
          )
        );
      }
    } else {
      saveDataToJson(
        formatCharacterData(
          getCharacterData( self )
        )
      );
      // console.log( Uint8Array.from(self.details) );
    }
  });

  function getCharacterData(data) {
    let obj = {};

    obj['name'] = data.name;
    obj['details'] = Uint8Array.from( data.details );
    obj['shape'] = Uint8Array.from( data.shape );

    return obj;
  }

  function formatCharacterData(data) {
    let obj = {};

    obj['name'] = data.name;
    obj['details'] = {};
    obj['shape'] = {};
    
    data.details.forEach((d, index) => {
      if(names.details[index]) {
        let val = names.details[index].split('.');

        if(val.length > 1) {
          if(!obj.details[val[0]]) obj.details[val[0]] = {};
          obj.details[val[0]][val[1]] = d+1;
        }
      }
    });

    data.shape.forEach((s, index) => {
      if(names.shape[index]) {
        let val = names.shape[index].split('.');

        if(val.length > 1) {
          if(!obj.shape[val[0]]) obj.shape[val[0]] = {};
          obj.shape[val[0]][val[1]] = s+1;
        }
      }
    })

    return obj;
  }

  function saveDataToJson(data) {
    if (!fs.existsSync('../node_modules/looks/data'))
      fs.mkdirSync('../node_modules/looks/data');

    fs.writeFile(`../node_modules/looks/data/${data.name}_${Date.now()}.json`, JSON.stringify(data, null, 2), (err) => {
      if(err) console.log(err);
      else console.log('Character data successfully saved for ' + data.name);
    });
  }

}