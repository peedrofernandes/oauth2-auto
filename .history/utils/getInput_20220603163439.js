const readline = require("readline");



const getInput = (question) => {
  const scan = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const response = scan.question(question);
}