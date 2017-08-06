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
var dummy = require('./monsters/Dummy.js')


//--- Start of code ---

var player = new function(){
  this.username = username.name,
  this.attack = "1",
  this.xp = "2.74",
  this.health = "100",
  this.level =  Math.round(this.xp/(750 / 100) * this.xp * 100) / 100
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
  try{
    console.log('mHealth')
  if(mHealth - pdam <= 0){
    console.log(chalk.blue('luckily you killed the enemy!'))
  } else{
    console.log(chalk.red('I\'m sorry but you have unfortunatley lost.\n You will now start from the beginning'))
    setTimeout(function(){
      clear()
      intro()
    }, 5000);
  }
} catch (err){
  console.log(err)
}
}

askName()

function firstMonster(){
  console.log(chalk.red('Uh oh, your first monster has appeared! He appears to be a dummy! \n He appears to do no damage and have 1 health'))
  inquirer.prompt(monsterGUI).then(function (answers) {
    var answer = answers["monsterGUI"]
    console.log(chalk.magenta('\nYou have chosen: ' + answer));

      if(answer === 'fight! (' + player.attack + ' damage per turn)'){
          calc(player.attack, mTest.attack, player.health, mTest.health)
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