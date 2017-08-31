//--- Start of requires ---

// To color the terminal
var chalk       = require('chalk');

// To clear the terminal
var clear       = require('clear');

// Fancy looking text generator
var figlet      = require('figlet');

// Fancy looking CLI
var inquirer    = require('inquirer');

// Cool spinner to signify loading
var CLI         = require('clui');
var Spinner     = CLI.Spinner;

// In-case i need to use JSON files
var fs          = require('fs');

// username of user

var username3 = require('./username.js')

// monster files
var monsters = require('./monsters.js')

// player XP

var xpee = require('./xp.js')

if(xpee.xpe.xp < 2.74){
  fs.writeFile("/Users/samjouhari/Desktop/NodeRPG/xp.js", "var xpe = new function(){\n  this.xp = 2.74\n}\n\nexports.xpe = xpe", function (err) {
      if (err) {
          return console.log("Error writing file: " + err);
      }
  });
}

function gainXP(xp){
      fs.writeFile("/Users/samjouhari/Desktop/NodeRPG/xp.js", "var xpe = new function(){\n  this.xp = " + xp + "\n}\n\nexports.xpe = xpe", function (err) {
          if (err) {
              return console.log("Error writing file: " + err);
          }
      });
}

//--- Start of code ---

var stage = []

var useSave = []

var player = new function(){
  this.username = [],
  this.savedusername = username3.username2.username
  this.xp = xpee.xpe.xp,
  this.health = Math.round(this.xp/(750 / 100) * this.xp * 100),
  this.level =  Math.round(this.xp/(750 / 100) * this.xp * 100) / 100
  this.attack = this.level
}

var monsterGUI = [
  {
    type: 'list',
    name: 'monsterGUI',
    message: 'What would you like to do?',
    choices: ['Fight! (' + player.attack + ' damage per turn)', 'Run away', ' or Dodge'],
    filter: function (val) {
      return val.toLowerCase();
    }
  }
];

function usernamefr(){
    if(username3.username2.username === "#^&^@$^@#&^$@&*^@!^$!&^$*!&^%&!#^$&!#^%#&&&#&#&#&#&#$!^&#*!^"){
        askName()
                  for (var i = useSave.length; i > 0; i--) {

 useSave.pop();

}
        useSave.push("nah")

    } else if(username3.username2.username != "#^&^@$^@#&^$@&*^@!^$!&^$*!&^%&!#^$&!#^%#&&&#&#&#&#&#$!^&#*!^"){
var usesavee =
    {
      type: 'confirm',
      name: 'usesavedd',
      message: `Welcome back ` + username3.username2.username + ', would you like to change your name?',
      default: true
    }

  inquirer.prompt(usesavee).then(function (answers) {
        if(answers.usesavedd === false){
          for (var i = useSave.length; i > 0; i--) {

 useSave.pop();

}
            useSave.push("ye")
            intro()
    } else {
          for (var i = useSave.length; i > 0; i--) {

 useSave.pop();

}
      useSave.push("nah")
      changeName()
    }
  })
    }
}

function name(){
    if(useSave[0] === "ye"){
        return player.savedusername
    }
    if(useSave[0] === "nah"){
        return player.username[0]
    }
}

function calc(pDam, mDam, pHealth, mHealth){

  if(mHealth - pDam < pHealth - mDam){
    console.log(chalk.cyan('Congratz, you won and gained ' + Math.round(player.level / 10 * 100) / 100 + ' xp!'))
    gainXP(player.xp + player.level / 10)
  } else if(!mHealth - pDam < pHealth - mDam){
    return console.log(chalk.red('I\'m sorry but you have unfortunatley lost.\n You will now start from the beginning'))
    setTimeout(function(){
      clear()
      intro()
    }, 5000);
  }else {
    return console.log(chalk.red('I\'m sorry but you have unfortunatley lost.\n You will now start from the beginning'))
    setTimeout(function(){
      clear()
      intro()
    }, 5000);
  }
}

console.log(player.health - monsters.mDummy.attack < monsters.mDummy.health - player.attack)

function mDummy(){
  console.log(chalk.red('Uh oh, your first monster has appeared! He appears to be a dummy! \n He appears to do no damage and have 1 health'))
  inquirer.prompt(monsterGUI).then(function (answers) {
    var answer = answers["monsterGUI"]
    console.log(chalk.magenta('\nYou have chosen: ' + answer));
      if(answer === 'fight! (' + player.attack + ' damage per turn)'){
          // calc(player.attack, mTest.attack, player.health, mTest.health)
          calc(player.attack, monsters.mDummy.attack, player.health, monsters.mDummy.health)
      }else if(answer === 'run away'){
        console.log(chalk.magenta('He\'s a dummy. You can attack him once and he will die.'))
        setTimeout(function(){
        mDummy()
        }, 5000);
      }else{
        console.log(chalk.magenta('The dummy is too powerful, you can\'t outdodge his greatness.'))
        setTimeout(function(){
        firstMonster()
        }, 5000);
      }
  });
}

function firstMonster(){
  console.log(chalk.red('Uh oh, your first monster has appeared! He appears to be a dummy! \n He appears to do no damage and have 1 health'))
  inquirer.prompt(monsterGUI).then(function (answers) {
    var answer = answers["monsterGUI"]
    console.log(chalk.magenta('\nYou have chosen: ' + answer));

      if(answer === 'fight! (' + player.attack + ' damage per turn)'){
          // calc(player.attack, mTest.attack, player.health, mTest.health)
          calc(player.attack, monsters.mDummy.attack, player.health, monsters.mDummy.health)
      }else if(answer === 'run away'){
        console.log(chalk.magenta('He\'s a dummy. You can attack him once and he will die.'))
        setTimeout(function(){
        firstMonster()
        }, 5000);
      }else{
        console.log(chalk.magenta('The dummy is too powerful, you can\'t outrun his greatness.'))
        setTimeout(function(){
        firstMonster()
        }, 5000);
      }
  });
}

function askName(){
var name =  {
  type: 'input',
  name: 'name',
  message: 'What is your name, traveler',
  default: 'Undefined'
  }

  inquirer.prompt(name).then(function (answers) {
    fs.writeFile("/Users/samjouhari/Desktop/NodeRPG/username.js", "var username2 = new function(){\n  this.username = \"" + answers.name + "\"\n}\n\nexports.username2 = username2", function (err) {
          if (err) {
              return console.log("Error writing file: " + err);
          }
      })
      player.username.push(answers.name)
      setTimeout(function(){
        intro()
      }, 1000);
  });
}

function changeName(){
var name =  {
  type: 'input',
  name: 'name',
  message: 'What would you like to change your name to?',
  default: 'Undefined'
  }

  inquirer.prompt(name).then(function (answers) {
    fs.writeFile("/Users/samjouhari/Desktop/NodeRPG/username.js", "var username2 = new function(){\n  this.username = \"" + answers.name + "\"\n}\n\nexports.username2 = username2", function (err) {
          if (err) {
              return console.log("Error writing file: " + err);
          }
      })
      player.username.push(answers.name)
      setTimeout(function(){
        intro()
      }, 1000);
  });
}


usernamefr()

function intro(){
  var Introduction = [
    {
      type: 'confirm',
      name: 'Introduction',
      message: `Hello ` + name() + `, welcome to the nodejs RPG! Are you ready to begin?`,
      default: true
    }
  ];

  inquirer.prompt(Introduction).then(function (answers) {
        if(answers.Introduction === true){
          firstMonster()
    } else {
      console.log(chalk.cyan('Not yet i see, go ahead and restart the game when ready!'))
      process.exit()
    }
  })
}
