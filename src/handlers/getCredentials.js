const { default: axios } = require("axios");
const { readFile } = require("./handleFile");
const path = require("path");
const getInput = require("./getInput");

async function tryToReadLocalCredentialsFile(filePath) {
  let credentials;
  let credentialsFile;

  try {
    const data = await readFile(filePath);
    credentialsFile = JSON.parse(data);

    credentials = {
      client_id: credentialsFile.installed.client_id,
      client_secret: credentialsFile.installed.client_secret,
      redirect_uri: credentialsFile.installed.redirect_uris[0]
    };
  } catch (error) {
    if (error.code == "ENOENT")
      console.log("- No credential file was found on data directory, you'll have to manualy insert your credentials here.");
    else
      console.error(error);
  }

  return credentials;
}

async function getCredentials(filePath) {
  const credentials = await tryToReadLocalCredentialsFile(filePath);

  if (credentials) {
    console.log("- A local credential file was found with the following parameters: \n");
    console.log(`-- client_id: ${credentials.client_id}`);
    console.log(`-- client_secret: ${credentials.client_secret}`);
    console.log(`-- redirect_uri: ${credentials.redirect_uri}\n`)
  } else {
    const client_id = await getInput("- Enter your Client ID: ");
    const client_secret = await getInput("- Enter your Client Secret: ");
    const redirect_uri = await getInput("- Enter the redirection URI of your choice: ");
    credentials = { client_id, client_secret, redirect_uri };
  }

  const scope = await getInput("- Enter the scope of the API you want to use: ");
  credentials.scope = scope;

  return credentials;
}

module.exports = getCredentials;