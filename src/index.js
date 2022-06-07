const getInput = require("./handlers/getInput");

const getCodeUrl = require("./handlers/getCodeUrl");
const getRefreshToken = require("./handlers/getRefreshToken");
const { default: axios } = require("axios");
const { readFile } = require("./handlers/handleFile");
const path = require("path");
const getAccessToken = require("./handlers/getAccessToken");

async function main() {
  console.log("- Welcome to the automated token generator!");
  console.log("- To proceed, you will need to enter some specific data. Please have your credentials JSON file handy.");
  
  let credentialsFile;
  let credentials;
  let fileFound = false;
  let option;

  try {
    const data = await readFile(path.resolve(__dirname, "data", "credentials.json"));
    credentialsFile = JSON.parse(data);

    credentials = {
      client_id: credentialsFile.installed.client_id,
      client_secret: credentialsFile.installed.client_secret,
      redirect_uri: credentialsFile.installed.redirect_uris[0]
    };

    fileFound = true;
  } catch (error) {
    if (error.code == "ENOENT")
      console.log("- No credential file was found on data directory, you'll have to manualy insert your credentials here.");
    else
      console.error(error);
  }

  if (fileFound) {
    console.log("- A local credentials file was found with the following parameters: \n");
    console.log(`client_id: ${credentialsFile.installed.client_id}`);
    console.log(`client_secret: ${credentialsFile.installed.client_secret}`);
    console.log(`redirect_uri: ${credentialsFile.installed.redirect_uris[0]}\n`)
  } else {
    const client_id = await getInput("- Enter your Client ID: ");
    const client_secret = await getInput("- Enter your Client Secret: ");
    const redirect_uri = await getInput("- Enter the redirection URI of your choice: ");
    credentials = { client_id, client_secret, redirect_uri };
  }

  const scope = await getInput("- Enter the scope of the API you want to use: ");
  credentials.scope = scope;
  
  do {
    console.log("- Please select an option: ");
    console.log("- [1] I need a brand new refresh token");
    console.log("- [2] I already have a refresh token, I just need a new access token");
    console.log("- [0] I want to exit the program");

    option = await getInput("- Your option: ");

    switch (option) {
      case "1": // new Refresh Token
        const { client_id, client_secret, redirect_uri, scope } = credentials;
        const codeUrl = getCodeUrl(client_id, redirect_uri, scope);
      
        console.log(`\nYour code URL: ${codeUrl}\n`);
        console.log("Enter this link above, provide authorization and select the code url query parameter when the site redirects you to your redirect URI.");
        const code = await getInput("Enter your code here: ");
      
        const data = await getRefreshToken(client_id, client_secret, redirect_uri, code);
        console.log(data);

        break;
      
      case "2":
        try {
          const refresh_token = await getInput("Please, enter your refresh token here: ");

          const { client_id, client_secret, redirect_uri } = credentials;

          const data = await getAccessToken(client_id, client_secret, redirect_uri, refresh_token);

          console.log(data);

        } catch (error) {
          console.error(error);
        }
        break;
      case "0":
        console.log("- Leaving the token generator, see you soon!");
        break;
      default:
        console.log("Invalid option, please try again!");
        break;
    }
  } while (option != 0);
}

main();

