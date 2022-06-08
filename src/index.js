const path = require("path");

const getInput = require("./handlers/getInput");

const getCodeUrl = require("./handlers/getCodeUrl");
const getRefreshToken = require("./handlers/getRefreshToken");
const getAccessToken = require("./handlers/getAccessToken");
const getCredentials = require("./handlers/getCredentials");

async function main() {
  console.log("- Welcome to the automated token generator!");
  console.log("- To proceed, you will need to enter some specific data. Please have your credentials JSON file handy.");

  const credentials = await getCredentials(path.resolve(__dirname, "data", "credentials.json"));
  
  let option;

  do {
    console.log("\n- Please select an option: ");
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

