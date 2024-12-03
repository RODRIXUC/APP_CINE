import express from "express";
import dashboardController from "../controllers/dashboardController.js";

const router = express.Router();

// Página principal
router.get("/", dashboardController.showDashboard);

export default router;
