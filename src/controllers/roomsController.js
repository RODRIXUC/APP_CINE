import roomsModel from "../models/roomsModel.js";

const getRooms = async (req, res) => {
    try {
        const rooms = await roomsModel.getAllRooms();
        res.render("rooms/index", { rooms });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener las salas");
    }
};

const showCreateForm = (req, res) => {
    res.render("rooms/create");
};

const createRoom = async (req, res) => {
    try {
        await roomsModel.addRoom(req.body);
        res.redirect("/rooms");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al agregar la sala");
    }
};

const showEditForm = async (req, res) => {
    try {
        const room = await roomsModel.getRoomById(req.params.id);
        res.render("rooms/edit", { room });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al cargar la sala para edición");
    }
};

const editRoom = async (req, res) => {
    try {
        await roomsModel.updateRoom(req.params.id, req.body);
        res.redirect("/rooms");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al actualizar la sala");
    }
};

const deleteRoom = async (req, res) => {
    try {
        await roomsModel.deleteRoom(req.params.id);
        res.redirect("/rooms");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al eliminar la sala");
    }
};

export default { getRooms, showCreateForm, createRoom, showEditForm, editRoom, deleteRoom };
