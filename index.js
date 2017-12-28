const fs = require('fs');
const Command = require('command');
const names = require('./names');

module.exports = function Looks(dispatch) {
  
  let command = Command(dispatch);
  
  let self, 
    people = [],
    copy,
    copyflag = false;

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

  command.add('looks', (...args) => {

    if(args.length < 2) {
      command.message('(looks) Malformed command.')
    }

    switch(args[0]) {

      case 'save':
      case 'grab':
      case 'json':
        if(args[1] !== 'self') {
          let data = people.filter(i => i.name.toLowerCase() === args[1].toLowerCase());
          
          if(!data || !(data.length > 0)) {
            command.message(`(looks) Data for character ${args[1]} was not found in your proximity.`);
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
        }
        break;
      case 'copy':

        break;

    }

    
  });

  function getCharacterData(data) {
    let obj = {};

    obj['name'] = data.name;

    obj['race'] = ['Human', 'High Elf', 'Aman', 'Castanic', 'Popori', 'Baraka', 'Elin'][
      getRaceIndex(data.templateId)
    ];
    obj['gender'] = ['Male', 'Female'][
      Math.floor(data.templateId / 100 % 2) + 1
    ];
    obj['class'] = ['Warrior', 'Lancer', 'Slayer', 'Berserker', 'Sorcerer',
      'Archer', 'Mystic', 'Reaper', 'Gunner', 'Brawler', 'Ninja', 'Valkyrie'][
        Math.floor((data.templateId - 100) / 200 % 50)
      ];

    obj['details'] = Uint8Array.from( data.details );
    obj['shape'] = Uint8Array.from( data.shape );

    return obj;
  }

  function formatCharacterData(data) {
    let obj = {};

    obj['name'] = data.name;

    obj['race'] = data.race;
    obj['gender'] = data.gender;
    obj['class'] = data['class'];

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
      else {
        command.message(`Character data successfully saved for ${data.name}.`);
        console.log('Character data successfully saved for ' + data.name);
      }
    });
  }

  function getRaceIndex(template) {
    if(Math.floor((template - 100) / 200 % 50) === 4 && 
      (Math.floor(model / 100 % 2) + 1) === 1) return 6;
    else
      return Math.floor((template - 100) / 200 % 50);
  }

}