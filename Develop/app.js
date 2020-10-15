const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employee = [
    {
      type: "list",
      message:
        "Select a role for the employee you are adding.",
      name: "role",
      choices: ["Manager", "Engineer", "Intern"],
    },
    {
      type: "input",
      message: "Enter employees name.",
      name: "name",
    },
    {
      type: "input",
      message: "Enter employees ID number.",
      name: "id",
    },
    {
      type: "input",
      message: "Enter the email address for employee.",
      name: "email",
    },
  ];
  
  const manager = [
    {
      type: "input",
      message: "Enter office number for the manager you are adding",
      name: "office",
    },
  ];
  
  const engineer = [
    {
      type: "input",
      message: "Enter the username for the engineers github.",
      name: "github",
    },
  ];
  
  const intern = [
    {
      type: "input",
      message: "Enter the name of the school for the intern you are adding.",
      name: "school",
    },
  ];
  
  const team = [];
  
  function addNewMember() {
    inquirer
      .prompt({
        type: "confirm",
        message: "Would you like to add an additional member?",
        name: "add",
      })
      .then(function (response) {
        if (response.add === true) {
          memberData();
        } else {
          console.log(`You added all members.`);
          const html = render(team);
          fs.writeFile(outputPath, html, function (err) {
            if (err) throw err;
          });
        }
      });
  }
  
  function memberData() {
    inquirer.prompt(employee).then(function (data) {
      switch (data.role) {
        case "Manager":
          inquirer.prompt(manager).then(function (member) {
            let managerMember = new Manager(
              data.name,
              data.id,
              data.email,
              member.office
            );
            team.push(managerMember);
            addNewMember();
          });
          break;
        case "Engineer":
          inquirer.prompt(engineer).then(function (member) {
            let engineerMember = new Engineer(
              data.name,
              data.id,
              data.email,
              member.github
            );
            team.push(engineerMember);
            addNewMember();
          });
          break;
        case "Intern":
          inquirer.prompt(intern).then(function (member) {
            let internMember = new Intern(
              data.name,
              data.id,
              data.email,
              member.school
            );
            team.push(internMember);
            addNewMember();
          });
      }
    });
  }
  

  addNewMember();
  

