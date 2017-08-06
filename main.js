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
var username = JSON.parse(fs.readFileSync("./username.json"))

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

var player = new function(){
  this.username = username.name,
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

function calc(pDam, mDam, pHealth, mHealth){
  if(mHealth - pDam < pHealh - mDam){
    return Boolean(true)
  } else if(mHealh - pDam === pHealh - mDam){
    console.log(chalk.red('uh oh, you are in a tie. Looks like you need to train a bit more before fighing this monster!'))
    var tie = "tie"
    return tie
  }else {
    return console.log(chalk.red('I\'m sorry but you have unfortunatley lost.\n You will now start from the beginning'))
    setTimeout(function(){
      clear()
      intro()
    }, 5000);
  }
}

function mDummy(){
  console.log(chalk.red('Uh oh, your first monster has appeared! He appears to be a dummy! \n He appears to do no damage and have 1 health'))
  inquirer.prompt(monsterGUI).then(function (answers) {
    var answer = answers["monsterGUI"]
    console.log(chalk.magenta('\nYou have chosen: ' + answer));

      if(answer === 'fight! (' + player.attack + ' damage per turn)'){
          // calc(player.attack, mTest.attack, player.health, mTest.health)
          if(calc(player.attack, monsters.mDummy.attack, player.health, monsters.mDummy.health)){
            console.log(chalk.magenta('Congratz, you won against the infamous DUMMY and gained .1 xp!'))
            gainXP(.1)
          }
      }else if(answer === 'run away'){
        console.log(chalk.magenta('He\'s a dummy. You can attack him once and he will die.'))
        setTimeout(function(){
        mDummy()
        }, 5000);
      }else{
        console.log(chalk.magenta('The dummy is too powerful, you can\'t outrun his greatness.'))
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
    fs.writeFile("./username.json", JSON.stringify(answers), function(err) {
      if(err) {
          return console.log(err);
        }
      });
      setTimeout(function(){
        intro()
      }, 1000);
  });
}

askName()

function intro(){
  var Introduction = [
    {
      type: 'confirm',
      name: 'Introduction',
      message: `Hello ` + player.username + `, welcome to the nodejs RPG! Are you ready to begin?`,
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
