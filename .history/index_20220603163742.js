const axios = require("axios");
const getInput = require("./utils/getInput");

async function main() {
  try {
  const string = await getInput("Type something: ");
  console.log(string);
  } catch (error) {
    console.error(`There was an error reading user input: ${error}`)
  }
}

main();

