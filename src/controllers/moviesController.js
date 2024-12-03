import { addMovie, deleteMovie, getAllMovies, getMovieById, updateMovie } from "../models/moviesModel.js";

const getMovies = async (req, res) => {
    try {
        const movies = await getAllMovies();
        res.render("movies/index", { movies });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener las películas");
    }
};

const createMovie = async (req, res) => {
    try {
        await addMovie(req.body);
        res.redirect("/movies");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al agregar la película");
    }
};

const edit_view_movie = async (req, res) => {
    try {
        const movie = await getMovieById(req.params.id);
        res.render("movies/edit", { movie });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al cargar la película para edición");
    }
};

const edith_movie_post = async (req, res) => {
    try {
        await updateMovie(req.params.id, req.body);
        res.redirect("/movies");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al actualizar la película");
    }
};

const delete_movie_id = async (req, res) => {
    try {
        await deleteMovie(req.params.id);
        res.redirect("/movies");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al eliminar la película");
    }
};

export default {
    getMovies,
    createMovie,
    edit_view_movie,
    edith_movie_post,
    delete_movie_id,
};
