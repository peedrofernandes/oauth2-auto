const readline = require("readline");

const getInput = (question) => {
  const scan = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  scan.question(question, )
}

module.exports = getInput;