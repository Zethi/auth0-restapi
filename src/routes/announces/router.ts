import express from "express";

export const router = express.Router();

// Obtener todos los anuncios
router.get("/", (req, res) => {
  res.send("Get");
});

// Obtener un anuncio por id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Get - ${id}`);
});

// Añadir un nuevo anuncio a la lista
router.post("/", (req, res) => {
  res.send("Post");
});

module.exports = router;
