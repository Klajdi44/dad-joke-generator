#!/usr/bin/env node
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import { apiUrl } from "./modules/constants/constants.js";
import { fetchJoke, sleep } from "./modules/globals.js";

const isSingle = process.argv.includes("--single");

const getDadJokeMessage = () =>
  chalkAnimation.rainbow("Getting dad joke").start();

const getJoke = async () => {
  const { data, error } = await fetchJoke(apiUrl);
  if (error) return console.log(chalk.bgRed(error));
  const joke = data?.joke;

  console.log(chalk.bgGray(joke));
  await sleep(isSingle ? 1000 : 2500);
  !isSingle && hearAnotherJoke();
};

const hearAnotherJoke = async () => {
  const question = await inquirer.prompt({
    name: "hearMore",
    type: "list",
    message: `Wanna "hear" another one?`,
    choices: ["Yes", "No"],
  });
  return handleAnotherJoke(question.hearMore === "Yes");
};

const handleAnotherJoke = answer => {
  const spinner = createSpinner("Getting Joke");
  if (!answer) {
    return spinner.error({ text: "Enough dad jokes for today, exiting..." });
  }
  getDadJokeMessage();
  getJoke();
};

getDadJokeMessage();
getJoke();
