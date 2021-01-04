const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { dbFileName } = require('./config');

let db = new sqlite3.Database(path.join(__dirname, `./db/${dbFileName}`), sqlite3.OPEN_READWRITE, async(err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('\x1b[1m', '> SUCCESSFULLY CONNECTED TO AUTORA DB!');
    }
});

db.createTable = async() => {
    try {
        db.run('CREATE TABLE IF NOT EXISTS main(longUrl, shortId);');
        console.log('\x1b[1m', '> SUCCESSFULLY LOADED TO AUTORA DB!');
    } catch (err) {
        console.log(err);
    }
};

db.selectByShortId = async(shortId) => {
    return new Promise(async(resolve, reject) => {
        db.serialize(() => {
            db.get(`SELECT DISTINCT longUrl FROM main WHERE shortId = ?`, [shortId], (error, result) => {
                if (error) { reject('error'); console.log(error); } else { resolve(result); };
            });
        });
    });
};

db.selectByLongUrl = async(longUrl) => {
    return new Promise(async(resolve, reject) => {
        db.serialize(() => {
            db.get(`SELECT DISTINCT shortId FROM main WHERE longUrl = ?`, [longUrl], (error, result) => {
                if (error) { reject('error'); console.log(error); } else { resolve(result); };
            });
        });
    });
};

db.insert = async(longUrl, shortId) => {
    return new Promise(async(resolve, reject) => {
        db.serialize(() => {
            db.get(`INSERT INTO main (longUrl, shortId) VALUES (?, ?)`, [longUrl, shortId], (error, result) => {
                if (error) { reject(error); console.log(error); } else { resolve(result); };
            });
        });
    });
};

db.checkIfSlugExists = async(shortId) => {
    return new Promise(async(resolve, reject) => {
        db.serialize(() => {
            db.get(`SELECT EXISTS(SELECT 1 FROM main WHERE shortId = ?);`, [shortId], (error, result) => {
                if (error) { reject(error);} else { resolve(result); };
            });
        });
    });
};

db.checkIfUrlExists = async(longUrl) => {
    return new Promise(async(resolve, reject) => {
        db.serialize(() => {
            db.get(`SELECT EXISTS(SELECT 1 FROM main WHERE longUrl = ?);`, [longUrl], (error, result) => {
                if (error) { reject(error); console.log(error); } else { resolve(result); };
            });
        });
    });
};

module.exports = db;