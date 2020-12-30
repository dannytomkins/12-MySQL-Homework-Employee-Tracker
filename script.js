const inquirer = require("inquirer");
const mysql = require("mysql");
const { async } = require("rxjs");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "cmsDB"
});
const util = require('util');

const query = util.promisify(connection.query).bind(connection);
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
    start()
    });

const employeequestions = [
    //Add departments, roles, employees
    {
        type: "list",
        message: "choose the following choices.",
        choices: ["Add Department", "Add Role", "Add Employee", "View Departments", "View Roles", "View Employees", "Update employee roles"],
        name: "selection"
    }
    //View departments, roles, employees

    //Update employee roles
]


function start() {
    inquirer.prompt(employeequestions)
        .then(function (userinput) {
            switch (userinput.selection) {
                case "Add Department":
                    addDepartment()
                    break
                case "Add Role":
                    addRole()
                    break
                case "Add Employee":
                    addEmployee()
                    break
                case "View Departments":
                    viewDepartments()
                    break
                case "View Roles":
                    viewRoles()
                    break
                case "View Employees":
                    viewEmployees()
                    break
                case "Update employee roles":
                    updateEmployeeRoles()
                    break
            }
        })
}

function addDepartment(){
inquirer.prompt([
    {
        type: "input",
        message: "What is the department name?",
        name: "departmentName"
    }
]).then(function(userinput){
    connection.query("INSERT INTO department (dept_name) VALUES (?)",userinput.departmentName, function(error,results){
        console.log("The department has been added.")
        start()
    })
})

   
}
async function addRole(){
    const departmentresults = await query("SELECT * FROM department")


//console.log(departmentresults)
    const departmentnames = departmentresults.map(departmentnames =>  departmentnames.dept_name )
    inquirer.prompt([
        {
            type: "input",
            message: "What is the title name?",
            name: "titleName"
        },
        {
            type: "input",
            message: "What is the salary",
            name: "salary"
        },
        {
            type: "list",
            message: "Select the department",
            choices: departmentnames,
            name: "departmentList"

        }

    ]).then(async function(userinput){
        const departmentobject = await departmentresults.find(department => department.dept_name === userinput.departmentList)
         const results = await connection.query("INSERT INTO role (title, salary, dept_id) VALUES(?,?,?)" ,[userinput.titleName,userinput.salary, departmentobject.id])
        console.log("role added")
        start()
    })
    
}
async function addEmployee(){
    const roles = await query("SELECT * FROM role")
    const titlenames = roles.map(role => role.title )
    
    const managers = await query("SELECT * FROM employee")
     const managernames = managers.map(manager => manager.first_name + " " + manager.last_name)
     inquirer.prompt([
         {
            type: "input",
            message: "What is the employees first name?",
            name: "firstName"
         },
         {
             type: "input",
             message: "What is the employee's last name?",
             name: "lastName"
         },
        {
            type: "list",
            message: "Please select the position.",
            choices: titlenames,
            name: "titleList"
        },
        {
            type: "list",
            message: "Please select whom is the manager.",
            choices: managernames,
            name: "managerList"
        }
     ]).then(async function(userinput){
         const titleObject = await roles.find(role => role.title === userinput.titleList)
         const managerObject = await managers.find(manager => (manager.first_name + " " + manager.last_name) === userinput.managerList)
         connection.query("insert into employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [userinput.firstName, userinput.lastName, titleObject.id, managerObject.id], function (error){
             console.log("employee added successfully!")
             start()
         })
     })
}
function viewDepartments(){
    connection.query("SELECT * FROM department",function(error, results){
        console.table(results)
        start()
    })
}
function viewRoles(){
    connection.query("SELECT * FROM role", function(error, results){
        console.table(results)
        start()
    })
}
function viewEmployees(){
    connection.query("SELECT * FROM employee", function(error, results){
        console.table(results)
        start()
    })
    
}
async function updateEmployeeRoles(){
    const employees = await query("SELECT * FROM employee")
     const employeenames = employees.map(employee => employee.first_name + " " + employee.last_name)

     const roles = await query("SELECT * FROM role")
     const titlenames = roles.map(role => role.title )
    inquirer.prompt([
        {
            type: "list",
            message: "Which employee would you like to change?",
            choices: employeenames,
            name: "employeeList"
        },
        {
            type: "list",
            message: "What is the employee's new role?",
            choices: titlenames,
            name: "titleList"
        }
    ]).then(async function(userinput){
        const titleObject = await roles.find(role => role.title === userinput.titleList)
         const employeeObject = await employees.find(employee => (employee.first_name + " " + employee.last_name) === userinput.employeeList)
        connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [titleObject.id, employeeObject.id], function (error){
            console.log("updated!")
            start()
        })
    })
}
