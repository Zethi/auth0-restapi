import { db } from "./db.config";
import { express } from "./express.config";
import { auth0 } from "./auth0.config";
import { encrypt } from "./encrypt.config";
const config = { db, express, auth0, encrypt };

export default config;
