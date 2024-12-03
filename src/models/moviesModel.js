import db from '../../db/database.js'

export const getAllMovies = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM movies', [], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

export const addMovie = (movie) => {
    return new Promise((resolve, reject) => {
        const { title, genre, duration, rating } = movie;
        db.run(
            'INSERT INTO movies (title, genre, duration, rating) VALUES (?, ?, ?, ?)',
            [title, genre, duration, rating],
            function (err) {
                if (err) reject(err);
                resolve(this.lastID);
            }
        );
    });
};

export const getMovieById = (id) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM movies WHERE id = ?', [id], (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
};

export const updateMovie = (id, movie) => {
    return new Promise((resolve, reject) => {
        const { title, genre, duration, rating } = movie;
        db.run(
            'UPDATE movies SET title = ?, genre = ?, duration = ?, rating = ? WHERE id = ?',
            [title, genre, duration, rating, id],
            function (err) {
                if (err) reject(err);
                resolve(this.changes);
            }
        );
    });
};

export const deleteMovie = (id) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM movies WHERE id = ?', [id], function (err) {
            if (err) reject(err);
            resolve(this.changes);
        });
    });
};