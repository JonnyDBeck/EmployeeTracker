//const inquirer = require('inquirer');
import inquirer from 'inquirer';
import mysql from 'mysql2';

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      //Password removed for privacy reasons
      password: 'password',
      database: 'employee_db'
    },
    console.log(`Connected to the employee database.\n`)
);

db.query('SELECT * FROM department', function (err, results) {
    if (err) throw err;
    console.log("\n")
    console.log(results);
});

start();

function start(){
    //ASCII ART
    console.log("███████╗███╗░░░███╗██████╗░██╗░░░░░░█████╗░██╗░░░██╗███████╗███████╗")
    console.log("██╔════╝████╗░████║██╔══██╗██║░░░░░██╔══██╗╚██╗░██╔╝██╔════╝██╔════╝")
    console.log("█████╗░░██╔████╔██║██████╔╝██║░░░░░██║░░██║░╚████╔╝░█████╗░░█████╗░░")
    console.log("██╔══╝░░██║╚██╔╝██║██╔═══╝░██║░░░░░██║░░██║░░╚██╔╝░░██╔══╝░░██╔══╝░░")
    console.log("███████╗██║░╚═╝░██║██║░░░░░███████╗╚█████╔╝░░░██║░░░███████╗███████╗")
    console.log("╚══════╝╚═╝░░░░░╚═╝╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░╚══════╝╚══════╝\n")
    console.log("████████╗██████╗░░█████╗░░█████╗░██╗░░██╗███████╗██████╗░")
    console.log("╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██║░██╔╝██╔════╝██╔══██╗")
    console.log("░░░██║░░░██████╔╝███████║██║░░╚═╝█████═╝░█████╗░░██████╔╝")
    console.log("░░░██║░░░██╔══██╗██╔══██║██║░░██╗██╔═██╗░██╔══╝░░██╔══██╗")
    console.log("░░░██║░░░██║░░██║██║░░██║╚█████╔╝██║░╚██╗███████╗██║░░██║")
    console.log("░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝\n");

    //Function's first calling
    list();
}

//Honestly I found listed prompts, if statements, and recursive functions the easiest
function list(){
    //list prompt
    inquirer.prompt([
        {
          type: 'list',
          name: 'menu',
          message: 'Please Select an Option',
          choices: ['Veiw Table', 'Add to Table', 'Update from Table', 'Quit'],
          loop: true
        },
    ]).then(answers => {
        //if statement for each answer
        if (answers.menu == 'Veiw Table'){

            //Table view prompt
            inquirer.prompt([
                {
                  type: 'list',
                  name: 'vMenu',
                  message: 'Which table would you like to view?',
                  choices: ['Veiw Department Table', 'Veiw Role Table', 'Veiw Employee Table', 'Back'],
                  loop: true
                },
            ]).then(answers => {
                if (answers.vMenu == 'Veiw Department Table'){

                } else if (answers.vMenu == 'Veiw Role Table'){

                } else if (answers.vMenu == 'Veiw Employee Table'){

                } else if (answers.vMenu == 'Back'){
                    list();
                } else {
                    //Just in case
                    console.error("An unknown error has occured")
                    list();
                }
            });

        } else if (answers.menu == 'Add to Table'){

            //Table view prompt
            inquirer.prompt([
                {
                  type: 'list',
                  name: 'aMenu',
                  message: 'Which table would you like to view?',
                  choices: ['Add to Department Table', 'Add to Role Table', 'Add to Employee Table', 'Back'],
                  loop: true
                },
            ]).then(answers => {
                if (answers.aMenu == 'Add to Department Table'){

                } else if (answers.aMenu == 'Add to Role Table'){

                } else if (answers.aMenu == 'Add to Employee Table'){

                } else if (answers.aMenu == 'Back'){
                    list();
                } else {
                    //Just in case
                    console.error("An unknown error has occured")
                    list();
                }
            });
            
        } else if (answers.menu == 'Update from Table'){

            //Table view prompt
            inquirer.prompt([
                {
                  type: 'list',
                  name: 'uMenu',
                  message: 'Which table would you like to view?',
                  choices: ['Update Department Table', 'Update Role Table', 'Update Employee Table', 'Back'],
                  loop: true
                },
            ]).then(answers => {
                if (answers.uMenu == 'Update Department Table'){

                } else if (answers.uMenu == 'Update Role Table'){

                } else if (answers.uMenu == 'Update Employee Table'){

                } else if (answers.uMenu == 'Back'){
                    list();
                } else {
                    //Just in case
                    console.error("An unknown error has occured")
                    list();
                }
            });
            
        } else if (answers.menu == 'Quit'){
            console.info("Quitting...")
        } else {
            //Just in case
            console.error("An unknown error has occured")
            list();
        }
    });
}