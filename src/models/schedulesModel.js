import db from "../../db/database.js";

const getAllSchedules = () => {
    return new Promise((resolve, reject) => {
        db.all(
            `
            SELECT schedules.id, movies.title AS movie, rooms.name AS room, schedules.date_time
            FROM schedules
            JOIN movies ON schedules.movie_id = movies.id
            JOIN rooms ON schedules.room_id = rooms.id
            `,
            [],
            (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            }
        );
    });
};

const getScheduleById = (id) => {
    return new Promise((resolve, reject) => {
        db.get(
            `
            SELECT schedules.id, schedules.movie_id, schedules.room_id, schedules.date_time
            FROM schedules
            WHERE schedules.id = ?
            `,
            [id],
            (err, row) => {
                if (err) reject(err);
                resolve(row);
            }
        );
    });
};

const addSchedule = (schedule) => {
    return new Promise((resolve, reject) => {
        const { movie_id, room_id, date_time } = schedule;
        db.run(
            "INSERT INTO schedules (movie_id, room_id, date_time) VALUES (?, ?, ?)",
            [movie_id, room_id, date_time],
            function (err) {
                if (err) reject(err);
                resolve(this.lastID);
            }
        );
    });
};

const updateSchedule = (id, schedule) => {
    return new Promise((resolve, reject) => {
        const { movie_id, room_id, date_time } = schedule;
        db.run(
            "UPDATE schedules SET movie_id = ?, room_id = ?, date_time = ? WHERE id = ?",
            [movie_id, room_id, date_time, id],
            function (err) {
                if (err) reject(err);
                resolve(this.changes);
            }
        );
    });
};

const deleteSchedule = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM schedules WHERE id = ?", [id], function (err) {
            if (err) reject(err);
            resolve(this.changes);
        });
    });
};

export default { getAllSchedules, getScheduleById, addSchedule, updateSchedule, deleteSchedule };
