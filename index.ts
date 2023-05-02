#! /usr/bin/env node
//oop myBank

import chalk from "chalk";
import figlet from "figlet";

const welCome = async () => {
    console.log(chalk.redBright(figlet.textSync("OOP MyBank \n")));
  };
  await welCome();

class Account {
    private balance: number;
    
    constructor(balance: number) {
      this.balance = balance;
    }
    
    public deposit(amount: number): void {
      this.balance += amount;
      console.log(chalk.yellowBright(`Deposited $${amount}. New balance: $${this.balance}.`));
    }
    
    public withdraw(amount: number): void {
      if (amount > this.balance) {
        console.log(chalk.blueBright(`Insufficient funds. Cannot withdraw $${amount}. Current balance: $${this.balance}.`));
      } else {
        this.balance -= amount;
        console.log(chalk.greenBright(`Withdrew $${amount}. New balance: $${this.balance}.`));
      }
    }
    
    public getBalance(): number {
      return this.balance;
    }
  }
  
  class SavingsAccount extends Account {
    private interestRate: number;
    
    constructor(balance: number, interestRate: number) {
      super(balance);
      this.interestRate = interestRate;
    }
    
    public addInterest(): void {
      const interest = this.getBalance() * this.interestRate;
      this.deposit(interest);
      console.log(chalk.cyanBright(`Added interest of $${interest}. New balance: $${this.getBalance()}.`));
    }
  }
  
  class CheckingAccount extends Account {
    private overdraftLimit: number;
    
    constructor(balance: number, overdraftLimit: number) {
      super(balance);
      this.overdraftLimit = overdraftLimit;
    }
    
    public withdraw(amount: number): void {
      if (amount > this.getBalance() + this.overdraftLimit) {
        console.log(chalk.bgGrey(`Cannot withdraw $${amount}. Overdraft limit reached. Current balance: $${this.getBalance()}.`));
      } else {
        super.withdraw(amount);
      }
    }
  }
  
  const savings = new SavingsAccount(1000, 0.05);
  const checking = new CheckingAccount(500, 100);
  
  savings.addInterest();
  checking.withdraw(600);
  checking.withdraw(200);