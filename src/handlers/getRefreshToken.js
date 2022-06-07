const axios = require("axios");

async function getRefreshToken(client_id, client_secret, redirect_uri, code) {
  const params = {
    client_id,
    client_secret,
    redirect_uri,
    grant_type: "authorization_code",
    code
  }

  try {
    const response = await axios.post("https://oauth2.googleapis.com/token", null, {
      params
    })

    return response.data;

  } catch (error) {
    console.error(`It was not possible to get the refresh token! ${error}`)
  }

}

module.exports = getRefreshToken;