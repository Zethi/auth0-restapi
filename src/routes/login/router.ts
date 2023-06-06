import express from "express";
import { Encrypt } from "../../utils/Encrypt";
import { users } from "../../services/users";
import { Auth0 } from "../../utils/Auth0";
import { Users } from "../../models";

const router = express.Router();
const auth0 = new Auth0();

router.get("/", (req: any, res: any) => {
  const username = req.query.username as string;
  const password = req.query.password as string;

  users.getByUsername(String(username)).then(async (user: Users[]) => {
    if (!username || !password || user.length == 0) {
      return res.status(401).json({ error: "Username or password is missing" });
    }

    if (!(await Encrypt.compare(password, user[0].password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const auth_token = await auth0.generateToken();
    const session_token = users.createJwt(user[0]);

    return res.status(200).json({
      status: "ok",
      authentication: auth_token,
      user_session: session_token,
    });
  });
});

router.get("/validate", (req: any, res: any) => {
  const user_session = req.query.user_session as string;

  if (user_session) {
    return res.status(200).json(users.validateJwt(user_session));
  }

  return res.status(401).json({ error: "Invalid session" });
});

module.exports = router;
