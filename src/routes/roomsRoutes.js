import express from "express";
import roomsController from "../controllers/roomsController.js";

const router = express.Router();

// Listar todas las salas
router.get("/", roomsController.getRooms);

// Mostrar formulario para crear una sala
router.get("/create", roomsController.showCreateForm);

// Crear una sala
router.post("/create", roomsController.createRoom);

// Mostrar formulario para editar una sala
router.get("/edit/:id", roomsController.showEditForm);

// Actualizar una sala
router.post("/edit/:id", roomsController.editRoom);

// Eliminar una sala
router.get("/delete/:id", roomsController.deleteRoom);

export default router;
