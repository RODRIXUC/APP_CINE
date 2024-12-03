import express from "express";
import moviesController from "../controllers/moviesController.js";

const router = express.Router();

router.get("/", moviesController.getMovies);
router.post("/create", moviesController.createMovie);
// Ruta para mostrar el formulario de edición
router.get("/edit/:id", moviesController.edit_view_movie);

// Ruta para procesar la edición de una película
router.post("/edit/:id", moviesController.edith_movie_post);

// Ruta para eliminar una película
router.get("/delete/:id", moviesController.delete_movie_id);

export default router;