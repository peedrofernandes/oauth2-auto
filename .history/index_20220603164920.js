const axios = require("axios");
const getInput = require("./utils/getInput");

async function main() {
  console.log("Welcome to the automated refresh token generator!");
  console.log("To procee, you will need to enter some specific data. Please have your credentials JSON file handy.");

  const client_id = await getInput("Enter your client_id: ");
  const client_secret = await getInput("Enter your client_secret: ");
  const redirect_uri = await getInput("Enter the redirection URI of your choice: ");
}

main();

