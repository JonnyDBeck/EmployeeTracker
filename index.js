//const inquirer = require('inquirer');
import inquirer from 'inquirer';
import mysql from 'mysql2';
import cTable from 'console.table';

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
          message: 'Please Select an Option\n',
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
                  message: 'Which table would you like to view?\n',
                  choices: ['Veiw Department Table', 'Veiw Role Table', 'Veiw Employee Table', 'Back'],
                  loop: true
                },
            ]).then(answers => {
                if (answers.vMenu == 'Veiw Department Table'){
                    logTable('department').then( res => {
                        list();
                    });
                } else if (answers.vMenu == 'Veiw Role Table'){
                    logTable('emp_role').then( res => {
                        list();
                    });
                } else if (answers.vMenu == 'Veiw Employee Table'){
                    logTable('employee').then( res => {
                        list();
                    });
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
                  message: 'Which table would you like to add to?\n',
                  choices: ['Add to Department Table', 'Add to Role Table', 'Add to Employee Table', 'Back'],
                  loop: true
                },
            ]).then(answers => {
                if (answers.aMenu == 'Add to Department Table'){
                    addToTable('department').then( res => {
                        list();
                    });
                } else if (answers.aMenu == 'Add to Role Table'){
                    addToTable('emp_role').then( res => {
                        list();
                    });
                } else if (answers.aMenu == 'Add to Employee Table'){
                    addToTable('employee').then( res => {
                        list();
                    });
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
                  message: 'Which table would you like to update?\n',
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
            process.exit();
        } else {
            //Just in case
            console.error("An unknown error has occured")
            list();
        }
    });
}

//prints out the table of choice
function logTable(table){ 
    return new Promise((resolve, reject) => {
        if (table == 'department'){
            db.query('SELECT department.id, department.dpt_name AS department ' +
                     'FROM department', 
                function (err, results) {
                if (err) throw err;
                try {
                    //empty console logs are there for spacecing so that it is more visually appealing
                    console.log("");    
                    console.table("Departments", results);
                    console.log(""); 
                    resolve(); 
                } catch (error) {
                    //this is more for me if i forget to initialize my SQL correctly
                    console.error("SQL Table 'department' does not exist")
                }
            });
        } else if (table == 'emp_role'){
            db.query('SELECT emp_role.id, emp_role.title, department.dpt_name AS department, emp_role.salary ' +
                     'FROM emp_role ' +
                     'LEFT JOIN department ' +
                     'ON emp_role.department_id = department.id', 
            function (err, results) {
                if (err) throw err;
                try {
                    console.log("");    
                    console.table("Roles", results);
                    console.log(""); 
                    resolve(); 
                } catch (error) {
                    console.error("SQL Table 'emp_role' does not exist")
                }
            });
        } else if (table == 'employee'){
            db.query('SELECT employee.id, employee.first_name, employee.last_name, emp_role.title, ' +
                     'department.dpt_name AS department, emp_role.salary, CONCAT(E.first_name, " ", E.last_name) AS manager ' +
                     'FROM employee ' +
                     'LEFT JOIN emp_role ' +
                     'ON employee.role_id = emp_role.id ' +
                     'LEFT JOIN department ' +
                     'ON emp_role.department_id = department.id ' +
                     'LEFT JOIN employee E ' +
                     'ON employee.manager_id = E.id ', 
            function (err, results) {
                if (err) throw err;
                try {
                    console.log("");    
                    console.table("Employees", results);
                    console.log(""); 
                    resolve(); 
                } catch (error) {
                    console.error("SQL Table 'emp_role' does not exist")
                }
            });
        } else {
            console.error("There was an unknown error")
        }

    });
}

function addToTable(table){
    return new Promise((resolve, reject) => {
        if (table == 'department'){
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'dpt_name',
                    message: 'Enter a new department name (Limit 30 Charcaters)'
                },
            ])
            .then(answers => {
                db.query(`INSERT INTO department (dpt_name) ` + 
                         `VALUES ('${answers.dpt_name}')`, 
                function (err, results) {
                    if (err) throw err;
                    try {
                        console.log(`\n${answers.dpt_name} was added to table:`)
                        logTable('department').then( res => {
                            list();
                        });
                    } catch (error) {
                        console.error(error)
                    }
                });
            });
        } else if (table == 'emp_role'){
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter a new role title (Limit 30 Charcaters)'
                },
                {
                    type: 'number',
                    name: 'department',
                    message: 'Enter the department id (Integer or NULL)'
                },
                {
                    type: 'number',
                    name: 'salary',
                    message: 'Enter the salary (Can be Decimal)'
                },
            ])
            .then(answers => {
                db.query(`INSERT INTO emp_role (title, department_id, salary) ` + 
                         `VALUES ('${answers.title}', '${answers.department}', '${answers.salary}')`, 
                function (err, results) {
                    if (err) throw err;
                    try {
                        console.log(`\n${answers.title} was added to table:`)
                        logTable('emp_role').then( res => {
                            list();
                        });
                    } catch (error) {
                        console.error(error)
                    }
                });
            });
        } else if (table == 'employee'){
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: `Enter the new employee's first name (Limit 30 Charcaters)`
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: `Enter the new employee's last name (Limit 30 Charcaters)`
                },
                {
                    type: 'number',
                    name: 'role_id',
                    message: 'Enter their role id (Integer or NULL)'
                },
                {
                    type: 'number',
                    name: 'manager_id',
                    message: 'Enter their manager id (Integer or NULL)'
                },
            ])
            .then(answers => {
                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) ` + 
                         `VALUES ('${answers.first_name}', '${answers.last_name}', '${answers.role_id}', '${answers.manager_id}')`, 
                function (err, results) {
                    if (err) throw err;
                    try {
                        console.log(`\n${answers.first_name} ${answers.last_name} was added to table:`)
                        logTable('employee').then( res => {
                            list();
                        });
                    } catch (error) {
                        console.error(error)
                    }
                });
            });
        } else {
            console.error("There was an unknown error")
        }
    });
}