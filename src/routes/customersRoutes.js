import express from "express";
import customersController from "../controllers/customersController.js";

const router = express.Router();

// Listar todos los clientes
router.get("/", customersController.getCustomers);

// Mostrar formulario para crear un cliente
router.get("/create", customersController.showCreateForm);

// Crear un cliente
router.post("/create", customersController.createCustomer);

// Mostrar formulario para editar un cliente
router.get("/edit/:id", customersController.showEditForm);

// Actualizar un cliente
router.post("/edit/:id", customersController.editCustomer);

// Eliminar un cliente
router.get("/delete/:id", customersController.deleteCustomer);

export default router;
