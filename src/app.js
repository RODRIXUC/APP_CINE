import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import expressLayouts from "express-ejs-layouts";



import schedulesRoutes from "./routes/schedulesRoutes.js";
import moviesRoutes from "./routes/moviesRoutes.js";
import roomsRoutes from "./routes/roomsRoutes.js";
import customersRoutes from "./routes/customersRoutes.js";
import ticketsRoutes from "./routes/ticketsRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";


const app = express();

// Resuelve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de EJS y Layouts
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layout");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

// Rutas
app.use("/movies", moviesRoutes);
app.use("/rooms", roomsRoutes);
app.use("/schedules", schedulesRoutes);
app.use("/customers", customersRoutes);
app.use("/tickets", ticketsRoutes);
app.use("/", dashboardRoutes);





export default app;
