import db from "../../db/database.js";

const getAllRooms = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM rooms", [], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const getRoomById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM rooms WHERE id = ?", [id], (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
};

const addRoom = (room) => {
    return new Promise((resolve, reject) => {
        const { name, capacity } = room;
        db.run(
            "INSERT INTO rooms (name, capacity) VALUES (?, ?)",
            [name, capacity],
            function (err) {
                if (err) reject(err);
                resolve(this.lastID);
            }
        );
    });
};

const updateRoom = (id, room) => {
    return new Promise((resolve, reject) => {
        const { name, capacity } = room;
        db.run(
            "UPDATE rooms SET name = ?, capacity = ? WHERE id = ?",
            [name, capacity, id],
            function (err) {
                if (err) reject(err);
                resolve(this.changes);
            }
        );
    });
};

const deleteRoom = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM rooms WHERE id = ?", [id], function (err) {
            if (err) reject(err);
            resolve(this.changes);
        });
    });
};

export default { getAllRooms, getRoomById, addRoom, updateRoom, deleteRoom };
