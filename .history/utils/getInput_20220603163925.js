const readline = require("readline");

const getInput = (question) => {
  const scan = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve, reject) => {
    const input = scan.question(question, );
    resolve(input);
    scan.close();
  })
}

module.exports = getInput;