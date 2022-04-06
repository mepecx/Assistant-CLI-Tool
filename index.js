#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import fs from 'fs';

let userInfo = {name: '', usedBefore: false};

//set userInfo name from userInfo.json
if(fs.existsSync('./userInfo.json')){
    userInfo = JSON.parse(fs.readFileSync('./userInfo.json', 'utf8'));
}

initializeUser();
welcomeUser();



function initializeUser(){
    if(!userInfo.usedBefore){
        //prompt the user for their name
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is your name?'
            }
        ]).then(answers => {
            userInfo.name = answers.name;
            userInfo.usedBefore = true;
            fs.writeFileSync('./userInfo.json', JSON.stringify(userInfo));
        });
    } else {
        console.log(chalk.white(figlet.textSync('Welcome   back,     ' + userInfo.name + '!')));
    }
}

function welcomeUser(){
    console.log(chalk.green('Type ') + chalk.red("help") + chalk.green(' to see a list of commands.'));
    console.log(chalk.green('Type ') + chalk.red("exit") + chalk.green(' to exit the program.'));
    console.log(chalk.green('Type ') + chalk.red("clear") + chalk.green(' to clear the screen.'));

    //wait for user's input
    process.stdin.on('data', function(data){
        let input = data.toString().trim();
        if(input === 'help'){
            displayCommands();
        }
        else if(input === 'clear'){
            console.clear();
            welcomeUser();
        }
        else if(input === 'exit'){
            process.exit();
        }
        else{
            console.log(chalk.red('Invalid command. Type "help" to see a list of commands.'));
        }
    });
}

function displayCommands(){
    console.log(chalk.green('Here are the commands:'));
    console.log(chalk.green('help - displays a list of commands'));
    console.log(chalk.green('clear - clears the screen'));
    console.log(chalk.green('exit - exits the program'));
}

