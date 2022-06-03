const readline = require("readline");

const getInput = (question) => {
  const scan = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return Promise.resolve().then((v) => {
    scan.question
  })
}

module.exports = getInput;