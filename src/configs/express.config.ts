require("dotenv").config({ path: "../.env" });

export const express = {
  host: "127.0.0.1",
  port: process.env.EXPRESS_PORT,
};
