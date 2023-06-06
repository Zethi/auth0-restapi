import express from "express";
import { Post } from "../../interfaces/Post";
import { ValidatePost } from "../../middlewares/";
import { posts } from "../../services/posts";

const router = express.Router();

// Obtener todos los anuncios
router.get("/", (req, res) => {
  const limit = Number(req.query.limit);
  const getFrom = Number(req.query.from);

  posts
    .getAll(limit, getFrom)
    .then((posts) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(posts);
    })
    .catch(() => {
      res.setHeader("Content-Type", "application/json");
      res.status(404).json({ error: `${req.originalUrl} could not be found` });
    });
});

// Obtener un anuncio por id
router.get("/:id", (req: any, res: any) => {
  const id = req.params.id;
  posts
    .getById(Number(id))
    .then((post) => {
      res.json(post);
    })
    .catch(() => res.json({ error: `${req.originalUrl} could not be found` }));
});

// Añadir un nuevo anuncio a la base de datos
router.post("/", ValidatePost, (req: any, res: any) => {
  const post: Post = req.body;

  posts
    .create(post)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => res.json({ error: `${err}} could not be found` }));
});

router.delete("/:id", (req: any, res: any) => {
  const id = req.params.id;
  posts
    .delete(Number(id))
    .then((post) => {
      res.json(post);
    })
    .catch(() => res.json({ error: `${req.originalUrl} could not be found` }));
});

router.put("/:id", (req: any, res: any) => {
  const id = req.params.id;
  const post: Post = req.body;
  posts
    .update(Number(id), post)
    .then((post) => {
      res.json(post);
    })
    .catch(() => res.json({ error: `${req.originalUrl} could not be found` }));
});

module.exports = router;
