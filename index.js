#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Hero {
    name;
    health = 100;
    constructor(name) {
        this.name = name;
    }
    decreaseHealth() {
        this.health -= 20;
    }
    increaseHealth() {
        this.health = 100;
    }
}
// for enemy
class Enemy {
    name;
    health = 100;
    constructor(name) {
        this.name = name;
    }
    decreaseHealth() {
        this.health -= 20;
    }
    increaseHealth() {
        this.health = 100;
    }
}
// step 2
async function main() {
    const { heroName } = await inquirer.prompt([
        {
            type: "input",
            name: "heroName",
            message: "Enter Your Hero Name:"
        }
    ]);
    // enemy object
    const { enemyType } = await inquirer.prompt([
        {
            type: "list",
            name: "enemyType",
            choices: ["alien", "witch", "zombie"],
            message: "Select the enemy you fight with:"
        }
    ]);
    // step 3
    const hero = new Hero(heroName);
    const enemy = new Enemy(enemyType);
    console.log(chalk.black(`${enemy.name} v/s ${hero.name}`));
    // step 4
    do {
        const { action } = await inquirer.prompt([
            {
                type: "list",
                name: "action",
                choices: ["attack", "defend", "range", "target", "run"],
                message: "Choose the attack type to perform action",
            }
        ]);
        // step 5
        switch (action) {
            case "attack":
                const randomNum = Math.random();
                if (randomNum > 0.5) {
                    hero.decreaseHealth();
                    console.log(chalk.yellow(`${hero.name} health: ${hero.health}`));
                    console.log(chalk.yellow(`${enemy.name} health: ${enemy.health}`));
                    if (hero.health <= 0) {
                        console.log(chalk.yellow("You lost! Try again"));
                        return;
                    }
                }
                else {
                    enemy.decreaseHealth();
                    console.log(chalk.yellow(`${hero.name} health: ${hero.health}`));
                    console.log(chalk.yellow(`${enemy.name} health: ${enemy.health}`));
                    if (enemy.health <= 0) {
                        console.log(chalk.bold.yellow("Congratulations!"));
                        return;
                    }
                }
                break;
            // Add other cases if needed
            default:
                console.log(chalk.yellow("Invalid action"));
        }
    } while (hero.health > 0 && enemy.health > 0);
}
main();
