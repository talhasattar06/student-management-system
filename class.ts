import chalk from 'chalk';
export let balance: number;

export class Student {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    fatherName: string;
    age: number;
    courses: string[];

    constructor(firstName: string, lastName: string, fatherName: string, age: number) {
        this.id = Math.floor(Math.random() * 90000) + 10000;
        this.firstName = this.toTitleCase(firstName);
        this.lastName = lastName;
        this.fatherName = this.toTitleCase(fatherName);
        this.age = age;
        this.courses = [];
        this.fullName = this.toTitleCase(`${firstName} ${lastName}`);
        balance = 30000;
    }

    private toTitleCase(str: string): string {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    course_enroll(course: string, amount: number) {

        if (this.courses.includes(course)) {
            console.log(chalk.hex('#FF69B4')(`You are already enrolled in the course: ${course}.\n`));
        } else {
            balance -= amount
            this.courses.push(course)

            console.log(chalk.hex('#32CD32')(`${this.fullName} enrolled in ${course} successfully!`));
            console.log(chalk.hex('#32CD32')(`Rs. ${amount}/- Fees paid successfully. Your new balance is Rs. ${balance}/-\n`));
        }
    }
    
    show_status() {
        const border = '*'.repeat(40);
        
        console.log('\n');
        console.log(chalk.hex('#5D3FD3')(`\t\t\t\t${border}`));
        console.log(`\t\t\t\t\t     ${chalk.bgHex('#ADD8E6')(chalk.hex('#5D3FD3')(`Student Info:`))}`);
        console.log('\n');
        console.log(chalk.hex('#ADD8E6')(`\t\t\t\t* Student ID: ${this.id}`));
        console.log(chalk.hex('#ADD8E6')(`\t\t\t\t* Name: ${this.fullName}`));
        console.log(chalk.hex('#ADD8E6')(`\t\t\t\t* Father's Name: ${this.fatherName}`));
        console.log(chalk.hex('#ADD8E6')(`\t\t\t\t* Age: ${this.age}`));
        console.log(chalk.hex('#ADD8E6')(`\t\t\t\t* Courses: ${this.courses.length > 0 ? this.courses.join(", ") : "None"}`));
        console.log(chalk.hex('#ADD8E6')(`\t\t\t\t* Balance: Rs. ${balance}/-`));
        console.log('\n');
        console.log(chalk.hex('#5D3FD3')(`\t\t\t\t${border}`));
        console.log('\n');
    }
        
    view_balance() {
        console.log(chalk.hex('#FF69B4')(`${this.firstName}'s Balance is: Rs. ${balance}/-\n`));
    }
}

export class StudentManagement {
    students: Student[]

    constructor() {
        this.students = [];
    }

    add_student(firstName: string, lastName: string, fatherName: string, age: number) {

        if (!firstName || !lastName || !fatherName || isNaN(age)) {
            console.log(chalk.hex('#D70040')("Please fill all the required fields with valid input!!!\n"));

        } else {
            let student = new Student(firstName, lastName, fatherName, age);
            this.students.push(student);
            console.log(chalk.hex('#1C8C1C')(`\nStudent: ${chalk.bgHex('#D2FFAD')(`${student.fullName}`)} enrolled successfully!    Student ID: ${chalk.bgHex('#D2FFAD')(`${student.id}`)}\n`));
        }
    }

    course_enroll_student(studentId: number, course: string, amount: number) {
        let student = this.find_student(studentId);
        if (Number.isNaN(studentId)) {
            console.log(chalk.hex('#D70040')("You must enter a number!\n"));

        } else if (student) {
            student.course_enroll(course, amount)

        } else {
            console.log(chalk.hex('#D70040')("Student not found. Please enroll or enter correct Student ID.\n"));
        }
    }

    show_student_status(studentId: number) {
        let student = this.find_student(studentId);
        if (Number.isNaN(studentId)) {
            console.log(chalk.hex('#D70040')("You must enter a number!\n"));

        } else if (student) {
            student.show_status()

        } else {
            console.log(chalk.hex('#D70040')("Student not found. Please enroll or enter correct Student ID.\n"));

        }
    }

    view_student_balance(studentId: number) {
        let student = this.find_student(studentId);
        if (Number.isNaN(studentId)) {
            console.log(chalk.hex('#D70040')("You must enter a number!\n"));

        } else if (student) {
            student.view_balance()

        } else {
            console.log(chalk.hex('#D70040')("Student not found. Please enroll or enter correct Student ID.\n"));

        }
    }

    balance_deposit(amount: number) {

        if (Number.isNaN(amount) || amount <= 0) {
            console.log(chalk.hex('#D70040')("You must enter a number!\n"));

        } else {
            balance += amount
            console.log(chalk.hex('#32CD32')(`Rs. ${amount} deposited successfully! Your new balance is Rs. ${balance}/-\n`));
        }
    }

    find_student(studentId: number) {
        return this.students.find(std => std.id === studentId);

    }
}