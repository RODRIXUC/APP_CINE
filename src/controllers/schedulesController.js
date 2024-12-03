import schedulesModel from "../models/schedulesModel.js";
import { getAllMovies } from "../models/moviesModel.js";
import roomsModel from "../models/roomsModel.js";

const getSchedules = async (req, res) => {
    try {
        const schedules = await schedulesModel.getAllSchedules();
        res.render("schedules/index", { schedules });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los horarios");
    }
};

const showCreateForm = async (req, res) => {
    try {
        const movies = await getAllMovies();
        const rooms = await roomsModel.getAllRooms();
        res.render("schedules/create", { movies, rooms });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al cargar los datos para crear un horario");
    }
};

const createSchedule = async (req, res) => {
    try {
        await schedulesModel.addSchedule(req.body);
        res.redirect("/schedules");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al agregar el horario");
    }
};

const showEditForm = async (req, res) => {
    try {
        const schedule = await schedulesModel.getScheduleById(req.params.id);
        const movies = await getAllMovies();
        const rooms = await roomsModel.getAllRooms();
        res.render("schedules/edit", { schedule, movies, rooms });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al cargar el horario para edición");
    }
};

const editSchedule = async (req, res) => {
    try {
        await schedulesModel.updateSchedule(req.params.id, req.body);
        res.redirect("/schedules");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al actualizar el horario");
    }
};

const deleteSchedule = async (req, res) => {
    try {
        await schedulesModel.deleteSchedule(req.params.id);
        res.redirect("/schedules");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al eliminar el horario");
    }
};

export default { getSchedules, showCreateForm, createSchedule, showEditForm, editSchedule, deleteSchedule };
