import inquirer from "inquirer";
import chalk from 'chalk';
import { balance } from "./class.js";
// Student Finder
async function findStudentAndHandleErrors(id, studentManager) {
    if (isNaN(id)) {
        console.log(chalk.hex('#D70040')("You must enter a number!\n"));
        return null;
    }
    let student = studentManager.find_student(id);
    if (!student) {
        console.log(chalk.hex('#D70040')("Student not found. Please enroll or enter the correct Student ID.\n"));
        return null;
    }
    return student;
}
// Student Enrollment
export async function enrollStudent(studentManager) {
    let question = await inquirer.prompt([
        {
            name: "ques1",
            message: "Enter your First Name: ",
            type: "input"
        },
        {
            name: "ques2",
            message: "Enter your Last Name: ",
            type: "input"
        },
        {
            name: "ques3",
            message: "Enter your Father's Name: ",
            type: "input"
        },
        {
            name: "ques4",
            message: "Enter your age: ",
            type: "number"
        },
    ]);
    studentManager.add_student(question.ques1, question.ques2, question.ques3, question.ques4);
}
// Course Enrollment
export async function courseEnroll(studentManager) {
    let input = await inquirer.prompt([
        {
            name: "id",
            message: "Enter a Student ID: ",
            type: "number"
        },
    ]);
    let student = await findStudentAndHandleErrors(input.id, studentManager);
    if (student) {
        let option = await inquirer.prompt([
            {
                name: "course",
                message: "Please select a course you would like to enroll in: ",
                type: "list",
                choices: [
                    { name: chalk.hex('#2DBEED')("English"), value: "English" },
                    { name: chalk.hex('#2DBEED')("IT (Information Technology)"), value: "IT (Information Technology)" },
                    { name: chalk.hex('#2DBEED')("Psychology"), value: "Psychology" },
                    { name: chalk.hex('#2DBEED')("Medical & Biology Science"), value: "Medical & Biology Science" },
                    { name: chalk.hex('#2DBEED')("Business & Finance"), value: "Business & Finance" },
                    { name: chalk.hex('#2DBEED')("Cooking"), value: "Cooking" },
                    { name: chalk.hex('#2DBEED')("Arts & Fashion"), value: "Arts & Fashion" }
                ]
            },
        ]);
        const courseFees = {
            "English": 5000,
            "IT (Information Technology)": 20000,
            "Psychology": 10000,
            "Medical & Biology Science": 100000,
            "Business & Finance": 15000,
            "Cooking": 10000,
            "Arts & Fashion": 8000
        };
        console.log(chalk.hex('#87CEEB')(`Fees of this course is Rs. ${courseFees[option.course]}\n`));
        let confirmation = await inquirer.prompt([
            {
                name: "confirm",
                message: "Do you want to enroll in this course?",
                type: "confirm",
            }
        ]);
        if (confirmation.confirm) {
            if (balance < courseFees[option.course]) {
                console.log(chalk.hex('#D70040')("Insufficient balance! Please deposit balance\n"));
            }
            else {
                let paymentOption = await inquirer.prompt([
                    {
                        name: "option",
                        message: "How would you like to pay your fees?",
                        type: "list",
                        choices: [
                            { name: chalk.hex('#74D7F7')("Bank Transfer"), value: "Bank Transfer" },
                            { name: chalk.hex('#74D7F7')("Jazz Cash"), value: "Jazz Cash" },
                            { name: chalk.hex('#74D7F7')("EasyPaisa"), value: "EasyPaisa" },
                            { name: chalk.hex('#74D7F7')("Online Payment"), value: "Online Payment" }
                        ]
                    }
                ]);
                let fees;
                if (paymentOption.option === "Bank Transfer" || "Jazz Cash" || "EasyPaisa" || "Online Payment") {
                    fees = await inquirer.prompt([
                        {
                            name: "amount",
                            message: "Enter your amount: ",
                            type: "number"
                        }
                    ]);
                    if (Number.isNaN(fees.amount)) {
                        console.log(chalk.hex('#D70040')("You must enter a number!\n"));
                    }
                    else if (fees.amount !== courseFees[option.course]) {
                        console.log(chalk.hex('#D70040')("Please enter a valid amount\n"));
                    }
                    else {
                        studentManager.course_enroll_student(input.id, option.course, fees.amount);
                    }
                }
                else {
                    console.log(chalk.hex('#D70040')("Please select a valid option to pay fees.\n"));
                }
            }
        }
    }
}
// Student Status
export async function studentStatus(studentManager) {
    let status = await inquirer.prompt([
        {
            name: "id",
            message: "Enter Student ID: ",
            type: "number"
        }
    ]);
    let student = await findStudentAndHandleErrors(status.id, studentManager);
    if (student) {
        studentManager.show_student_status(status.id);
    }
}
// Student Balance
export async function studentBalance(studentManager) {
    let checkBalance = await inquirer.prompt([
        {
            name: "id",
            message: "Enter a Student ID: ",
            type: "number"
        }
    ]);
    let student = await findStudentAndHandleErrors(checkBalance.id, studentManager);
    if (student) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                message: "Would you like to: ",
                type: "list",
                choices: [
                    { name: chalk.hex('#74D7F7')("View Balance"), value: "View Balance" },
                    { name: chalk.hex('#74D7F7')("Deposit Amount"), value: "Deposit Amount" }
                ]
            }
        ]);
        if (option.choice === "View Balance") {
            studentManager.view_student_balance(checkBalance.id);
        }
        else if (option.choice === "Deposit Amount") {
            let paymentOption = await inquirer.prompt([
                {
                    name: "option",
                    message: "How would you like to deposit amount?",
                    type: "list",
                    choices: [
                        { name: chalk.hex('#74D7F7')("Bank Transfer"), value: "Bank Transfer" },
                        { name: chalk.hex('#74D7F7')("Jazz Cash"), value: "Jazz Cash" },
                        { name: chalk.hex('#74D7F7')("EasyPaisa"), value: "EasyPaisa" },
                        { name: chalk.hex('#74D7F7')("Online Payment"), value: "Online Payment" }
                    ]
                }
            ]);
            if (paymentOption.option === "Bank Transfer" || "Jazz Cash" || "EasyPaisa" || "Online Payment") {
                let amount = await inquirer.prompt([
                    {
                        name: "amount",
                        message: "Enter your amount: ",
                        type: "number"
                    }
                ]);
                if (Number.isNaN(amount.amount)) {
                    console.log(chalk.hex('#D70040')("You must enter a number!\n"));
                }
                else {
                    studentManager.balance_deposit(amount.amount);
                }
            }
        }
    }
}
