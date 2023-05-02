#! /usr/bin/env node
//oop myBank
import chalk from "chalk";
import figlet from "figlet";
const welCome = async () => {
    console.log(chalk.redBright(figlet.textSync("OOP MyBank \n")));
};
await welCome();
class Account {
    balance;
    constructor(balance) {
        this.balance = balance;
    }
    deposit(amount) {
        this.balance += amount;
        console.log(chalk.yellowBright(`Deposited $${amount}. New balance: $${this.balance}.`));
    }
    withdraw(amount) {
        if (amount > this.balance) {
            console.log(chalk.blueBright(`Insufficient funds. Cannot withdraw $${amount}. Current balance: $${this.balance}.`));
        }
        else {
            this.balance -= amount;
            console.log(chalk.greenBright(`Withdrew $${amount}. New balance: $${this.balance}.`));
        }
    }
    getBalance() {
        return this.balance;
    }
}
class SavingsAccount extends Account {
    interestRate;
    constructor(balance, interestRate) {
        super(balance);
        this.interestRate = interestRate;
    }
    addInterest() {
        const interest = this.getBalance() * this.interestRate;
        this.deposit(interest);
        console.log(chalk.cyanBright(`Added interest of $${interest}. New balance: $${this.getBalance()}.`));
    }
}
class CheckingAccount extends Account {
    overdraftLimit;
    constructor(balance, overdraftLimit) {
        super(balance);
        this.overdraftLimit = overdraftLimit;
    }
    withdraw(amount) {
        if (amount > this.getBalance() + this.overdraftLimit) {
            console.log(chalk.bgGrey(`Cannot withdraw $${amount}. Overdraft limit reached. Current balance: $${this.getBalance()}.`));
        }
        else {
            super.withdraw(amount);
        }
    }
}
const savings = new SavingsAccount(1000, 0.05);
const checking = new CheckingAccount(500, 100);
savings.addInterest();
checking.withdraw(600);
checking.withdraw(200);
