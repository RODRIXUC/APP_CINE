import ticketsModel from "../models/ticketsModel.js";
import customersModel from "../models/customersModel.js";
import schedulesModel from "../models/schedulesModel.js";

const getTickets = async (req, res) => {
    try {
        const tickets = await ticketsModel.getAllTickets();
        res.render("tickets/index", { tickets });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los boletos");
    }
};

const showCreateForm = async (req, res) => {
    try {
        const customers = await customersModel.getAllCustomers();
        const schedules = await schedulesModel.getAllSchedules();

        console.log(JSON.stringify(schedules))
        res.render("tickets/create", { customers, schedules });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al cargar los datos para crear un boleto");
    }
};

const createTicket = async (req, res) => {
    try {
        await ticketsModel.addTicket(req.body);
        res.redirect("/tickets");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al agregar el boleto");
    }
};

const showEditForm = async (req, res) => {
    try {
        const ticket = await ticketsModel.getTicketById(req.params.id);
        const customers = await customersModel.getAllCustomers();
        const schedules = await schedulesModel.getAllSchedules();
        res.render("tickets/edit", { ticket, customers, schedules });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al cargar el boleto para edición");
    }
};

const editTicket = async (req, res) => {
    try {
        await ticketsModel.updateTicket(req.params.id, req.body);
        res.redirect("/tickets");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al actualizar el boleto");
    }
};

const deleteTicket = async (req, res) => {
    try {
        await ticketsModel.deleteTicket(req.params.id);
        res.redirect("/tickets");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al eliminar el boleto");
    }
};

export default { getTickets, showCreateForm, createTicket, showEditForm, editTicket, deleteTicket };
