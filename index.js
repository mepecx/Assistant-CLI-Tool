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
    }
}

function welcomeUser(){
    console.log(chalk.green('Welcome ' + userInfo.name + '!'));
    console.log(chalk.green('Let\'s get started!'));
    console.log(chalk.green('Type "help" to see a list of commands.'));
    console.log(chalk.green('Type "exit" to exit the program.'));
    console.log(chalk.green('Type "clear" to clear the screen.'));

    //wait for user's input
    process.stdin.on('data', function(data){
        let input = data.toString().trim();
        if(input === 'help'){
            console.log(chalk.green('Here are the commands:'));
            console.log(chalk.green('help - displays a list of commands'));
            console.log(chalk.green('clear - clears the screen'));
            console.log(chalk.green('exit - exits the program'));
            console.log(chalk.green('add - adds a new todo'));
            console.log(chalk.green('list - lists all todos'));
            console.log(chalk.green('delete - deletes a todo'));
            console.log(chalk.green('complete - completes a todo'));
            console.log(chalk.green('incomplete - incomplete a todo'));
            console.log(chalk.green('edit - edits a todo'));
            console.log(chalk.green('help - displays this list of commands'));
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

