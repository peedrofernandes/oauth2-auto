function getCodeUrl(client_id, client_secret, redirect_uri, scope) {
  const paramsJson = {
    client_id,
    client_secret,
    redirect_uri,
    scope
  };

  const params = new URLSearchParams();

  for (const param in paramsJson) {
    const key = param.toString();
    const value = paramsJson(key);
    params.append(key, value);
  }

  const baseURL = "https://accounts.google.com/o/oauth2/auth""

  const final
}