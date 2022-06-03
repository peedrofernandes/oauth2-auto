const axios = require("axios");
const getInput = require("./utils/getInput");

function main() {
  const string = await getInput("Type something: ");
  console.log(string);
}

main();

