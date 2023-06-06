import express from "express";
import { User } from "../../interfaces/User";
import { users } from "../../services/users";
import { ValidateUser } from "../../middlewares/";
import { Encrypt } from "../../utils/Encrypt";

const router = express.Router();

// get all users from the table users
router.get("/", (req: any, res: any) => {
  const limit = Number(req.query.limit);
  const getFrom = Number(req.query.from);

  users.getAll(limit, getFrom).then((users) => {
    res.status(200).json(users);
  });
});

// get user by id from the table users
router.get("/:id", (req: any, res: any) => {
  const id = req.params.id;
  if (typeof Number(id) != "number" || isNaN(Number(id))) {
    return res.status(400).json({ error: "The id must be a number" });
  }

  users.getById(Number(id)).then((post) => {
    res.status(200).json(post);
  });
});

// Add a new user to the users table
router.post("/", ValidateUser, async (req: any, res: any) => {
  const user: User = req.body;
  user.password = await Encrypt.hash(user.password);
  user.email = user.email.toLowerCase().replace(/ /g, "");

  if (((await users.getByUsername(user.username)) as User[]).length != 0) {
    return res
      .status(400)
      .json({ error: "This username is already registered" });
  }
  if (((await users.getByEmail(user.email)) as User[]).length != 0) {
    return res
      .status(400)
      .json({ error: "This email address is already registered" });
  }

  users
    .create(user)
    .then((user) => {
      return res.status(201).json(user);
    })
    .catch(async () => {
      return res.status(500).json({ error: "Error creating user" });
    });
});

module.exports = router;
