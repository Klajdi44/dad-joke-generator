#!/usr/bin/env node
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import { apiUrl } from "./modules/constants/constants.js";
import { fetchJoke, sleep } from "./modules/globals.js";

const getDadJokeMessage = () =>
  chalkAnimation.rainbow("Getting dad joke").start();

const getJoke = async () => {
  const {
    data: { joke: joke },
    error,
  } = await fetchJoke(apiUrl);

  console.log(chalk.bgGray(joke));
  await sleep(3000);
  hearAnotherJoke();
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
