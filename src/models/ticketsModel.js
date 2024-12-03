import db from "../../db/database.js";

const getAllTickets = () => {
    return new Promise((resolve, reject) => {
        db.all(
            `
            SELECT tickets.id, customers.name AS customer, schedules.date_time AS schedule, 
                   schedules.movie_id, schedules.room_id, tickets.seat_number
            FROM tickets
            JOIN customers ON tickets.customer_id = customers.id
            JOIN schedules ON tickets.schedule_id = schedules.id
            `,
            [],
            (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            }
        );
    });
};

const getTicketById = (id) => {
    return new Promise((resolve, reject) => {
        db.get(
            `
            SELECT * FROM tickets WHERE id = ?
            `,
            [id],
            (err, row) => {
                if (err) reject(err);
                resolve(row);
            }
        );
    });
};

const addTicket = (ticket) => {
    return new Promise((resolve, reject) => {
        const { customer_id, schedule_id, seat_number } = ticket;
        db.run(
            `
            INSERT INTO tickets (customer_id, schedule_id, seat_number) VALUES (?, ?, ?)
            `,
            [customer_id, schedule_id, seat_number],
            function (err) {
                if (err) reject(err);
                resolve(this.lastID);
            }
        );
    });
};

const updateTicket = (id, ticket) => {
    return new Promise((resolve, reject) => {
        const { customer_id, schedule_id, seat_number } = ticket;
        db.run(
            `
            UPDATE tickets SET customer_id = ?, schedule_id = ?, seat_number = ? WHERE id = ?
            `,
            [customer_id, schedule_id, seat_number, id],
            function (err) {
                if (err) reject(err);
                resolve(this.changes);
            }
        );
    });
};

const deleteTicket = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM tickets WHERE id = ?", [id], function (err) {
            if (err) reject(err);
            resolve(this.changes);
        });
    });
};

export default { getAllTickets, getTicketById, addTicket, updateTicket, deleteTicket };
