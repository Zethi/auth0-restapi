require("dotenv").config({ path: "../.env" });

export const auth0 = {
  url: process.env.AUTH0_URL,
  client_id: process.env.AUTH0_CLIENT_ID,
  client_secret: process.env.AUTH0_CLIENT_SECRET,
  audience: process.env.AUTH0_AUDIENCE,
  grant_type: "client_credentials",
};
