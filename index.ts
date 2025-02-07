#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import { StudentManagement } from "./class.js";
import { enrollStudent, courseEnroll, studentStatus, studentBalance } from "./func.js";
import chalkAnimation from "chalk-animation";

async function welcome() {
    let title = chalkAnimation.neon(`\n\t--------------------------------------\n\t Welcome To Student Management System \n\t--------------------------------------\n`, 1);
    await new Promise ((resolve) => {
        setTimeout(resolve, 2000);

    });
    title.stop()
    
}

await welcome()

async function main() {
    let studentManager = new StudentManagement;
    let condition = true

    while (condition) {

        let menu = await inquirer.prompt([
            {
                name: "option",
                message: "What would you like to do: ",
                type: "list",
                choices: [
                    { name: chalk.hex('#7558E8')("Enroll Student"), value: "Enroll Student" },
                    { name: chalk.hex('#7558E8')("View Course & Pay Fees"), value: "View Course & Pay Fees" },
                    { name: chalk.hex('#7558E8')("Check Student Status"), value: "Check Student Status" },
                    { name: chalk.hex('#7558E8')("Student Balance"), value: "Student Balance" },
                    { name: chalk.hex('#7558E8')("Exit"), value: "Exit" }
                ]
            }
        ]);

        switch (menu.option) {
            case "Enroll Student":
                await enrollStudent(studentManager)
                break;

            case "View Course & Pay Fees":
                await courseEnroll(studentManager)
                break;

            case "Check Student Status":
                await studentStatus(studentManager)
                break;

            case "Student Balance":
                await studentBalance(studentManager)
                break;

            case "Exit":
                condition = false
                break;

            default:
                console.log("Please select a valid option");
                break;
        }
    }
}

main()