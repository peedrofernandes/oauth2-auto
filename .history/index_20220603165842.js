const axios = require("axios");
const getInput = require("./utils/getInput");
const getCodeUrl = require("./")

async function main() {
  console.log("Welcome to the automated refresh token generator!");
  console.log("To proceed, you will need to enter some specific data. Please have your credentials JSON file handy.");

  const client_id = await getInput("Enter your Client ID credential: ");
  const client_secret = await getInput("Enter your Client Secret credential: ");
  const redirect_uri = await getInput("Enter the redirection URI of your choice: ");
  const scope = await getInput("Now finally, enter the scope of the API you wish to use: ");

  const codeUrl = await getCodeUrl(client_id, client_secret, redirect_uri, scope)
}

main();

