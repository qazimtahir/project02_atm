import inquirer from "inquirer";
import chalk from "chalk";
// ATM users
let accountHolders = [
    "Muhammad Tahir Iqbal",
    "Muhammad Tariq Iqbal",
    "Talha Tariq",
    "Jahanzaib Tayyab",
    "Sadia Yousaf",
    "Nimra Mehra",
    "Kiran Khan",
    "Emaan Fatima",
    "Sumera Shahid",
    "Samra Shahzadi",
];
//user pin verification starts from here.
const Pin = await inquirer.prompt([
    {
        type: "number",
        name: "verificationPin",
        message: "Enter your pin",
    },
]);
if (Pin.verificationPin === 1234) {
    console.log(chalk.green(`
  Welcome, ` + getRandomName()));
    console.log("");
    let userInput = await inquirer.prompt([
        {
            type: "list",
            name: "AccountType",
            message: "Select your account type",
            choices: ["Savings Account", "Current Account"],
        },
        {
            type: "list",
            name: "transactionType",
            choices: ["Fast Cash", "Cash withdraw", "Balance Inquiry"],
            message: "Select your transaction type: ",
        },
        {
            type: "number",
            name: "amount",
            message: "Enter your amount: ",
            when(userInput) {
                return userInput.transactionType === "Cash withdraw";
            },
        },
        {
            type: "list",
            name: "amount",
            choices: ["1000", "2000", "5000", "10000", "20000", "25000"],
            message: "Select amount:",
            when(userInput) {
                return userInput.transactionType === "Fast Cash";
            },
        },
    ]);
    //start atm machine using conditions
    const accountType = userInput.AccountType;
    const transactionType = userInput.transactionType;
    const amount = userInput.amount;
    const userBalance = Math.floor(Math.random() * 1000000);
    if (transactionType === "Balance Inquiry") {
        console.log(chalk.greenBright(`Available Balance Rs. ` + userBalance));
        console.log(chalk.yellowBright(`Thank you for using ATM.`));
    }
    else if (transactionType === "Fast Cash") {
        console.log(`Please take Rs. ` + amount);
        const remainingBalance = userBalance - amount;
        console.log(chalk.greenBright(`Remaining Balance Rs. ` + remainingBalance));
        console.log(chalk.yellowBright(`Thank you for using ATM.`));
    }
    else if (transactionType === "Cash withdraw") {
        console.log(`Please take Rs. ` + amount);
        const remainingBalance = userBalance - amount;
        console.log(chalk.greenBright(`Remaining Balance Rs. ` + remainingBalance));
        console.log(chalk.yellowBright(`Thank you for using ATM.`));
    }
    //outer if condition
}
else {
    console.log(chalk.red("Invalid PIN"));
}
function getRandomName() {
    return accountHolders[Math.floor(Math.random() * accountHolders.length)];
}
