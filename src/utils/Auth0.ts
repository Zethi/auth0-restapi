import HttpClient from "./HttpClient";
import config from "../configs/config";

const AUTH0_CREDENTIALS = {
  client_id: config.auth0.client_id,
  client_secret: config.auth0.client_secret,
  audience: config.auth0.audience,
  grant_type: "client_credentials",
};

export class Auth0 {
  async generateToken(): Promise<object> {
    const token: any = await HttpClient.post(
      config.auth0.url,
      AUTH0_CREDENTIALS,
      {
        headers: { "Content-Type": "application/json" },
      }
    ).catch(() => {
      return "error";
    });

    if (token == "error") {
      return {
        error:
          "An error has occurred, the server providing the tokens is down.",
      };
    }
    return {
      token: token.access_token,
    };
  }
}
