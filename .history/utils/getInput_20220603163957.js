const readline = require("readline");

const getInput = (question) => {
  const scan = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve, reject) => {
    scan.question(question, (response) => {
      resolve(response);
    })
    scan.close();
  })
}

module.exports = getInput;