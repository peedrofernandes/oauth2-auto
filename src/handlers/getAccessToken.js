const axios = require("axios");

async function getAccessToken(client_id, client_secret, redirect_uri, refresh_token) {
  const body = {
    client_id,
    client_secret,
    redirect_uri,
    grant_type: "refresh_token",
    refresh_token
  };

  try {
    const response = await axios.post("https://oauth2.googleapis.com/token", body);
    return response.data;
  } catch (error) {
    console.error(`It was not possible to get the access token! ${error}`);
  }
}

module.exports = getAccessToken;