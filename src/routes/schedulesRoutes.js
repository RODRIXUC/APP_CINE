import express from "express";
import schedulesController from "../controllers/schedulesController.js";

const router = express.Router();

// Listar todos los horarios
router.get("/", schedulesController.getSchedules);

// Mostrar formulario para crear un horario
router.get("/create", schedulesController.showCreateForm);

// Crear un horario
router.post("/create", schedulesController.createSchedule);

// Mostrar formulario para editar un horario
router.get("/edit/:id", schedulesController.showEditForm);

// Actualizar un horario
router.post("/edit/:id", schedulesController.editSchedule);

// Eliminar un horario
router.get("/delete/:id", schedulesController.deleteSchedule);

export default router;
