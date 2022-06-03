const readline = require("readline");

const getInput = (question) => {
  const scan = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve, reject) => {
    scan.question(question, res => {
      resolve(res);
      scan.close()
    })
  })
}

module.exports = getInput;