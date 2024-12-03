import db from "../../db/database.js";

const getDashboardData = () => {
    return new Promise((resolve, reject) => {
        db.all(
            `
            SELECT 
                movies.title AS movie_title,
                rooms.name AS room_name,
                schedules.date_time AS schedule_time,
                customers.name AS customer_name
            FROM tickets
            JOIN schedules ON tickets.schedule_id = schedules.id
            JOIN movies ON schedules.movie_id = movies.id
            JOIN rooms ON schedules.room_id = rooms.id
            JOIN customers ON tickets.customer_id = customers.id
            ORDER BY movies.title, schedules.date_time
            `,
            [],
            (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            }
        );
    });
};

export default { getDashboardData };
