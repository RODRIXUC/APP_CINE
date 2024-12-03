import customersModel from "../models/customersModel.js";

const getCustomers = async (req, res) => {
    try {
        const customers = await customersModel.getAllCustomers();
        res.render("customers/index", { customers });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los clientes");
    }
};

const showCreateForm = (req, res) => {
    console.log('showCreateForm....')
    try {
        res.render("customers/create");       
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al agregar el cliente");
    }
};

const createCustomer = async (req, res) => {
    try {
        await customersModel.addCustomer(req.body);
        res.redirect("/customers");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al agregar el cliente");
    }
};

const showEditForm = async (req, res) => {
    try {
        const customer = await customersModel.getCustomerById(req.params.id);
        res.render("customers/edit", { customer });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al cargar el cliente para edición");
    }
};

const editCustomer = async (req, res) => {
    try {
        await customersModel.updateCustomer(req.params.id, req.body);
        res.redirect("/customers");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al actualizar el cliente");
    }
};

const deleteCustomer = async (req, res) => {
    try {
        await customersModel.deleteCustomer(req.params.id);
        res.redirect("/customers");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al eliminar el cliente");
    }
};

export default { getCustomers, showCreateForm, createCustomer, showEditForm, editCustomer, deleteCustomer };
