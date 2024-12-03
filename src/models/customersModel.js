import db from "../../db/database.js";

const getAllCustomers = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM customers", [], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const getCustomerById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM customers WHERE id = ?", [id], (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
};

const addCustomer = (customer) => {
    return new Promise((resolve, reject) => {
        const { name, email, phone } = customer;
        db.run(
            "INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)",
            [name, email, phone],
            function (err) {
                if (err) reject(err);
                resolve(this.lastID);
            }
        );
    });
};

const updateCustomer = (id, customer) => {
    return new Promise((resolve, reject) => {
        const { name, email, phone } = customer;
        db.run(
            "UPDATE customers SET name = ?, email = ?, phone = ? WHERE id = ?",
            [name, email, phone, id],
            function (err) {
                if (err) reject(err);
                resolve(this.changes);
            }
        );
    });
};

const deleteCustomer = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM customers WHERE id = ?", [id], function (err) {
            if (err) reject(err);
            resolve(this.changes);
        });
    });
};

export default { getAllCustomers, getCustomerById, addCustomer, updateCustomer, deleteCustomer };
