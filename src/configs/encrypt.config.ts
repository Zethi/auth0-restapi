require("dotenv").config({ path: "../.env" });

export const encrypt = {
  secret_key: process.env.ENCRYPT_SECRET_KEY,
};
