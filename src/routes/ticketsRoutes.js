import express from "express";
import ticketsController from "../controllers/ticketsController.js";

const router = express.Router();

// Listar todos los boletos
router.get("/", ticketsController.getTickets);

// Mostrar formulario para crear un boleto
router.get("/create", ticketsController.showCreateForm);

// Crear un boleto
router.post("/create", ticketsController.createTicket);

// Mostrar formulario para editar un boleto
router.get("/edit/:id", ticketsController.showEditForm);

// Actualizar un boleto
router.post("/edit/:id", ticketsController.editTicket);

// Eliminar un boleto
router.get("/delete/:id", ticketsController.deleteTicket);

export default router;
