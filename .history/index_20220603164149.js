const axios = require("axios");
const getInput = require("./utils/getInput");

async function main() {
  const string = getInput("Type something: ");
  console.log(string);
}

main();

